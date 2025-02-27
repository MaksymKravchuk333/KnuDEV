//Variable sector:______________________________________________________________________________________________
let buttons = document.getElementsByClassName("arithmetic_symbol");
let hiddenButons = document.getElementsByClassName("hidden_button");

let expressionWithoutEqual;
let lastSymbolOutputResult;
let stringOutputResult;
let orDeployHistory = false;
let result;
let historyCount;
let orDeployMoreMathActions = false;
let historyBlocks;
//______________________________________________________________________________________________

//Event sector:______________________________________________________________________________________________
document.getElementById("clear_input_field_button").addEventListener("click", function() {
    console.log(document.getElementById("clear_input_field_button").textContent);
    if(document.getElementById("clear_input_field_button").textContent == "AC")
    {
        clearInputFieldAC();
    }
    else
    {
        clearInputFieldC();
    }
});

for(let button of buttons)
    {
        button.addEventListener("click", function() {
            handleDigitInput(this.textContent);
            changeCleaner();
            console.log(this.textContent);
            });
    }

document.getElementById("find_out_result_button").addEventListener("click", function() {
    stringOutputResult = document.getElementById("output_result").value;
    result = solutionExpression(stringOutputResult);
    result = parseFloat(result.toFixed(5));
    createHistoryBlock(result, "");
    updateInputFrame(result, "");
    document.getElementById("clear_input_field_button").textContent = "AC";

});
document.getElementById("history").addEventListener("click", function() {
if(orDeployHistory == false)
{
    deployedHistory();
}
else
{
    notDeployedHistory();
}
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("history-item")) {
        reOutputResultFromHistory(event.target.textContent.trim());
        console.log(event.target.textContent);
    }
});

document.getElementById("output_result").addEventListener("input", changeCleaner);

document.getElementById("more_math_actions").addEventListener("click", function(){ 
    if(orDeployMoreMathActions == false)
    {
        moreMathActionsFunctionOpen();
    }
    else
    {
        moreMathActionsFunctionClose();
    }
    
});

document.getElementById("sqrt_symbol").addEventListener("click",sqrtSolveExpression);
document.getElementById("pow_symbol").addEventListener("click",powSolveExpression);


//______________________________________________________________________________________________

//Function sector:______________________________________________________________________________________________
function powSolveExpression()
{
    stringOutputResult = document.getElementById("output_result").value;
    result = Math.pow(solutionExpression(stringOutputResult), 2);
    result = parseFloat(result.toFixed(5));
    createHistoryBlock(result, document.getElementById("pow_symbol").textContent);
    updateInputFrame(result, document.getElementById("pow_symbol").textContent);
    document.getElementById("clear_input_field_button").textContent = "AC";
}

function sqrtSolveExpression()
{
    stringOutputResult = document.getElementById("output_result").value;
    result = Math.sqrt(solutionExpression(stringOutputResult));
    result = parseFloat(result.toFixed(5));
    createHistoryBlock(result, document.getElementById("sqrt_symbol").textContent);
    updateInputFrame(result, document.getElementById("sqrt_symbol").textContent);
    document.getElementById("clear_input_field_button").textContent = "AC";
}

function moreMathActionsFunctionClose()
{
    let historyBlocks = document.getElementsByClassName("history-item");


    for(historyBlock of historyBlocks)
    {
        historyBlock.style.width = "20rem";
    }

    document.getElementById("output_result").style.width = "22rem";
    document.getElementById("output_result").style.transition = "0.3s ease";

    document.getElementById("history").style.marginLeft = "18.7rem";
    document.getElementById("history").style.transition = "0.3s ease";

    document.getElementById("upper_frame_calculator").style.transition = "0.3s ease"
    document.getElementById("lower_frame_calculator").style.transition = "0.3s ease"
    document.getElementById("calculator").style.transition = "0.3s ease"
    document.getElementById("nav").style.width = "25rem";
    document.getElementById("nav").style.transition = "0.3s ease";

    document.getElementById("upper_frame_calculator").style.width = "25.563rem";
    document.getElementById("calculator").style.width = "25.563rem";
    document.getElementById("lower_frame_calculator").style.width = "24.25rem";
    document.getElementById("lower_frame_calculator").style.paddingInline = "0rem";
    document.getElementById("find_out_result_button").style.gridColumnStart = "4";
    document.getElementById("lower_frame_calculator").style.gridTemplateColumns = "4.125rem 4.125rem 4.125rem 4.125rem";

    for(hiddenButton of hiddenButons)
    {
        hiddenButton.style.display = "none";
    }
    orDeployMoreMathActions = false;
}


