let placeArray = []
let numberOfMineField = 25;

function gameInitializer(){
let maxNumberOfMines = 5;
let numberOfMines = randomNumberCreatorForMines(maxNumberOfMines);
document.getElementById("mine-num").innerHTML = numberOfMines;
placeArray = randomPlaceCreatorForMines(numberOfMines);
console.log(placeArray);
}

function randomNumberCreatorForMines(maxNumberOfMines){
let numberOfMines = Math.floor(Math.random() * maxNumberOfMines) + 1;
return numberOfMines;
}

function randomPlaceCreatorForMines(numberOfMines){
    let placeArray = []
    while(placeArray.length < numberOfMines){
        let place = Math.floor(Math.random() * 25) + 1;
        if(!placeArray.includes(place)){
            placeArray.push(place);
        } 
    }
    return placeArray;
}