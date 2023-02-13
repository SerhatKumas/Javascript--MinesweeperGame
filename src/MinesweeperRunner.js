let placeArray = null;
let numberOfMineField = 25;

function gameInitializer(){
let maxNumberOfMines = 5;
let numberOfMines = randomNumberCreatorForMines(maxNumberOfMines);
document.getElementById("mine-num").innerHTML = numberOfMines;
placeArray = randomPlaceCreatorForMines(numberOfMines);
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

function checkTheField(id){
    if(placeArray.includes(parseInt(id))){
    document.getElementById(id).style.backgroundColor = "red";
    gameLostActions();
    }
    else{
        document.getElementById(id).style.backgroundColor = "green";
    }
}

function gameLostActions(){
    for(let i = 1; i <= numberOfMineField; i++){
        document.getElementById(i).disabled = true;
        if(placeArray.includes(i)){
            document.getElementById(i).style.backgroundColor = "red";
        }
        else{
            document.getElementById(i).style.backgroundColor = "green";
        }
    }
}