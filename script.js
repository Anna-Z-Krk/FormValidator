const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
    //argument input to nasze inputy, msg to placeholder
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');
    formBox.classList.add('error');
    errorMsg.textContent = msg;
}
const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
}

const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
          showError(el, el.placeholder)
        } else {
            clearError(el)
        }
    })
    
}

//sprawdzanie dlugosci znakow w inputach
const checkLength = (input, min) => {
    if (input.value.length < min) {
        const inputText = input.previousElementSibling.innerText;
        showError(input, `${inputText.slice(0,-1)} cannot be shorter than ${min} characters`)
    }
}
//czy hasła do siebie pasują
const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'The passwords do not match')
    }
}
//sprawdzanie znaków w formularzu w polu email
const checkMail = email => {
    
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(email.value))
    { clearError(email) } 
    else {
        showError(email, 'Your email is not valid')
    }
}
//poj się popupa, pobiera inputy z klasą formbox
const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;
    
    
        allInputs.forEach(el => {
            if (el.classList.contains('error')) {
                errorCount++;
            }
        })
    
    if (errorCount === 0) {
        popup.classList.add('show-popup')
    }
    console.log(errorCount);
}


//Argment inpt z funkcji 'chackform' przechowuje tablice z inputami, argument el odnosi się do każdej zmianej, którą umieściliśmy w tablicy
sendBtn.addEventListener('click', e => {
    e.preventDefault();

    checkForm([username, pass, pass2, email]);
    checkLength(username, 4);
    checkLength(pass, 8);
    checkPassword(pass, pass2);
    checkMail(email);
    checkErrors();
})

//czyszczenie komunikatów
clearBtn.addEventListener('click', e => {
    e.preventDefault();
    [username, pass, pass2, email].forEach(el => {
        el.value = '';
        clearError(el)
    })
})