// Random number of mines are created each round
let numberOfMines = 0;
// Array that holds place of randomly created mines
let placeArray = null;
// Number of total minefield
let numberOfMineField = 25;
// Number of how many times mine fields are clicked by user
let clickedFieldCount = 0;

// Game initializer method every round
function gameInitializer() {
    let maxNumberOfMines = 5;
    let numberOfMines = randomNumberCreatorForMines(maxNumberOfMines);
    document.getElementById("mine-num").innerHTML = numberOfMines;
    placeArray = randomPlaceCreatorForMines(numberOfMines);
}

// Determiner method fo how many mines will be created
function randomNumberCreatorForMines(maxNumberOfMines) {
    numberOfMines = Math.floor(Math.random() * maxNumberOfMines) + 1;
    return numberOfMines;
}

// Random place of mine creator according to number of mine is created
function randomPlaceCreatorForMines(numberOfMines) {
    let placeArray = []
    while (placeArray.length < numberOfMines) {
        let place = Math.floor(Math.random() * 25) + 1;
        if (!placeArray.includes(place)) {
            placeArray.push(place);
        }
    }
    return placeArray;
}

// Method that checks whether field is mine or not
// If field is mine, it finishes the game
// If field is not mine, it writes mine around the field and paints field with green 
function checkTheField(id) {
    //Checking whether field is mine
    if (placeArray.includes(parseInt(id))) {
        // Painting field with red
        document.getElementById(id).style.backgroundColor = "red";
        // Game lost actions method is executed
        gameLostActions();
    } else {
        // If field is not mine
        // Field is painted with green
        document.getElementById(id).style.backgroundColor = "green";
        // It disables the field clicked and not mine
        document.getElementById(id).disabled = true;
        // Number of clicked is increased for checking game win cases
        clickedFieldCount++;
        // Number of araound mines are written into field
        document.getElementById(id).innerHTML = determineNumberOfFieldsAround(id);
        // If total field - number of mines are clicked, it means player won the game
        if (clickedFieldCount == numberOfMineField - numberOfMines) {
            // Game win actions method is executed
            gameWinActions();
        }
    }
}

// Game Loss method that paints every field according to whether field is mine or not with red and green
// It prints out game loss header
function gameLostActions() {
    colorizeMineMatrix();
    document.getElementById("game-result").innerHTML = "You Lost The Game";
}

// Game Loss method that paints every field according to whether field is mine or not with red and green
// It prints out game won header
function gameWinActions() {
    colorizeMineMatrix();
    document.getElementById("game-result").innerHTML = "You Won The Game";
}

// It paints every field according to whether field is mine or not with red and green and disables every field
function colorizeMineMatrix() {
    for (let i = 1; i <= numberOfMineField; i++) {
        document.getElementById(i).disabled = true;
        if (placeArray.includes(i)) {
            document.getElementById(i).style.backgroundColor = "red";
        } else {
            document.getElementById(i).style.backgroundColor = "green";
        }
    }
}

// Resets every parameter, and starts new game
function resetGame() {
    for (let i = 1; i <= numberOfMineField; i++) {
        // Enables every field
        document.getElementById(i).disabled = false;
        // Paints every field into black (original game starting color)
        document.getElementById(i).style.backgroundColor = "black";
        placeArray = null;
        numberOfMines = 0;
        clickedFieldCount = 0;
        // Clears every mine field prediction numbers
        document.getElementById("game-result").innerHTML = "";
        // Starts new game
        gameInitializer();
    }
}

// It covers 3 cases which are left side, right side and rest of the field in matrix
// It creates place array around clicked button
// Returns number of mines around the clicked button to checkTheField method to write 
function determineNumberOfFieldsAround(stringId) {
    let id = parseInt(stringId);
    let mineNumberAround = 0;
    let numberOfFieldsAround = []
    // Left side of the matrix
    if (id % 5 == 0) {
        numberOfFieldsAround = [id - 1, id - 5, id + 5, id - 6, id + 4];
        mineNumberAround = returnNumberOfMinesAround(numberOfFieldsAround);
    }
    // Right side of the matrix
    else if (id % 5 == 1) {
        numberOfFieldsAround = [id + 1, id - 5, id + 5, id + 6, id - 4];
        mineNumberAround = returnNumberOfMinesAround(numberOfFieldsAround);
    }
    // Middle par of the matrix
    else {
        numberOfFieldsAround = [id - 1, id + 1, id - 5, id + 5, id + 6, id - 6, id - 4, id + 4];
        mineNumberAround = returnNumberOfMinesAround(numberOfFieldsAround);
    }
    return mineNumberAround;

}

// Returns number of mines around the clicked button by checking whether field around button is in placeArray
// placeArray -> It holds place of the mines
function returnNumberOfMinesAround(numberOfFieldsAround) {
    let mineNumberAround = 0;
    numberOfFieldsAround.forEach(element => {
        if (placeArray.includes(element)) {
            mineNumberAround++;
        }
    });
    return mineNumberAround;
}