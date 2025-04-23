import words_List from "./wordList.js";
// ==== //
const hangmanImg = document.querySelector(".image-container img");
const loserSection = document.querySelector(".loser-section");
const againBtn = document.querySelector(".again-btn");
const btnsBox = document.querySelector(".btns-box");
const hint_P = document.querySelector(".hint-box p");
const wordBox = document.querySelector(".word-box");
const winSection = document.querySelector(".win-section");
const nextWordBtn = document.querySelector(".next-word-btn");

let hangmanImgCount = 0;
let myIndex = 0;
// ========================== Functions  ========================== //
(function(){
    for (let i = 65; i < 91; i++) {
        let btn = document.createElement("button");
        btn.textContent = String.fromCharCode(i);
        btnsBox.append(btn);
    }
})();
// ==== //
function Add_divs(index){
    let word = words_List[index].word;
    let split = word.split("");

    wordBox.innerHTML = "";
    for (let i = 0; i < split.length; i++) {
        let divs = document.createElement("div");
        wordBox.append(divs);
    }
}
Add_divs(myIndex);


function Add_hint(index){
    let hint = words_List[index].hint
    hint_P.innerHTML = hint;
}
Add_hint(myIndex);


function Is_letter_in_word(index){
    const btnsLetter = document.querySelectorAll(".btns-box button");
    const divs = document.querySelectorAll(".word-box div");
    let word = words_List[index].word;
    let split = word.split("");

    for (let i = 0; i < btnsLetter.length; i++) {
        btnsLetter[i].onclick = function(){
            let letter = btnsLetter[i].innerHTML;
            let check = false;
            btnsLetter[i].disabled = true;

            split.forEach(function(char , i){
                if (char.toUpperCase() == letter) {
                    divs[i].innerHTML = letter;
                    divs[i].style.cssText = `
                        background-color:transparent;
                        width:fit-content;
                        height:fit-content;
                    `;
                    check = true;
                }
            });

            if (check == false) {
                Is_loser();
            }

            Win();
        }
    }
}
Is_letter_in_word(myIndex);
// ==== //
function Is_loser(){
    hangmanImgCount++;
    hangmanImg.setAttribute("src" , `images/hangman-${hangmanImgCount}.svg`);
    
    if (hangmanImgCount == 6) {
        loserSection.style.display = "flex";
        againBtn.onclick = function(){
            window.location.reload();
        }
    }
}

function Win(){
    const divs = Array.from( document.querySelectorAll(".word-box div") );
    let allDivs = divs.every(function(ele){
        return ele.innerHTML != "";
    });

    if (allDivs) {
        const btnsLetter = document.querySelectorAll(".btns-box button");

        winSection.style.display = "flex";
        hint_P.style.filter = "blur(3px)";

        nextWordBtn.onclick = function(){
            winSection.style.display = "none";
            myIndex++;
            Add_divs(myIndex);
            Add_hint(myIndex);
            Is_letter_in_word(myIndex);

            btnsLetter.forEach(element => {
                element.disabled = false;
            });
        }
    }
}

hint_P.addEventListener("click" , function(){
    hint_P.style.filter = "blur(0px)";
});