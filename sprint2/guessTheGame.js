let startButton = document.getElementById("start_button");
let inputUserNumberBackground = document.getElementById("user_number_input_background");
let timerFrame = document.getElementById("timer_frame");
let sendUserNumber = document.getElementById("send_user_number");
let inputUserNumber = document.getElementById("user_number_input");
let levelTypes = document.getElementById("level_types");
let navMenu = document.getElementById("fixed_nav_menu");
let navMenuButton = document.getElementById("button_nav_menu");
let state = document.getElementById("state");
let restartButton = document.getElementById("restart_button");
////
//LEVEL:
let easyTypeLevel = document.getElementById("easy_level");
let mediumTypeLevel = document.getElementById("medium_level");
let hardTypeLevel = document.getElementById("hard_level");
//Default variant(easy):
let variantTimer = 4;
let randomNumber = 0;
let maxNumber = 100000;
let notification = "Enter value from 0 to 100.000";
///
let easyWin = 0;
let mediumWin = 0;
let hardWin = 0;
///
easyTypeLevel.addEventListener("click", () => {
    hardTypeLevel.style.backgroundColor = "transparent";
    hardTypeLevel.style.color = "#027368";
    mediumTypeLevel.style.backgroundColor = "transparent";
    mediumTypeLevel.style.color = "#027368";

    easyTypeLevel.style.backgroundColor = "#027368";
    easyTypeLevel.style.color = "#eee";
    variantTimer = 2;
    maxNumber = 100000;
    notification = "Enter value from 0 to 100.000";
});
mediumTypeLevel.addEventListener("click", () => {
    hardTypeLevel.style.backgroundColor = "transparent";
    hardTypeLevel.style.color = "#027368";
    easyTypeLevel.style.backgroundColor = "transparent";
    easyTypeLevel.style.color = "#027368";

    mediumTypeLevel.style.backgroundColor = "#027368";
    mediumTypeLevel.style.color = "#eee";
    variantTimer = 2;
    maxNumber = 1000000;
    notification = "Enter value from 0 to 1.000.000";
});
hardTypeLevel.addEventListener("click", () => {
    easyTypeLevel.style.backgroundColor = "transparent";
    easyTypeLevel.style.color = "#027368";
    mediumTypeLevel.style.backgroundColor = "transparent";
    mediumTypeLevel.style.color = "#027368";

    hardTypeLevel.style.backgroundColor = "#027368";
    hardTypeLevel.style.color = "#eee";
    variantTimer = 1;
    maxNumber = 10000000;
    notification = "Enter value from 0 to 10.000.000";
});
///
function showMessage(inputElement, message, duration = 5000) {
    let messageBox = document.createElement("div");
    messageBox.style.position = "absolute";
    messageBox.style.marginLeft = "52rem";
    messageBox.style.paddingBlock = "0.8rem";
    messageBox.style.paddingInline = "1.2rem";
    messageBox.style.background = "#027368";
    messageBox.style.color = "#eee";
    messageBox.style.border = "0.1rem solidrgb(3, 90, 81)";
    messageBox.style.borderRadius = "2rem";
    messageBox.style.whiteSpace = "nowrap";
    messageBox.style.opacity = "0";
    messageBox.style.transition = "0.5s opacity ease";
    messageBox.textContent = message;
    messageBox.style.fontWeight = "800";
    setTimeout (() => {
        messageBox.style.opacity = "1";
    }, 500);
    setTimeout (() => {
        messageBox.style.opacity = "0";
    }, 4500);
    // Додаємо повідомлення після поля вводу
    inputElement.parentNode.insertBefore(messageBox, inputElement.nextSibling);

    // Видаляємо повідомлення через `duration` мс
    setTimeout(() => {
        messageBox.remove();
    }, duration);
}
///
inputUserNumber.addEventListener("keydown", function(event){
  if(event.key === "Enter")
    {
        sendUserNumberFunction();
    }  
});

function startFunction()
{
    movingToSideElement();

    setTimeout(() =>
        {
            inputUserNumberBackground.style.transition = "0.3s opacity ease";  
            inputUserNumberBackground.style.opacity = "1";
            
            timerFrame.style.transition = "0.3s opacity ease";  
            timerFrame.style.opacity = "1";
            timerFrame.style.marginTop = "0";
            
            levelTypes.style.opacity = "0";
            levelTypes.style.transition = "0.2s opacity ease"
        
            startButton.style.opacity = "0";
            startButton.style.transition = "0.3s ease";
        }, 1);
        setTimeout(() => {
            inputUserNumberBackground.style.opacity = "0";
            inputUserNumberBackground.style.display = "grid";
            levelTypes.style.display = "none";
            startButton.style.display = "none";
    }, 301);
    setTimeout(() => {
        inputUserNumberBackground.style.opacity = "1";
        inputUserNumberBackground.style.transition = "0.3s opacity ease";
        showMessage(inputUserNumberBackground, notification);
    }, 400);
            randomNumber = generateRandNumber(maxNumber);  
            startTimer(variantTimer); // enter minutes value
}