function moreMathActionsFunctionOpen()
{

    let historyBlocks = document.getElementsByClassName("history-item");

    console.log("History items found:", historyBlocks.length); 

    for(historyBlock of historyBlocks)
    {
        historyBlock.style.width = "28rem";
    }

    document.getElementById("output_result").style.width = "30rem";
    document.getElementById("output_result").style.transition = "0.3s ease";

    document.getElementById("history").style.marginLeft = "24.7rem";
    document.getElementById("history").style.transition = "0.3s ease";

    document.getElementById("upper_frame_calculator").style.transition = "0.3s ease"
    document.getElementById("lower_frame_calculator").style.transition = "0.3s ease"
    document.getElementById("calculator").style.transition = "0.3s ease"
    document.getElementById("nav").style.width = "31rem";
    document.getElementById("nav").style.transition = "0.3s ease";

    document.getElementById("upper_frame_calculator").style.width = "32.563rem";
    document.getElementById("calculator").style.width = "32.563rem";
    document.getElementById("lower_frame_calculator").style.width = "28.374rem";
    document.getElementById("lower_frame_calculator").style.paddingInline = "1.438rem";
    document.getElementById("find_out_result_button").style.gridColumnStart = "5";
    document.getElementById("lower_frame_calculator").style.gridTemplateColumns = "4.125rem 4.125rem 4.125rem 4.125rem 4.125rem";

    for(hiddenButton of hiddenButons)
    {
        hiddenButton.style.display = "block";
    }
    orDeployMoreMathActions = true;
}

function changeCleaner()
{
    if(document.getElementById("output_result").value == "")
        {
             document.getElementById("clear_input_field_button").textContent = "AC";
        }   
    else
        {
            document.getElementById("clear_input_field_button").textContent = "C";
        } 
}

function reOutputResultFromHistory(someValue)
{
    expressionWithoutEqual = someValue.split(" = ")[0];
    if(expressionWithoutEqual[0] == document.getElementById("sqrt_symbol").textContent.trim())
    {
        console.log(expressionWithoutEqual[0]);
        console.log(document.getElementById("sqrt_symbol").textContent.trim());
        expressionWithoutEqual.slice(1);
    }
    document.getElementById("output_result").value = expressionWithoutEqual;
}

function createHistoryBlock(resultMessage, unicSymbol){
    const list = document.getElementById('history_list');

    historyCount++;

    const newHistoryBlock = document.createElement('h1');
    newHistoryBlock.id = "historyBlock_" + historyCount;
    newHistoryBlock.className = 'history-item';
    if(unicSymbol.trim() == document.getElementById("pow_symbol").textContent)
    {
        newHistoryBlock.textContent = "(" + document.getElementById("output_result").value + ")" + unicSymbol + " = "+ resultMessage;    
    }
    else if(unicSymbol.trim() == document.getElementById("sqrt_symbol").textContent)
    {
        newHistoryBlock.textContent = unicSymbol + "(" + document.getElementById("output_result").value + ")" + " = "+ resultMessage;
    }
    else
    {
        newHistoryBlock.textContent = unicSymbol + document.getElementById("output_result").value + " = "+ resultMessage;
    }
    newHistoryBlock.style.marginBlock = "0.5rem";
    
    
    list.prepend(newHistoryBlock);
}

