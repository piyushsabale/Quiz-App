
const questions = [
    {
        question: "Which is the Largest Animal in the World?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Girrafe", correct: false},
        ]
    },
    {
        question: "Which is the Smallest City in the World?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Nepal", correct: false},
            {text: "Bhutan", correct: false},
            {text: "India", correct: false},
        ]
    },
    {
        question: "Which is the Largest desert in the World?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahare", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the Smallest Continent in the World?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Africa", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
        ]
    },
    {
        question: "What's the Capital of Maharashtra?",
        answers: [
            {text: "Pune", correct: false},
            {text: "Nagpur", correct: false},
            {text: "Nashik", correct: false},
            {text: "Mumbai", correct: true},
        ]
    },
]
const questionElement = document.getElementById("qus");
const ansElement = document.getElementById("ansBtn");
const nxt = document.getElementById("nextbtn");

let currentqusIndex = 0;
let score = 0;

function startquiz(){
    currentqusIndex = 0;
    score = 0;
    nxt.innerHTML = "Next";
    showqus();
}

function showqus(){
    resetState();
    let currentqus = questions[currentqusIndex];
    let qusNo = currentqusIndex + 1;
    questionElement.innerHTML = qusNo + ". " + currentqus.question;

    currentqus.answers.forEach(answer => {
        const optbtn = document.createElement("button");
        optbtn.innerHTML = answer.text;
        optbtn.classList.add("btn");
        ansElement.appendChild(optbtn);
        if(answer.correct){
            optbtn.dataset.correct = answer.correct ;
        } 
        optbtn.addEventListener("click", selectans);
    });
}

function resetState(){
    nxt.style.display = "none";
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }
}

function selectans(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach(optbtn => {
        if(optbtn.dataset.correct === "true"){
            optbtn.classList.add("correct");
        }
        optbtn.disabled = true;
    });
    nxt.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nxt.innerHTML = "Play Again";
    nxt.style.display = "block";
}

function handlenxtbtn(){
    currentqusIndex++;
    if(currentqusIndex < questions.length){
        showqus();
    }
    else{
        showscore();
    }

}


nxt.addEventListener("click", ()=>{
    if(currentqusIndex < questions.length){
        handlenxtbtn();
    }
    else{
        startquiz();
    }
})

startquiz();