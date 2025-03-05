//variables
let counter = 0;
let openAssigmentCreator = document.getElementById("open_assigment_creator");
let assigmentCreatorMenu = document.getElementById("assigment_creator_menu");
let buttonCreateAssignment = document.getElementById("button_create_assigment");
let editAssigmentFrame = document.getElementById("edit_assigment_frame");
let buttonEditDescription = document.getElementById("button_edit_description");
let buttonEditAssigment = document.getElementById("button_edit_assigment");
let deleteSelectedAssigment = document.getElementById("delete_selected_assigment");
let closeAssigmentCreator = document.getElementById("close_assigment_creator");

let logoAndNameRight = document.getElementById("logo_and_name_right");
let logoAndNameLeft = document.getElementById("logo_and_name_left");
let currentAssigment = null;
let arrayAssigment = [];
let arrayAssigmentId = [];
let selectedAssigment = [];
// class:

class Assigment {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }

    addToList() {
        let newAssigment = document.createElement('li');
        
        newAssigment.classList.add('assigment');
        newAssigment.id = "assigment_N" + counter;
        arrayAssigmentId.push(newAssigment.id);
        newAssigment.setAttribute('data-name', this.name);
        newAssigment.setAttribute('data-description', this.description);

        let textSpan = document.createElement('span');
        textSpan.textContent = this.name;

        newAssigment.addEventListener("click", () => {
            document.getElementById("name_of_assigment_edit").value = newAssigment.getAttribute('data-name');
            document.getElementById("description_of_assigment_edit").value = newAssigment.getAttribute('data-description');
            currentAssigment = newAssigment;
            document.getElementById("info_container__edit_assigment_frame").style.display = "grid";
            hideLogoAndNameRight();
        });
        newAssigment.appendChild(textSpan);
        createMarkAssigment(newAssigment);
        document.getElementById("list_of_assigment").appendChild(newAssigment);  

        for(let assigmentCheckbox of document.getElementsByClassName("custom-checkbox")) {
            assigmentCheckbox.addEventListener("change", function(event) {
                // first part of the function
                if(event.target.checked){
                    if(!selectedAssigment.includes(event.target.id)) {
                    selectedAssigment.push(event.target.id);

                    console.log(selectedAssigment);
                }
            }
                else {
                    if(selectedAssigment.includes(event.target.id)) {
                        selectedAssigment.splice(selectedAssigment.indexOf(event.target.id), 1);
                    }
                } 
            // second part of the function    
                if(selectedAssigment.length > 0)deleteSelectedAssigment.style.display = "block"; // --> show delete button
                else deleteSelectedAssigment.style.display = "none"; // --> hide delete button
            // third part of the function
            
            });
        }
    }
    

    
}
// event:

closeAssigmentCreator.addEventListener("click", hideAssigmentCreatorMenu);

deleteSelectedAssigment.addEventListener("click", () => { 
    let selectedAssigmentCopy = [...selectedAssigment];

    selectedAssigmentCopy.forEach((markId) => {
        let idNumSelectedMark = markId.substring(19);

        let assigmentsToRemove = arrayAssigmentId.filter((assigmentId) => {
            let idNumAssigment = assigmentId.substring(10);
            return idNumSelectedMark === idNumAssigment;
        });

        assigmentsToRemove.forEach((assigmentId) => {
            let element = document.getElementById(assigmentId);
            if (element) {
                element.remove();
            }

            
            arrayAssigmentId = arrayAssigmentId.filter(id => id !== assigmentId);
            arrayAssigment = arrayAssigment.filter(a => a.id !== assigmentId);
            selectedAssigment = selectedAssigment.filter(id => id !== markId);


            if(arrayAssigmentId.length === 0)appearLogoAndNameLeft();

            appearLogoAndNameRight();
        });
    });

    // CLEAR EDIT FRAME
    document.getElementById("name_of_assigment_edit").value = "";
    document.getElementById("description_of_assigment_edit").value = "";
    document.getElementById("info_container__edit_assigment_frame").style.display = "none";

    // Ховаємо кнопку видалення, якщо більше нічого не вибрано
    if (selectedAssigment.length === 0) {
        deleteSelectedAssigment.style.display = "none";
    }
});

buttonEditAssigment.addEventListener("click", editAssigment);

document.getElementById("button_edit_name").addEventListener("click", () => {
    document.getElementById("name_of_assigment_edit").style.pointerEvents = "auto";
});

document.getElementById("button_edit_description").addEventListener("click", () => {
    document.getElementById("description_of_assigment_edit").style.pointerEvents = "auto";
});

openAssigmentCreator.addEventListener("click", assigmentCreatorClosed);

buttonCreateAssignment.addEventListener("click", createAssigment);

//function

function appearLogoAndNameRight()
{
    logoAndNameRight.style.display = "grid";
}

function hideLogoAndNameRight() {
    logoAndNameRight.style.display = "none";
}
function appearLogoAndNameLeft()
{
    logoAndNameLeft.style.display = "grid";
}

function hideLogoAndNameLeft() {
    logoAndNameLeft.style.display = "none";
}

function hideAssigmentCreatorMenu()
{
    assigmentCreatorMenu.style.display = "none";
    openAssigmentCreator.style.display = "block";   
}


function createAssigment() {
    let name = document.getElementById("name_of_assigment").value;

    if(name.trim() == "") {
        errorFunct();
    }
    
    let description = document.getElementById("description_of_assigment").value;
    
    const newAssigment = new Assigment(name, description);
    arrayAssigment.push(newAssigment);
    newAssigment.addToList();
    counter++;

    hideLogoAndNameLeft();
    
    document.getElementById("name_of_assigment").value = "";
    document.getElementById("description_of_assigment").value = "";
}

function editAssigment(){
    if (currentAssigment) {

        if(document.getElementById("name_of_assigment_edit").value.trim() !== "") {
            currentAssigment.setAttribute('data-name', document.getElementById("name_of_assigment_edit").value);
            currentAssigment.setAttribute('data-description', document.getElementById("description_of_assigment_edit").value);
            currentAssigment.querySelector("span").textContent = document.getElementById("name_of_assigment_edit").value;
    
        document.getElementById("name_of_assigment_edit").value = "";
        document.getElementById("description_of_assigment_edit").value = "";
        document.getElementById("info_container__edit_assigment_frame").style.display = "none";
        appearLogoAndNameRight();
    }else {
            alert("Enter the name of the assigment");
        }
    }  
    currentAssigment = null;  
}

function createMarkAssigment(element) 
{
    element.style.display = "flex";
    element.style.justifyContent = "space-between";
    element.style.alignItems = "center";

    let mark = document.createElement('input');
    mark.type = "checkbox";
    mark.id = "assigment_checkbox_N" + counter;
    mark.classList.add("custom-checkbox");
    element.appendChild(mark);
}

function assigmentCreatorClosed()
{
    assigmentCreatorMenu.style.display = "grid";
    assigmentCreatorMenu.style.transition = "0.3s ease"
    assigmentCreatorMenu.style.position = "relative";
    openAssigmentCreator.style.display = "none";
}