startButton.addEventListener("click", startFunction);

function generateRandNumber(maxValue)
{
    console.log("Randomn num: " + Math.floor(Math.random() * maxValue));
    return Math.floor(Math.random() * maxValue);
}

function sendUserNumberFunction()
{
    let number = Number(inputUserNumber.value);

    if (Number.isInteger(number) && inputUserNumber.value.trim() !== "" && number > 0) {
        updateNumbers(number);
    } else {
        alert("Error! Write integer number and > 0");
    }
}


sendUserNumber.addEventListener("click", sendUserNumberFunction);

let timerIntervals = [];

function startTimer(timer)
{
    timerFrame.style.fontSize = "2rem";
    timerFrame.style.fontWeight = "900";
    let minutes = timer;
    let seconds = 0;
    for(let i = 0; i <= timer*60; i++) //timer - only minutes
    {
        let timeout = setTimeout(() => 
        {
            if(seconds == 0)
                {
                    minutes--;
                    seconds = 60;
                }
            seconds--;
            if(seconds>=10)
            {
                timerFrame.textContent = "0" + (minutes) + ":" + (seconds);
            }
            else
            {
                timerFrame.textContent = "0" + (minutes) + ":0" + (seconds);
            }
            if (i == timer*60)
                {
                    alert("Time ended");
                    timerFrame.textContent = "00:00";
                }
        }, i*1000);
        timerIntervals.push(timeout);
    }
}

function stopTimer()
{
    timerIntervals.forEach(clearTimeout); 
    timerIntervals = [];
    timerFrame.textContent = "00:00"; 
}
function errorMovingToSideElement()
{
    document.getElementById("middle_number_frame").style.boxShadow = "none";
    document.getElementById("right_number_frame").style.boxShadow = "none";
    document.getElementById("lateral_right_number_frame").style.boxShadow = "none";
    document.getElementById("lateral_left_number_frame").style.boxShadow = "none";
    document.getElementById("left_number_frame").style.boxShadow = "none";
}


function movingToSideElement()
{
    document.getElementById("lateral_right_number_frame").addEventListener("click", () => {   
        let newValue = Number(document.getElementById("lateral_right_number_frame").innerText);
        updateNumbers(newValue);

    });

    document.getElementById("right_number_frame").addEventListener("click", () => {   
        let newValue = Number(document.getElementById("right_number_frame").innerText);
        updateNumbers(newValue);
    });

    document.getElementById("left_number_frame").addEventListener("click", () => {   
        let newValue = Number(document.getElementById("left_number_frame").innerText);
        updateNumbers(newValue);
    });

    document.getElementById("lateral_left_number_frame").addEventListener("click", () => {   
        let newValue = Number(document.getElementById("lateral_left_number_frame").innerText);
        updateNumbers(newValue);
    }); 
}

restartButton.addEventListener("click", resetGame);

function resetGame()
{
    errorMovingToSideElement();

    setTimeout(() =>
        {
            inputUserNumberBackground.style.transition = "0.3s opacity ease";  
            inputUserNumberBackground.style.opacity = "0";
            
            timerFrame.style.transition = "0.3s opacity ease";  
            timerFrame.style.opacity = "0";
            timerFrame.style.marginTop = "-7.8rem";
            
            levelTypes.style.opacity = "1";
            levelTypes.style.transition = "0.2s opacity ease"
        
            startButton.style.opacity = "1";
            startButton.style.transition = "0.3s ease";

            inputUserNumber.value = "";
        }, 400);
        setTimeout(() => {
            inputUserNumberBackground.style.opacity = "1";
            inputUserNumberBackground.style.display = "grid";
            levelTypes.style.display = "grid";
            startButton.style.display = "grid";
            inputUserNumberBackground.style.display = "none";
    }, 301);
    setTimeout(() => {
        inputUserNumberBackground.style.opacity = "0";
        inputUserNumberBackground.style.transition = "0.3s opacity ease";
    }, 1);
    stopTimer();
    clearValue();
    randomNumber = 0;
}

function clearValue()
{
    document.getElementById("middle_number_frame").style.boxShadow = "none";
    document.getElementById("right_number_frame").style.boxShadow = "none";
    document.getElementById("lateral_right_number_frame").style.boxShadow = "none";
    document.getElementById("lateral_left_number_frame").style.boxShadow = "none";
    document.getElementById("left_number_frame").style.boxShadow = "none";
    inputUserNumber.value = "0";
    document.getElementById("middle_number_frame").innerText = "";
    document.getElementById("left_number_frame").innerText = "";
    document.getElementById("right_number_frame").innerText = "";
    document.getElementById("lateral_right_number_frame").innerText = "";
    document.getElementById("lateral_left_number_frame").innerText = "";

}

