// Seleção de elementos: 
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElemnt = document.querySelector("#generated-password");
const reloadPassword = document.querySelector('#update');
const btnCopy = document.querySelector("#copyPassword");
const passwordValue = document.querySelector('h4');
const fields = document.querySelectorAll("[required]");


// Funções 
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumbers = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSynbol = () => {
    const symbols = "[]()_-+=§()*&$#@!><;:?|,";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassWord = (getLetterLowerCase, getLetterUpperCase, getNumbers, getSynbol) => {
    let password = "";
    const passwordLength = 10;
    const generators = [
        getLetterLowerCase,
        getLetterUpperCase,
        getNumbers,
        getSynbol
    ]

    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        });
    }
    password = password.slice(0, passwordLength);
    generatePasswordElemnt.style.display = "block";
    generatePasswordElemnt.querySelector("h4").innerText = password;
};

// Eventos
reloadPassword.addEventListener("click", (event) => {
    event.preventDefault();
    generatePassWord(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumbers,
        getSynbol);
});

let visible = true;
function hideElement() {
    if (visible) {
        const generatePasswordElemnt = document.querySelector("#generated-password");
        generatePasswordElemnt.style.display = "block";
        generatePassWord(
            getLetterLowerCase,
            getLetterUpperCase,
            getNumbers,
            getSynbol);
        visible = false;
    } else {
        generatePasswordElemnt.style.display = "none";
        visible = true;
    }
}


btnCopy.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(passwordValue.textContent);

});

function showPassword() {
    let showOrHide = document.getElementById('password');
    let confirmShowOrHide = document.getElementById('confirmpassword');
    let img = document.getElementById("showPassword");

    if (showOrHide.type === "password" && img.title === 'Visualizar') {
        img.src = "./img/visibility_off.png";
        img.title = "Ocultar";
        showOrHide.type = "text";
        confirmShowOrHide.type = "text";
    } else {
        img.src = "./img/visibility.png";
        img.title = "Visualizar";
        showOrHide.type = "password";
        confirmShowOrHide.type = "password";
    }

}

function ValidateField(field) {
    function verifyErrors() {
        let foundError = false;

        for (let error in field.validity) {
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            },
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function () {

        const error = verifyErrors()

        if (error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = ""
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for (field of fields) {
    field.addEventListener("invalid", event => {
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
    .addEventListener("submit", event => {
        event.preventDefault()
    })