function deployedHistory(){
    document.getElementById("history_list").style.display = "grid";

    document.getElementById("lower_frame_calculator").style.opacity = "0";
    document.getElementById("lower_frame_calculator").style.transition = "0.3s opacity ease";

    document.getElementById("upper_frame_calculator").style.height = "35rem";
    document.getElementById("upper_frame_calculator").style.transition = "0.3s ease";
    orDeployHistory = true;
    console.log("orDeployHistory = true");
}

function notDeployedHistory(){
    document.getElementById("history_list").style.display = "none";

    document.getElementById("lower_frame_calculator").style.opacity = "1";
    document.getElementById("lower_frame_calculator").style.transition = "0.3s opacity ease";

    document.getElementById("upper_frame_calculator").style.height = "10rem";
    document.getElementById("upper_frame_calculator").style.transition = "0.3s ease";
    orDeployHistory = false;
    console.log("orDeployHistory =  false");
}

function updateInputFrame(newResult, unicSymbol){
    updatePrevAction(newResult, unicSymbol);
    outputResultOfExpression(newResult);
}

function updatePrevAction(result, unicSymbol){
    if(unicSymbol == document.getElementById("pow_symbol").textContent)
    {
        document.getElementById("prev_action_block").textContent = "(" + document.getElementById("output_result").value + ")" + unicSymbol +  " = " + result;
    }
    else if(unicSymbol == document.getElementById("sqrt_symbol").textContent)
    {
        document.getElementById("prev_action_block").textContent = unicSymbol + "(" + document.getElementById("output_result").value + ")" + " = " + result;
    }
    else
    {
        document.getElementById("prev_action_block").textContent = unicSymbol + document.getElementById("output_result").value + " = " + result;
    }
}

function outputResultOfExpression(resultValue){
    document.getElementById("output_result").value = resultValue;
}

function solutionExpression(someExpression){
    // return math.evaluate(someExpression);
    return math.evaluate(someExpression.replace(/\|(.*?)\|/g, (_, solvedAbs) => `${Math.abs(math.evaluate(solvedAbs))}`));
    
}

function handleDigitInput(someValue){
    stringOutputResult = document.getElementById("output_result").value;
    lastSymbolOutputResult = stringOutputResult[stringOutputResult.length - 1];
    if(checkArithmeticAction(lastSymbolOutputResult, someValue) == 1){
        document.getElementById("output_result").value += someValue;
    }
    
}

function checkArithmeticAction(lastSymbol, currentSymbol){
    
    if(stringOutputResult == "" && (currentSymbol == "-" || currentSymbol == "+" || currentSymbol == "*" || currentSymbol == "/" || currentSymbol == "%"))
        {
            stringOutputResult = "";
            document.getElementById("output_result").value = stringOutputResult;
            return 0;
        }
    else if((lastSymbol == "-" || lastSymbol == "+" || lastSymbol == "*" || lastSymbol == "/" || lastSymbol == "%") && (currentSymbol == "-" || currentSymbol == "+" || currentSymbol == "*" || currentSymbol == "/" || currentSymbol == "%"))
        {
            stringOutputResult = stringOutputResult.slice(0, -1) + currentSymbol;
            document.getElementById("output_result").value = stringOutputResult;
            return 0;
        }
    else{
        return 1;
    }
}

function clearInputFieldC(){
    stringOutputResult = document.getElementById("output_result").value;
    stringOutputResult = stringOutputResult.slice(0, -1); 
    document.getElementById("output_result").value = stringOutputResult; 

    if(stringOutputResult.length == 0)
    {
        document.getElementById("clear_input_field_button").textContent = "AC";
    }
}

function clearInputFieldAC (){
    document.getElementById("output_result").value = "";
    document.getElementById("prev_action_block").textContent = "";
}
//______________________________________________________________________________________________