function userWin(variantTimer)
{
    if(variantTimer == 4)
    {
        alert("Congratulations. You passed the Easy Level!!!");
        easyWin++;
    }
    else if(variantTimer == 2)
    {
        alert("Congratulations. You passed the Medium Level!!!");
        mediumWin++;
    }
    else if(variantTimer == 1)
    {
        alert("Congratulations. You passed the Hard Level!!!");
        hardWin++;
    }
    else
    {
        alert("ERROR!");
    }
    resetGame();
}

function updateNumbers(baseValue)
{
    if(baseValue > 0)
        {
        document.getElementById("middle_number_frame").innerText = baseValue;
        document.getElementById("left_number_frame").innerText = baseValue - 1;
        document.getElementById("right_number_frame").innerText = baseValue + 1;
        document.getElementById("lateral_right_number_frame").innerText = baseValue + 2;
        document.getElementById("lateral_left_number_frame").innerText = baseValue - 2;

        if(baseValue > randomNumber)
            {
                document.getElementById("middle_number_frame").style.boxShadow = "none";
                document.getElementById("right_number_frame").style.boxShadow = "0 0 2rem  #aa1100";
                document.getElementById("lateral_right_number_frame").style.boxShadow = "0 0 2rem  #aa1100";
                document.getElementById("lateral_left_number_frame").style.boxShadow = "0 0 2rem  #11aa00";
                document.getElementById("left_number_frame").style.boxShadow = "0 0 2rem  #11aa00";
            }
        else if(baseValue < randomNumber)
            {
                document.getElementById("middle_number_frame").style.boxShadow = "none";
                document.getElementById("left_number_frame").style.boxShadow = "0 0 2rem  #aa1100";
                document.getElementById("lateral_left_number_frame").style.boxShadow = "0 0 2rem #aa1100";
                document.getElementById("lateral_right_number_frame").style.boxShadow = "0 0 2rem  #11aa00";
                document.getElementById("right_number_frame").style.boxShadow = "0 0 2rem  #11aa00";
            }
        else
            {
                document.getElementById("middle_number_frame").style.boxShadow = "0 0 1.5rem yellow";
                document.getElementById("left_number_frame").style.boxShadow = "0 0 1.5rem yellow";
                document.getElementById("lateral_left_number_frame").style.boxShadow = "0 0 1.5rem yellow";
                document.getElementById("lateral_right_number_frame").style.boxShadow = "0 0 1.5rem  yellow";
                document.getElementById("right_number_frame").style.boxShadow = "0 0 1.5rem yellow";
                userWin(variantTimer);
            }

        }
        else
        {
            if(baseValue == "" || baseValue == 0)
            {
                if(randomNumber == 0 || randomNumber == "")
                {
                    
                }
                else
                {
                    alert("Enter and send some number...");
                }
            }
            else if(baseValue < 0)
            {
                alert("Select num is < 0");
            }
            else
            {
                alert("ERROR!")
            }
        }
}

navMenuButton.addEventListener("click", navMenuFunction);
let isOpen = false;
function navMenuFunction()
{
    if(!isOpen)
    {
        setTimeout(() =>{
            navMenu.style.borderRadius = "2rem";
            navMenuButton.style.width = "1.6rem";
            navMenuButton.style.height = "1.6rem";
            navMenu.style.width = "18rem";
            navMenu.style.height = "18rem";
            navMenu.style.transition = "0.3s ease";
            statFunction();
        }, 1);
        setTimeout(() => {
            state.style.opacity = "1";
            state.style.transition = "0.3s ease";
        }, 301);
    } else
    {
        setTimeout(() => {
            state.style.opacity = "0";
            state.style.transition = "0.3s ease";
        }, 1);

        setTimeout(() => {
            navMenu.style.borderRadius = "4rem";
            navMenuButton.style.width = "2.5rem";
            navMenuButton.style.height = "2.5rem";
            navMenu.style.width = "5rem";
            navMenu.style.height = "5rem";
            navMenu.style.transition = "0.3s ease";
        }, 301);
    }

isOpen = !isOpen;
}
function statFunction()
{
    if(maxNumber == 100000)
    {
        document.getElementById("stat_easy_level").innerText = "Easy Level: " + easyWin;
    }
    else if(maxNumber == 1000000)
    {
        document.getElementById("stat_medium_level").innerText = "Medium Level: " + mediumWin;
    }
    else if(maxNumber == 10000000)
    {
        document.getElementById("stat_hard_level").innerText =  "Hard Level: " + hardWin;
    }
}
