let placeArray = null;
let numberOfMines = 0;
let numberOfMineField = 25;
let clickedFieldCount = 0;

function gameInitializer(){
let maxNumberOfMines = 5;
let numberOfMines = randomNumberCreatorForMines(maxNumberOfMines);
document.getElementById("mine-num").innerHTML = numberOfMines;
placeArray = randomPlaceCreatorForMines(numberOfMines);
}

function randomNumberCreatorForMines(maxNumberOfMines){
numberOfMines = Math.floor(Math.random() * maxNumberOfMines) + 1;
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
        clickedFieldCount++;
        document.getElementById(id).innerHTML = determineNumberOfFieldsAround(id);
        if(clickedFieldCount == numberOfMineField - numberOfMines){
            gameWinActions();
        }
    }
}

function gameLostActions(){
    colorizeMineMatrix();
    document.getElementById("game-result").innerHTML = "You Lost The Game";
}

function gameWinActions(){
    colorizeMineMatrix();
    document.getElementById("game-result").innerHTML = "You Won The Game";
}

function colorizeMineMatrix(){
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

function resetGame(){
    for(let i = 1; i <= numberOfMineField; i++){
        document.getElementById(i).disabled = false;
        document.getElementById(i).style.backgroundColor = "black";
        placeArray = null;
        numberOfMines = 0;
        clickedFieldCount = 0;
        document.getElementById("game-result").innerHTML = "";
        gameInitializer();
    }
}

function determineNumberOfFieldsAround(stringId){
    let id = parseInt(stringId);
    let mineNumberAround = 0 ;
    let numberOfFieldsAround = []
    if(id % 5 == 0){
        numberOfFieldsAround = [id-1,id-5,id+5,id-6,id+4];
        mineNumberAround = returnNumberOfMinesAround(numberOfFieldsAround);
    }
    else if (id % 5 == 1){
        numberOfFieldsAround = [id+1,id-5,id+5,id+6,id-4];
        mineNumberAround = returnNumberOfMinesAround(numberOfFieldsAround);
    }
    else{
        numberOfFieldsAround = [id-1,id+1,id-5,id+5,id+6,id-6,id-4,id+4];
        mineNumberAround = returnNumberOfMinesAround(numberOfFieldsAround);
    }
return mineNumberAround;
    
}

function returnNumberOfMinesAround(numberOfFieldsAround){
    let mineNumberAround = 0 ;
    numberOfFieldsAround.forEach(element => {
        if(placeArray.includes(element)){
            mineNumberAround++;
        }
    });
    return mineNumberAround;
}