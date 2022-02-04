const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field{
    constructor(height, width, percentage){
       this._maze = this.initialMazeSetup(height,width)
       this.addHole(height,width,percentage)
       this.addHat(height,width)
       this.x = 0;
       this.y = 0;
       this.gameOn = true;
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
                this._maze[this.x][this.y] = pathCharacter
                break;
            case 'a':
                this.y -= 1
                this.checkField(this.x, this.y)
                this._maze[this.x][this.y] = pathCharacter
                break;
            case 's':
                this.x += 1
                if (this.checkField(this.x, this.y)){
                   this._maze[this.x][this.y]= pathCharacter
                }
                break;
            case 'w':
                this.x -= 1
                if(this.checkField(this.x, this.y)){
                    this._maze[this.x][this.y] = pathCharacter
                }
                break
            default:
                console.log("Invalid move WASD only")
         
        }
    }

    checkField(ycord, xcord){
       //console.log(`[${xcord}],[${ycord}]`)
       if(ycord < 0 || xcord < 0){
        try{
            throw Error("You fell OUT!!")
        }catch(e){
            console.log(e.message)
            this.gameOn = false
            return false
        }
       }
        
        if(ycord >= this._maze.length || xcord > this._maze[ycord].length - 1 ){
            try{
                throw Error("You Fell out of the table x")
            }catch(e){
                console.log(e.message)
                this.gameOn = false
                return false
            }
        }
        if(this._maze[ycord][xcord] === hat){
            console.log("Congrulation you found the hat")
            this.gameOn = false;
            return false
        }
        
        if (this._maze[ycord][xcord] === hole){
            try{
            throw Error('You Fell into the hole!')
            }catch(e){
                console.log(e.message)
                this.gameOn = false
            }
        }
        
       
        return true
        
    }

    initialMazeSetup(height, width){
        let field = new Array(height)
        for (let i = 0; i < field.length; i++){
            field[i] = new Array(width).fill(fieldCharacter)
        }
        
        //Location OF player Characer
        field[0][0] = pathCharacter
        console.log(field)
      return field;
    }

    addHat(height,width){
        //Random Location for the hat
        let hat_x = Math.floor(Math.random() * (height - 1)+ 1)
        let hat_y = Math.floor(Math.random() * (width - 1)+ 1)
                   
        
        
        this._maze[hat_x][hat_y] = hat
        
    }


    addHole(height, width, percentage){
        //Add some holes based on percentage
        let number_of_holes = (height * width) * (percentage/100)
       
        for(; number_of_holes>= 0 ;){
            let holeX = Math.floor(Math.random() * (height - 1)+ 1)
            let holeY = Math.floor(Math.random() * (width - 1)+ 1)
            if(this._maze[holeX][holeY] !== hat || this._maze[holeX][holeY] !== pathCharacter){
              this._maze[holeX][holeY] = hole
            }else {
                number_of_holes++
            }
            number_of_holes--
            
        }
    }
}

// const myField = new Field([
//     ['*', '░', 'O','░', '░', 'O'],
//     ['░', 'O', '░','░', 'O', '░'],
//     ['░', '^', '░','░', '░', '░'],
//     ['░', '░', '░','░', '░', '░'],
//     ]);

let myField = new Field(5,10,20)
// myField.draw()

while(myField.gameOn){
    myField.draw()
    let movement = prompt('What is your move ?')
    myField.move_character(movement)
}
