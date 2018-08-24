//----------------------   CODE BEGINS HERE   ----------------------//

//----------------------   GLOBAL VARIABLE DECLARATION   ----------------------//
//1- Defining an array whose elements are objects. Each object represent a question, multiple choices, and the correct answer associated with the question!
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
// 3- A variable to question's number
var qNum = 0;
// 4- Creating sumbit button object 
var submitBtn = $('<button type="button" class="btn" id="submit-btn">Sumbit</button>');


//----------------------   FUNCTION DEFINITION TO SHOW QUIZ   ----------------------//
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


//----------------------   EVENT HANDLER FOR THE SUBMIT BUTTON   ----------------------//

// Wrapping the event handlers inside ready() method to make sure it won't be exexuted unless the whole page is fully loaded
$(document).ready(function () {

    // Event handler for the start button 
    $("#start-btn").on("click", function () {
        // Displaying data 
        $(".row").empty();
        displayQuiz();
    }); // End of event handler

    // Event handler for submmit button 
    submitBtn.on("click", function () {
        console.log("test");
        var numOfCorrectAns = 0;
        var numOfWrongAns = 0;
        qNum = 1;
        qArr.forEach(function (element) {

            var userAns = $('input[name="' + qNum + '"]:checked').val();

            qNum++;
            if (userAns === element.correctAns) {
                numOfCorrectAns++;
            }
            if (userAns !== element.correctAns) {
                numOfWrongAns++;
            }

        }); // End of forEach()
        console.log("correct: " + numOfCorrectAns);
        console.log("wrong: " + numOfWrongAns);

    }); // End of button's event listener
}); // End of document.ready()

//----------------------   CODE ENDS HERE   ----------------------//