function scrollImage() {
    console.log("start function scrollImages");
    if(!document.getElementsByClassName("moving-arrow-button")){
    let rightMovingArrow = document.createElement("button");
    let leftMovingArrow = document.createElement("button");
    leftMovingArrow.classList.add("moving-arrow-button");
    leftMovingArrow.id.add("left-moving-arrow-button");
    rightMovingArrow.classList.add("moving-arrow-button");
    rightMovingArrow.id.add("right-moving-arrow-button");
    document.getElementById("image-list").before(leftMovingArrow);
    document.getElementById("image-list").after(rightMovingArrow);
    }
}