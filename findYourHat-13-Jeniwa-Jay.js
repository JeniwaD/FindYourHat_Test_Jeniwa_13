const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const hat = '🧀';
const hole = '🍄';
const fieldCharacter = '🟩';
const pathCharacter = '🐹';
let rowIndex = 0;
let columnIndex = 0;
let validInput = 1;

console.log('WELCOME TO CHEESE IN THE YARD! <3');
console.log(`
Input <l> to go <left>
Input <r> to go <right>
Input <u> to go <up>
Input <d> to go <down>`);

/*To make all elements combine together
Using Array Method prototype.join to make the split array joined together. 
The use \n to make the new line after meet the row's condition*/
class Field {
  constructor(fieldArray) {
    this.field = fieldArray;
  }
  print() {
    let fieldString = '';
   this.field.forEach(arr => {
      fieldString += arr.join('');
      fieldString += '\n';
  });
  console.log(fieldString);
 }


/* 
To declear the condition for eact character when the pathCharacter walk through it
Using function if..else to log the secret message that will appear after the pathCharacter walk through something which not equal 'undefined'.
if the user walk through the hat, it will return 'Yay!! You found the cheese!'.
if the user walk through the hole, it will return 'Oh Noooo! You ate a Poison Mushroom :( GAME OVER!!!)'.
if the user walk through the fieldCharacter, the pathCharacter will walk one more step and continue the game.
if the user walk out of the bound, it will return 'You went out of the yard!? END GAME'.
*/
validateInput(row, col) {
    if(typeof this.field[row]!=='undefined' && typeof this.field[row][col]!=='undefined') {
        if(this.field[row][col] === hat) {
            console.log('Yay!! You found the cheese!');
        }else if(this.field[row][col] === hole) {
            console.log('Oh Noooo! You ate a Poison Mushroom :( GAME OVER!!!)');
        }else if(this.field[row][col] === fieldCharacter) {
        this.field[row][col] = pathCharacter;
             return 1;           
        }
    }else{
        console.log('You went out of the yard!? END GAME');
    }
}


/*To set the height and width of the field.
Using static and for loop to write the condition the field height and width
Actually I want to set it to random but it stucking with some issue. */
static generateField(height, width) {
    const fieldPoss = [hat, hole, fieldCharacter];
    let fieldArray = [];
   
    for (let i = 0; i < height; i++) {
        let temp = [];
        //Field
        for (let j = 0; j < width; j++) {
            let randIndex = Math.floor(Math.random()* fieldPoss.length);
            // let randHole = Math.floor(Math.random()* 10);
            // let randHat = Math.floor(Math.random()* 1);
            let chosenChar = fieldPoss[randIndex];

            if(fieldArray.some(arr => arr.includes(hat)) || temp.some(ar => ar.includes(hat))) {
                randIndex = Math.floor(Math.random()*fieldPoss.length - 1);
                chosenChar = fieldPoss[randIndex + 1];
                //console.log('hat exists');
            }

            if(i === 0 && i === j) {
                temp.push(pathCharacter);
            }else{
                temp.push(chosenChar);
            }
        }
        fieldArray.push(temp);
    }
     //add hat if it doesnt exist
     if(!fieldArray.some(arr => arr.includes(hat))  ){
        //console.log(`${hat} not exists, adding now... `);
        randrow = Math.floor(Math.random()*(height - 1)) + 1; // No zero
        randrow = Math.floor(Math.random()*(width - 1)) + 1;
        fieldArray[random][randcol] = hat;
    }
    return fieldArray;
  }
}
  const myField = new Field(Field.generateField(19, 30));



/* 
To declear the method for playing game.
Using function + while loop to make conditions after recive the player input.
input 'l' when the user want a hamster move left.
input 'r' when the user want a hamster move right.
input 'u' when the user want a hamster move up.
input 'd' when the user want a hamster move down.
If not all above, it will return 'You are not a hamster! We caught a spy cat! Closing Game...'.
*/
  function playGame() {
    while(validInput === 1) {
    //print current field
    myField.print()
    //get user input 
    let userInput = prompt('Smell Cheesy?? Which direction? : ')
    //process userInput
    if(userInput === 'l') {
        clear(columnIndex -= 1);
    }else if(userInput === 'r') {
        clear(columnIndex += 1);
    }else if(userInput === 'u') {
        clear(rowIndex -= 1);
    }else if(userInput === 'd') {
        clear(rowIndex += 1);
    }else{
      console.log(`
      You are not a hamster! 
      We caught a spy cat! 
      Closing Game...`);
      break;
    }
 //validate user Input
   validInput = myField.validateInput(rowIndex, columnIndex);
   }
}

  playGame();
