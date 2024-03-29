var quizStatus = true;
var questionNumber = 0; 
var answerNumber = 0; 
var score = 0;
var highScore = 50; 
var finalAnswerCheck = 0 
var checkTimes = 1 
var viewHighScoresBtnEl = document.getElementById('view-high-scores'); 
var startQuizBtnEl = document.getElementById('start-quiz');
var answer1BtnEl = document.getElementById('answer1');
var answer2BtnEl = document.getElementById('answer2'); 
var answer3BtnEl = document.getElementById('answer3'); 
var answer4BtnEl = document.getElementById('answer4'); 
var submitScoreEl = document.getElementById('submitScore'); 
var questionsEl = document.getElementById('questions');
var mainDivEl = document.getElementById('mainDiv');
var htmlTimeLeft = document.getElementById('timeLeft');
var answerCorrectWrong = document.getElementById('answerCorrectWrong');
var questionDisplayEl = document.createElement("questionDisplay"); 
var finalScoreDisplayEl = document.createElement("finalScoreDisplay"); 
var enterInitialsEl = document.createElement("enterInitials"); 
var enterInitialsTextAreaEl = document.createElement("enterInitialsTextArea"); 
var button1234 = document.createElement("button"); 
var timeLeft = 60;

// hidden items until needed
answer1BtnEl.style.display = 'none';
answer2BtnEl.style.display = 'none';
answer3BtnEl.style.display = 'none';
answer4BtnEl.style.display = 'none';
submitScoreEl.style.display = 'none';
answerCorrectWrong.style.display='none';
enterInitialsTextArea.style.display='none';

//questions for quiz
var questionsObject = { 
    correct: { 
        0 : "What year was the character of Robin first introduced?",
        1 : "What Batman villain formerly worked as a zoologist?",
        2 : "Which of the following characters is the supervillain Clayface?", 
        3 : "Who is credited with creating Batman?", 
        4 : "Who killed Batman's parents?"
    }
};
//possible answers for quiz
var answersObject = { 
    answers: { 
        0 : {
            0: "1960", 
            1: "1950", 
            2: "1940", //correct answer
            3: "1970"}, 
        1 : {
            0: "Man Bat", //correct answer
            1: "Poison Ivy",  
            2: "Killer Croc", 
            3: "The Penguin"}, 
        2 : { 
            0: "Joe Shuster", 
            1: "Jerry Siegel",
            2: "Bob Kane",  //correct answer
            3: "Jack Kirby"},   
        3 : { 
            0: "Sal Maroni", 
            1: "Joe Chill", //correct answer
            2: "Killer Croc", 
            3: "Frank Miller"},    
        4 : { 
            0: "Matt Hagen", 
            1: "Preston Payne", 
            2: "Basil Karlo", 
            3: "All of the above"},  //correct answer
    }
};
htmlTimeLeft.textContent = timeLeft;
// View high scores
viewHighScoresBtnEl.addEventListener("click", function() { 

    var quizUsers = "";
    var substringTest ="";
    var highScores = "";

    for (var i=0; i < localStorage.length; i++) {
        var checkUserValue = [];
        
        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0,4) 
        if (substringTest == "quiz") {
            checkUserValue = quizUsers.split(",");
            var userName = checkUserValue[0]
            highScores += "User " + userName.substring(4) + " high score is: " + checkUserValue[1] + "\n";
       }
    }
    window.alert(highScores);

});
// Submit high scores
submitScoreEl.addEventListener("click", function() { 
    

    var quizLocalStorage = "quiz";
    var quizUserDetails = "";
    var value = [];
    
    // Create an array for validation
    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value 
    value = [quizUserDetails,highScore] 



    if (!localStorage.length) {
        localStorage.setItem("test","test");
    }
       
        
    for (var i=0; i < localStorage.length; i++){
        
        var checkUser = "";
        var checkUserValue = [];

        
        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;

       
        checkUser = localStorage.getItem(quizUserDetails);
        
   
        if (checkUser == null) { 
            localStorage.setItem(quizUserDetails, value); 
            window.alert("Your score of " + highScore + " has been submitted!")
            break;
        } else if (checkUser != null){
            checkUserValue = checkUser.split(","); 
           
        
        }  



              
        if ( quizUserDetails == checkUserValue[0] && highScore == checkUserValue[1] ) {

       
        localStorage.setItem(quizUserDetails, value); 
        window.alert(highScore + " " + "is the latest entry for user initial " + enterInitialsTextArea.value + ". Entry will not be added.")
        break; 
        } else if (enterInitialsTextArea.value == "") {
            window.alert("Please enter an initial");
            break;
        } else if ( quizUserDetails == checkUserValue[0] && highScore > checkUserValue[1] ) { 
            // New high score submitted!
            localStorage.setItem(quizUserDetails, value); 
            window.alert("New high score of " + highScore + " has been submitted!.\nYour previous score was " + checkUserValue[1])
            break; 
        } else if ( quizUserDetails == checkUserValue[0] && highScore < checkUserValue[1] ) { 
            
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your previous code of " + checkUserValue[1] + " was higher. Entry will not be added.");
            break; 

        } else { 
            localStorage.setItem(quizUserDetails, value); 
            window.alert("Your score of " + highScore + " has been submitted!")
            break;
        }
                
    }
    
} );


