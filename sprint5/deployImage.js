function startDeployedImageFunction(){
    let imageFromList = document.querySelectorAll('.image_from_list'); 

    imageFromList.forEach((image) => {
    image.addEventListener('click', () => {
            imageCopy = image.cloneNode(true);
            deployedImage(imageCopy);
            console.log('deployed image');
    });
    });
}
function deployedImage(image)
{
    if(!document.querySelector('.background_deployed_image')){
        let backgroundDeployedImage = document.createElement('div');
        backgroundDeployedImage.classList.add('background_deployed_image');

        document.body.appendChild(backgroundDeployedImage);
        

        backgroundDeployedImage.appendChild(image);
        image.style.margin = "0";
        image.style.width = "80%";
        image.style.height = "80%";
        image.style.borderRadius = "1rem";

        backgroundDeployedImage.style.gap = "0.5rem";
        backgroundDeployedImage.style.padding = "2rem";

        let nameImage = document.createElement('h1');
    nameImage.classList.add('name-deployed-image');
    nameImage.textContent = "Image Name";
    backgroundDeployedImage.appendChild(nameImage);

    let descriptionImage = document.createElement('p');
    descriptionImage.classList.add('description-deployed-image');
    descriptionImage.textContent = "Image Description";
    backgroundDeployedImage.appendChild(descriptionImage);

    let buttonClose = document.createElement('button');
    buttonClose.classList.add('button-close');
    buttonClose.textContent = 'Close';
    buttonClose.style.position = 'absolute';
    buttonClose.style.top = '1rem';
    buttonClose.style.right = '1rem';
    backgroundDeployedImage.appendChild(buttonClose);

        buttonClose.addEventListener('click', () => {
            backgroundDeployedImage.remove();
        });

    }
}