const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


let gameOn = true

class Field{
    constructor(height, width, percentage){
       this._maze = Field.generateField(height,width,percentage)
       this.x = 0;
       this.y = 0;
    }

    draw(){
        console.clear()
        console.log("To Move Around use W A S D")
        this._maze.forEach((element)=> {
        
            console.log(...element)
        })
    }

    move_character(direction){
       
           
        switch(direction){
            case 'd':
                this.y += 1
                this.checkField(this.x,this.y)
                this._maze[this.x][this.y] = "*"
                break;
            case 'a':
                this.y -= 1
                this.checkField(this.x, this.y)
                this._maze[this.x][this.y] = "*"
                break;
            case 's':
                this.x += 1
                this.checkField(this.x, this.y)
                this._maze[this.x][this.y]= "*"
                break;
            case 'w':
                this.x -= 1
                this.checkField(this.x, this.y)
                this._maze[this.x][this.y] = "*"
                break
            default:
                console.log("Invalid move WASD only")
         
        }
    }

    checkField(ycord, xcord){
       console.log(`[${xcord}],[${ycord}]`)
        
        if(ycord < 0 || ycord === this._maze.length -1){
            try{
                throw Error("You Fell out of the table x")
            }catch(e){
                console.log(e.message)
                gameOn = false
            
            }
        
        }else if(ycord < 0 || ycord >= this._maze[xcord].length){
            try{
                throw Error("You Fell out of the table")
            }catch(e){
                console.log(e.message)
                gameOn = false
            }
        }
        if(this._maze[xcord][ycord] === hat){
            console.log("Congrulation you found the hat")
            gameOn = false;
        }else if (this._maze[xcord][ycord] === hole){
            try{
            throw Error('You Fell into the hole!')
            }catch(e){
                console.log(e.message)
                gameOn = false
            }
        }
    }

    static generateField(height, width, percentage){
        let field = new Array(height)
        for (let i = 0; i < field.length; i++){
            field[i] = new Array(width).fill(fieldCharacter)
        }
       
        //Location OF player Characer
        field[0][0] = pathCharacter
        //Random Location for the hat
        let hat_x = Math.floor(Math.random() * height)+1
        let hat_y = Math.floor(Math.random() * width)+1
        field[hat_x][hat_y] = hat
        

        //Add some holes based on percentage
        let number_of_holes = (height * width) * (percentage/100)
        console.log(number_of_holes) 
        for(; number_of_holes>= 0 ;){
            let holeX = Math.floor(Math.random() * height)
            let holeY = Math.floor(Math.random()* width)
            if(field[holeX][holeY] === hat || field[holeX][holeY] === pathCharacter){
                continue
            }
            field[holeX][holeY] = hole
            number_of_holes--
        }
        
      return field;
    }
}

// const myField = new Field([
//     ['*', '░', 'O','░', '░', 'O'],
//     ['░', 'O', '░','░', 'O', '░'],
//     ['░', '^', '░','░', '░', '░'],
//     ['░', '░', '░','░', '░', '░'],
//     ]);

let myField = new Field(5,10,10)
// myField.draw()

while(gameOn){
    myField.draw()
    let movement = prompt('What is your move ?')
    myField.move_character(movement)
}