answer1BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display='none';

});

answer2BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display='none';

});

answer3BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display='none';

});

answer4BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display='none';

});

submitScoreEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display='none';

});

startQuizBtnEl.addEventListener("click", function() {


    startQuizBtnEl.style.display = 'none';
    questionDisplay.style.display='none';
    finalScoreDisplay.style.display = 'none';
    enterInitials.style.display='none';
    score = 0; 
    timeLeft=60;
    htmlTimeLeft.textContent = timeLeft; 
    finalAnswerCheck = 0; 
    checkTimes = 1; 


    var timeInterval = setInterval(function() {

        if (score === 1){ // on wrong answer remove a point
            highScore -= 10;
        }

        score = 0; 

        
        if(timeLeft >= 1 && finalAnswerCheck !== 1) {
            questionDisplay.textContent = questionsObject.correct[questionNumber];
            
            questionDisplay.style.display= ""; 
            answer1BtnEl.style.display = ""; 
            answer2BtnEl.style.display = "";
            answer3BtnEl.style.display = "";
            answer4BtnEl.style.display = "";

            //Display answers to the question
            answer1BtnEl.textContent = answersObject.answers[answerNumber][0];
            answer2BtnEl.textContent = answersObject.answers[answerNumber][1];
            answer3BtnEl.textContent = answersObject.answers[answerNumber][2];
            answer4BtnEl.textContent = answersObject.answers[answerNumber][3];
           
            gridContainer.appendChild(questionDisplayEl);
            gridContainer.appendChild(answer1BtnEl);
            gridContainer.appendChild(finalScoreDisplayEl);
            timeLeft -= 1;
            htmlTimeLeft.textContent = timeLeft;
            console.log("time left:" + timeLeft)
            
            // answer button 1 options
            answer1BtnEl.addEventListener("click", function() {

                if (questionDisplay.textContent === "What Batman villain formerly worked as a zoologist?" && answer1BtnEl.textContent === "Man Bat") {
                    console.log("Correct");
                    questionNumber = 2; 
                    answerNumber = 4;
                    answerCorrectWrong.style.display="";
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #800080";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else {

                    //Assign wrong values based incorrect answers.

                    switch(answer1BtnEl.textContent) {
                        case "1960":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            
                            score = 1; 
                            questionNumber = 1; 
                            answerNumber = 1;
                            break;
                        case "Matt Hagen":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2;
                            break;
                        case "Joe Shuster":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            
                            score = 1; 
                            questionNumber = 4; 
                            answerNumber = 3;
                        break;
                        case "Sal Maroni":
                            console.log("Correct");
                            answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
                            answerCorrectWrong.textContent = "Correct!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                            questionNumber = 0; 
                            answerNumber = 0; 
                            console.log("I'm here" + timeInterval);
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display='none'; 
                            startQuizBtnEl.style.display = 'none'; 
                            //Finished quiz display
                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = ""; 
                            enterInitials.style.display = ""; 
                            enterInitialsTextArea.style.display="";  
                            finalAnswerCheck = 1; 
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";
                            clearInterval(timeInterval);
                            break;
                        
                    }
                }
      

            });
            // answer button 2 options
            answer2BtnEl.addEventListener("click", function() {

                if (questionDisplay.textContent === "Who killed Batman's parents?" && answer2BtnEl.textContent === "Joe Chill") {
                    console.log("Correct");
                    answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #800080";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                    questionNumber = 0; 
                    answerNumber = 0; 
                    console.log("I'm here" + timeInterval);
                    answer1BtnEl.style.display = 'none';
                    answer2BtnEl.style.display = 'none';
                    answer3BtnEl.style.display = 'none';
                    answer4BtnEl.style.display = 'none';
                    answerCorrectWrong.style.display='none'; 
                    startQuizBtnEl.style.display = 'none'; 
                    //Finished quiz display
                    questionDisplay.textContent = "You have finished the quiz!";
                    finalScoreDisplay.style.display = ""; 
                    enterInitials.style.display = ""; 
                    enterInitialsTextArea.style.display=""; 
                    finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                    enterInitials.textContent = "Enter initials: "
                    submitScoreEl.style.display = "";
                    submitScoreEl.textContent = "Submit";
                    clearInterval(timeInterval);
                } else {

                    switch(answer2BtnEl.textContent) {
                        case "1950":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                          
                            score = 1; 
                            questionNumber = 1; 
                            answerNumber = 1;
                            break;
                        case "Posion Ivy":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                         
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                            console.log(score);
                            break;
                        case "Preston Payne":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2;
                            break;
                        case "Jerry Siegel":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 4; 
                            answerNumber = 3;
                            break;

                            
                    }
                 }



                
            });
            // answer button 3 options
            answer3BtnEl.addEventListener("click", function() {

                if (questionDisplay.textContent === "What year was the character of Robin first introduced?" && answer3BtnEl.textContent === "1940") {
                    console.log("Correct");
                    questionNumber = 1; 
                    answerNumber = 1;
                    answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #800080";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else if (questionDisplay.textContent === "Who is credited with creating Batman?" && answer3BtnEl.textContent === "Bob Kane") {
                    console.log("Correct");
                    questionNumber = 4; 
                    answerNumber =3;
                    answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrong.style.borderTop = "solid #800080";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else if (questionDisplay.textContent === "What Batman villain formerly worked as a zoologist?" && answer3BtnEl.textContent === "Killer Croc") {
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                }
                
                else {

                    switch(answer3BtnEl.textContent) {
                        case "Basil Karlo":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2;
                            break;
                        case "Killer Croc":
                            console.log("Inside the case now");
                            score = 1; 
                            questionNumber = 0; 
                            answerNumber = 0; 
                            console.log("I'm here" + timeInterval);
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display='none'; 
                            startQuizBtnEl.style.display = 'none'; 
                            //Finished quiz display
                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = ""; 
                            enterInitials.style.display = ""; 
                            enterInitialsTextArea.style.display="";  
                            finalAnswerCheck = 1; 
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";
                            clearInterval(timeInterval);
                            
                        break;
                    }

                }

            });
            // answer button 4 options
            answer4BtnEl.addEventListener("click", function() {

                if (questionDisplay.textContent === "Which of the following characters is the supervillain Clayface?" && answer4BtnEl.textContent === "All of the above") {
                    console.log("Correct");
                    questionNumber = 3; 
                    answerNumber = 2;
                    answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
                    answerCorrectWrong.textContent = "Correct!"
                    answerCorrectWrong.style.borderTop = "solid #800080";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);

                } else {

                    switch(answer4BtnEl.textContent) {
                        case "1970":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 1; 
                            answerNumber = 1;
                            break;
                        case "The Penguin":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                            break;
                        case "Jack Kirby":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 4; 
                            answerNumber = 3;
                        break;
                        case "Frank Miller":
                            console.log("Inside the case now");
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            answerCorrectWrong.style.borderTop = "solid #800080";
                            score = 1; 
                            questionNumber = 0; 
                            answerNumber = 0; 
                            console.log("I'm here" + timeInterval);
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display='none'; 
                            startQuizBtnEl.style.display = 'none'; 
                            //Finished quiz display
                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = ""; 
                            enterInitials.style.display = ""; 
                            enterInitialsTextArea.style.display="";  
                            finalAnswerCheck = 1; 
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";                   
                            clearInterval(timeInterval);
                        break;
                        
                    }
                 
                }
                
            });

        }
        else if(timeLeft === 0){

          console.log("I'm here" + timeInterval);
          questionNumber = 0; 
          answerNumber = 0; 
          answer1BtnEl.style.display = 'none';
          answer2BtnEl.style.display = 'none';
          answer3BtnEl.style.display = 'none';
          answer4BtnEl.style.display = 'none';
          answerCorrectWrong.style.display='none'; 
          // Timed out display
          questionDisplay.textContent = "Times up! Try again by clicking on \"READY\"";
          startQuizBtnEl.style.display = "";
          clearInterval(timeInterval);
    
          
        }
      }, 1000)

});

function lastQuestionWrong () {
        if (finalAnswerCheck === 1 && checkTimes === 1) {
        highScore -= 10;
        checkTimes = 2;
        return highScore
    }

  }