//----------------------   DOCUMENT BEGINS HERE   ----------------------//
// CONTENT:
// 1-8) GLOBAL VARIABLES DECLARATION
// 2-8) FUNCTION TO DISPLAY THE TIMER
// 3-8) FUNCTION TO DISPLAY THE QUESTIONS
// 4-8) FUNCTION TO DISPLAY THE QUIZ 
// 5-8) FUNCTION TO GRADE THE QUIZ OPTION 1 AND OPTION 2
// 6-8) FUNCTION TO DISPLAY THE RESULT
// 7-8) EVENT HANDLER FOR THE START BUTTON
// 8-8) EVENT HANDLER FOR THE SUBMIT BUTTON

//----------------------   GLOBAL VARIABLES DECLARATION   ----------------------//
// 1- Defining an array whose elements are objects. 
// Each object represent a question, multiple choices, and the correct answer associated with the question!
var questionArr = [{
        q: "What is the capital of The United States of America?",
        choices: ["New York", "Washington", "Washington DC", "Chicago"],
        correctAns: "Washington DC"
    },
    {
        q: "What is the most populous country in the world?",
        choices: ["India", "United States", "Brazil", "China"],
        correctAns: "China"
    },
    {
        q: "What is the largest country in the world?",
        choices: ["United States", "Canada", "China", "Russia"],
        correctAns: "Russia"
    },
    {
        q: "Who has been a president of the United States of America?",
        choices: ["Michael Jackson", "Maddona", "John F. Kennedy", "Vladimir Putin"],
        correctAns: "John F. Kennedy"
    },
    {
        q: "Which of the following activity is most joyful?",
        choices: ["Skiing", "Watching Movies", "Sunbathing", "Coding"],
        correctAns: "Coding"
    },
    {
        q: "Will Google exist 100 years from now?",
        choices: ["Yes", "No", "Maybe", "Don't know!"],
        correctAns: "Maybe"
    }
]; // End of questionArr
// 2- Getting a reference to the main row
var row = $(".row");
// 3- Variable to hold the number of the current question
var questionNum = 0;
// 4- Creating sumbit button object 
var submitBtn = $('<button type="button" class="btn" id="submit-btn">Sumbit</button>');
// 5- Variables to count the nubmer of correct answeres
var numOfCorrectAns = 0;
// 6- Variables to count the nubmer of wrong answers
var numOfWrongAns = 0;
// 6- Variables to count the nubmer of unanswered questions
var numOfUnAnswered = 0;
// 7- Variables for timer's interval
var intervalID;
//----------------------   FUNCTION TO DISPLAY THE TIMER   ----------------------//
function displayTimer() {
    // 
    $(".timerDiv").append($('<h2>Time remaining: <span class="timer"></span> seconds</h2>'));
    intervalID = setInterval(myTimer, 1000);
    // Setting the counter to 60 seconds 
    counter = 60;

    function myTimer() {
        $(".timer").text(counter);
        if (counter === 0) {
            // Grade quiz
            gradeQuiz2();
            // Display the result
            displayResult();
        }
        counter--;
    }
} // End of displayTimer

//----------------------   FUNCTION TO DISPLAY THE QUESTIONS   ----------------------//
function displayQuestions() {
    // Looping through questionArr and adding questions and choices into the page 
    questionArr.forEach(function (element) {
        // Making a new <div> to dynamically add questions and choices
        var newDiv = $("<div>");
        // Building the question html string
        var qStr = "<h3>" + element.q + "</h3>";
        // Increment the number of questions by 1
        questionNum++;
        // Adding the question to the new <div>
        newDiv.append(qStr);

        // Looping through choices array and retrieving one by one 
        for (i = 0; i < element.choices.length; i++) {
            // Constructing an radio <input> element for each choice 
            var choiceStr = '<input type="radio" name="' + questionNum + '" value="' + element.choices[i] + '">' + element.choices[i];
            // Adding the choices to the new <div>
            newDiv.append(choiceStr);
        } // End of for loop to add radio inputs for choices
        // Adding the <div> to the main row
        row.append(newDiv);
    }) // End of forEach() method
} // End of displayQuestions()

