const slider = document.querySelector("[scroller]");
const len = document.querySelector("[password-lenght]");
const allChecks = document.querySelectorAll("input[type=checkbox]");
const check1 = document.querySelector("[check1]");
const check2 = document.querySelector("[check2]");
const check3 = document.querySelector("[check3]");
const check4 = document.querySelector("[check4]");
const strenght = document.querySelector("[password-strenght]");
const symbols = ["_", "@", "#", "$", "%", "^", "&", "*", "-", "+", "<", ">"];
const output = document.querySelector("[output]");
const copybtn = document.querySelector("[copy-btn]");
const copyMsg = document.querySelector("[copy-output]")
const generatePsw = document.querySelector(".generate-password");
//const allChecks = [check1, check2, check3, check4];
let password = "";
let passwordLenght = 7;
let checkCount = 0;

//sliderValue();

//set slider value
function sliderValue() {
    slider.value = passwordLenght;
    len.innerHTML = passwordLenght;
}

function getRndInteger(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRndNo(){
    return getRndInteger(0,9);
}

function genLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function genUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}


//Symbol Generator
function generateSymbol() {
    return symbols[getRndInteger(0,12)];
}

//set strenght color
function setColor(value) {
    strenght.style.background = value;
}

//calculate strenght of password
function calStrenght() {
    let upcas ;
    let lowcas ;
    let num ;
    let sym ;
    let count = 0;

    if(check1.checked) {upcas = true;
                        count++;}
    if(check2.checked) {upcas = true;
        count++;}
    if(check3.checked) {upcas = true;
        count++;}
    if(check4.checked) {upcas = true;
        count++;}

    if((count>=3) && (passwordLenght >=8)) {
        document.querySelector("[password-strength]").classList.add("grn");
        document.querySelector("[password-strength]").classList.remove("ylo");
        document.querySelector("[password-strength]").classList.remove("red");
    } 

    else if ((count >=2) && (passwordLenght >= 6)) {
        document.querySelector("[password-strength]").classList.add("ylo");
        document.querySelector("[password-strength]").classList.remove("grn");
        document.querySelector("[password-strength]").classList.remove("red");
    }

    else { document.querySelector("[password-strength]").classList.add("red");
    document.querySelector("[password-strength]").classList.remove("grn");
    document.querySelector("[password-strength]").classList.remove("ylo");}
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(output.value);
        copyMsg.innerText = "copied";
       // alert("copied");
    }
    catch(e) {
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");   

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


slider.addEventListener('input', (e) => {
    passwordLenght = e.target.value;
    sliderValue();
})

copybtn.addEventListener('click', (e) => {
    if(output.value)
    copyContent();
})

// if (Array.isArray(allChecks)) {
//   console.log("It's an array!");
//   } else {
//     console.log("NOT an array!");
//   }

//generating password


function handleCheckBox() {
    checkCount = 0;
    allChecks.forEach((checkbox) => {
        if(checkbox.checked)
        checkCount++;
    })
}

allChecks.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBox);
});


//shuffle function
//Fisher Yates Method
function shufflePassword(Array) {
    for (let i = Array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str = "";
    Array.forEach((el) => (str = str + el) );
    return str;
}

console.log('before gen psw');
generatePsw.addEventListener('click', () => {
    if (checkCount < 1) return;


    console.log("starting generating");
 //new password steps
    //remove old password
    password = "";

    //checking checkboxes

    let funcArr = [];

    if( check1.checked) {
        funcArr.push(genUpperCase);
    }

    if(check2.checked) {
        funcArr.push(genLowerCase);
    }

    if(check3.checked) {
        funcArr.push(generateRndNo);
    }

    if(check4.checked) {
        funcArr.push(generateSymbol);
    }

    //compulsory generated characters
    for (let i = 0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("compulsory addition");

    //for remaining characters
    for (let i = 0; i<passwordLenght-funcArr.length; i++) {
        let randomIndex = getRndInteger(0, funcArr.length);
        console.log(randomIndex);
        password += funcArr[randomIndex](); 
    }
    console.log("remaing addition");

    //shuffle password
    password = shufflePassword(Array.from(password));
    console.log("shuffling");

    //show in UI
    output.value = password;

    //calculate strenght
    calStrenght();
});