//----------------------   DOCUMENT BEGINS HERE   ----------------------//
// STRUCTURE OF THIS DOCUMENT:
// GLOBAL VARIABLES DECLARATION
// FUNCTION TO DISPLAY THE QUIZ 
// FUNCTION TO EXTRACT USER'S ANSWERS AND MAKE COMPARISION
// FUNCTION TO DISPLAY THE RESULT
// EVENT HANDLER FOR THE START BUTTON
// EVENT HANDLER FOR THE SUBMIT BUTTON

//----------------------   GLOBAL VARIABLES DECLARATION   ----------------------//
// 1- Defining an array whose elements are objects. 
// Each object represent a question, multiple choices, and the correct answer associated with the question!
var qArr = [{
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
]; // End of qArr
// 2- Getting a reference to the main row
var row = $(".row");
// 3- Variable to hold the number of the current question
var qNum = 0;
// 4- Creating sumbit button object 
var submitBtn = $('<button type="button" class="btn" id="submit-btn">Sumbit</button>');
// 5- Variables to count the nubmer of right and wrong answer
var numOfCorrectAns = 0;
// 6- Variables to count the nubmer of wrong answers
var numOfWrongAns = 0;

//----------------------   FUNCTION TO DISPLAY THE QUIZ   ----------------------//
function displayQuiz() {
    // 1-2) Adding questions and choices 
    // Looping through qArr and adding questions and choices into the page 
    qArr.forEach(function (element) {
        // Making a new <div> object to accommodate the question and choices
        var newDiv = $("<div>");
        // Building the question html string
        var qStr = "<h3>" + element.q + "</h3>";
        // Increment the number of questions by 1
        qNum++;
        // Adding the question to the new <div>
        newDiv.append(qStr);

        // Looping through choices array and retrieving one by one 
        for (i = 0; i < element.choices.length; i++) {
            // Constructing an radio <input> element for each choice 
            var choiceStr = '<input type="radio" name="' + qNum + '" value="' + element.choices[i] + '">' + element.choices[i];
            // Adding the choices to the new <div>
            newDiv.append(choiceStr);
        } // End of for loop to add radio inputs for choices
        // Adding the <div> to the main row
        row.append(newDiv);
    }) // End of forEach() method
    // 2-2) Adding the sumbit button to the bottom of the page 
    row.append(submitBtn);
} // End of displayQuiz() definition 

//----------------------   FUNCTION TO EXTRACT USER'S ANSWERS AND MAKE COMPARISION   ----------------------//
function retrieveAndCompare() {
    // The number of current question sets back to 1
    qNum = 1;
    // Start looping back through the array of questions, comparing user's ansewr with the correnct answer
    qArr.forEach(function (element) {
        // Starting from top of the form, extracting user's answer from each question one bye one 
        var userAns = $('input[name="' + qNum + '"]:checked').val();
        // next question (making it read)y for the next loop)
        qNum++;
        // Having retrieved the user's answer, compare it against the correct answer right away
        if (userAns === element.correctAns) {
            numOfCorrectAns++;
        }
        if (userAns !== element.correctAns) {
            numOfWrongAns++;
        }
    }); // End of forEach()
} // End of function retrieveAndCompare()

//----------------------   FUNCTION TO DISPLAY THE RESULT   ----------------------//
function displayResult() {
    // empty the row 
    $(".row").empty();
    // Adding to the row
    row.append("<h3>The number of correct answers are: " + numOfCorrectAns + "</h3>");
    row.append("<h3>The number of wrong answers are: " + numOfWrongAns + "</h3>");
} // End of displayResult() function

// Wrapping both event handlers inside ready()
$(document).ready(function () {

    //----------------------   EVENT HANDLER FOR THE START BUTTON   ----------------------//
    // 1- Event handler for the start button, which basically calls the display quiz function
    $("#start-btn").on("click", function () {
        // Display questions 
        $(".row").empty();
        displayQuiz();
        // Display the timer

    }); // End of start button event handler

    //----------------------   EVENT HANDLER FOR THE SUBMIT BUTTON   ----------------------//
    // Event handler for the submmit button 
    submitBtn.on("click", function () {
        // Get the user's answer and compare it against the coorect anwer 
        retrieveAndCompare();
        // Display the result
        displayResult();
    }); // End of button's event listener
}); // End of document.ready()

//----------------------   DOCUMENT ENDS HERE   ----------------------//