//----------------------   FUNCTION TO DISPLAY THE QUIZ   ----------------------//
function displayQuiz() {
    // 1/4) Empty the content 
    $(".row").empty();
    // 2/4) Display the timer
    displayTimer();
    // 3/4) Display the questions
    displayQuestions();
    // 4/4) Add submit button 
    row.append(submitBtn);
} // End of displayQuiz() definition 

//----------------------   FUNCTION TO GRADE THE QUIZ OPTION 1   ----------------------//
function gradeQuiz1() {
    // The number of current question sets back to 1
    questionNum = 1;
    // Start looping back through the array of questions, comparing user's ansewr with the correnct answer
    questionArr.forEach(function (element) {
        // Starting from question 1, get a jquery object of all choices  
        var choices = $('input[name="' + questionNum + '"]');
        // Starting from question 1, get a jquery object of only the choice that has been checked, if any
        var checkedChoice = $('input[name="' + questionNum + '"]:checked');
        // Determine if user has answered this question  
        if ((choices.is(checkedChoice))) {
            var userAns = checkedChoice.val();
            if (userAns === element.correctAns) {
                numOfCorrectAns++;
            }
            if (userAns !== element.correctAns) {
                numOfWrongAns++;
            }
        }
        // If user has not answered at all 
        else {
            numOfUnAnswered++;
        };
        // next question (making it read)y for the next loop)
        questionNum++;
    }); // End of forEach()
} // End of function gradeQuiz1()

//----------------------   FUNCTION TO GRADE THE QUIZ OPTION 2   ----------------------//
function gradeQuiz2() {
    // The number of current question sets back to 1
    questionNum = 1;
    // Start looping back through the array of questions, comparing user's ansewr with the correnct answer
    questionArr.forEach(function (element) {
        // Find the checked radio input and get its value
        var userAns = $('input[name="' + questionNum + '"]:checked').val();
        // if user has not answered at all
        if (userAns === undefined) {
            numOfUnAnswered++;
            // if user answered correctly
        } else if (userAns === element.correctAns) {
            numOfCorrectAns++;
            console.log("correct");
        }
        // if user answered wrongly
        else if (userAns !== element.correctAns) {
            numOfWrongAns++;
            console.log("wrong");
        }
        questionNum++;
    }); // End of forEach()
} // End of function gradeQuiz2()

//----------------------   FUNCTION TO DISPLAY THE RESULT   ----------------------//
function displayResult() {
    // Kill the timer
    clearInterval(intervalID);
    // Show "time's up" msg
    $(".timerDiv").html("<h2>Time's Up!</h2>");
    // empty the row 
    $(".row").empty();
    // Adding to the row
    row.append("<h3>The number of correct answers are: " + numOfCorrectAns + "</h3>");
    row.append("<h3>The number of wrong answers are: " + numOfWrongAns + "</h3>");
    row.append("<h3>The number of unanswered questions are: " + numOfUnAnswered + "</h3>");
} // End of displayResult() function

// Wrapping both event handlers inside ready()
$(document).ready(function () {

    //----------------------   EVENT HANDLER FOR THE START BUTTON   ----------------------//
    // 1- Event handler for the start button, which basically calls the display quiz function
    $("#start-btn").on("click", function () {
        // Display questions 
        displayQuiz();
    }); // End of start button event handler

    //----------------------   EVENT HANDLER FOR THE SUBMIT BUTTON   ----------------------//
    // Event handler for the submmit button 
    submitBtn.on("click", function () {
        // Get the user's answer and compare it against the coorect anwer 
        gradeQuiz2();
        // Display the result
        displayResult();
    }); // End of button's event listener
}); // End of document.ready()

//----------------------   DOCUMENT ENDS HERE   ----------------------//