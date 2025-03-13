let arrayImages = [];
let counter = 0;
function startAddImageToListFunction(){
    let buttonAddImage = document.getElementById("add-image");
    buttonAddImage.addEventListener("change", addImageToList);
    
}
function addImageToList(event) {
    console.log(event.target.files[0]);
    if(event.target.files[0].name.includes(".png") || event.target.files[0].name.includes(".jpg"))
    {
        console.log("Image");

        let newElement = document.createElement("li");
        document.getElementById("image-list").appendChild(newElement);
        
        let newElementImage = event.target.files[0];

        const imgList = document.createElement("img");
        imgList.classList.add("image_from_list");

        const reader = new FileReader();
        reader.onload = function(e){
            imgList.src = e.target.result;
        };
        reader.readAsDataURL(newElementImage);


        newElement.appendChild(imgList);


        newElement.imageName = newElementImage.name.split(".")[0];

        arrayImages.push(newElement);
        console.log(arrayImages);

        startDeployedImageFunction();
        changeButtonAddImage();

        if(arrayImages.length > 4){
            scrollImage();
        }   

        counter++;
        }
    else
    {
        console.log("Not image");
    }
}
function changeButtonAddImage(){
    document.getElementById("add-image-button").style.width = "5rem";
    document.getElementById("add-image-button").style.height = "5rem";
    document.getElementById("add-image-button").style.fontSize = "2.5rem";
    document.getElementById("add-image-button").style.top = "67%";
    document.getElementById("add-image-button").style.right = "47%";
    
        
}

startAddImageToListFunction();