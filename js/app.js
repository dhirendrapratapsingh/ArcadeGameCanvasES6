//global Variables
var collision_dist  = 50;
var score=0;
var lives=5;
let seconds= 0,ct=null,totalMinutes= 0,totalSeconds= 0,win=false,timer;
document.getElementById('livesleft').innerHTML = lives;
document.getElementById('playerScore').innerHTML = score;

ct= new Date().getTime() / 1000;
// Enemies our player must avoid
class Enemy
{
    constructor(x, y)
    {
        // Variables applied to each of our instances go here
        // The image/sprite for our enemies, this uses a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed  = Math.floor(Math.random()*(200-100)) + 100; //randomize speed to undetermined value
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt)
    {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for all computers
        if (this.x >= 505) // Canvas width is  505 ( engine.js line 27), hence when bug tries to cross canvas it is initiallize back to 0 position and random y
        {
        this.x = 0;
        }
        else (this.x < 550) //else update then position
        {
        this.x += this.speed * dt;
        }
        this.collision();
    }
    collision()
    {
        let disp_x = player.x - this.x;
        let disp_y = player.y - this.y;
        // if playe comes within collision range of any of enemy
        if ( disp_x >= -collision_dist && disp_x <= collision_dist && disp_y >= -collision_dist && disp_y <= collision_dist ) 
        {
            player.lives--;
            document.getElementById('livesleft').innerHTML = player.lives;

            if ( player.lives === 0 )    //a lives over hence 'GAME OVER' displayed using sweet alert
            {
            if(win===false)
            {
            swal({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    title: 'GAME OVER',
                    text: 'Your score is ' + player.score + ' \n Time Taken: '+ totalMinutes +' Minutes '+totalSeconds+' Seconds',
                    type: 'warning',
                    confirmButtonColor: '#82d8e7',
                    confirmButtonText: 'Play again!'
                    }).then(function()
                {
                    window.location.reload();
                    clearInterval(timer);
                })
                win=true;
                }

                allEnemies = [];
            }

            player.reset();  //Reset the player position after Collision
        } //end of collision

    }
    // Draw the enemy on the screen, required method for game
    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

} // end of enemy class

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player
{
    constructor()
    {
        this.sprite = 'images/char-boy.png';
        this.x = 200; // default initial position
        this.y = 340;
        this.lives = 5; //Initial lives
        this.score= 0;
    }

    // Is called every time the player position is updated
    update()
    {
        // If the player reaches the water
        if (this.y < 20)
        {
            this.score++;
            document.getElementById('playerScore').innerHTML = this.score;
            this.reset();
        }
        if(this.score===3)
        {
            if(win===false)
            {
            swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: 'Congratulations! You have Won!',
                text: 'With ' + this.score + ' score and  \n Time Taken: '+ totalMinutes +' Minutes -'+totalSeconds+' Seconds',
                type: 'success',
                confirmButtonColor: '#82d8e7',
                confirmButtonText: 'Play again!'
                }).then(function()
                {
                window.location.reload();
                clearInterval(timer);
                })
                win=true;
            }
        }
    }

    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(dir)
    {
    /* the positions are
    0 to 400 towards left in x axis
    0 to 400 towards bottom on y axis */
        if(dir == 'left' && this.x > 0) {
            this.x -= 50;
        }
        if(dir == 'right' && this.x < 400) {
            this.x += 50;
        }
        if(dir == 'up' && this.y > 3) {
            this.y -= 50;
        }
        if(dir == 'down' && this.y < 400) {
            this.y += 50;
        }
    }

    // Is called to reset the player to the starting point
    reset()
    {
        this.x = 200;
        this.y = 320;
    }

} // end of class player

const bug_ypos = [40,140,224,204,164,124,119,60];

var allEnemies = [];
for ( var i = 0 ; i < 8 ; i++ ) // creates 8 bugs at random positions on the screen
{
    allEnemies.push(new Enemy(0,bug_ypos[Math.floor(Math.random()*8)]));  // Place all enemy objects in an array called allEnemies
}

// Place the player object in a variable called player
var player = new Player();

document.addEventListener('keyup', function(e)
{
    var allowedKeys =
    {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

timer = setInterval(function() //to update the timer panel each second after first click
 {
   var ctime = ct || (new Date().getTime() / 1000);
   seconds= parseInt((new Date().getTime() / 1000)-ctime);
   totalSeconds= seconds%60;
   totalMinutes=parseInt(seconds / 60);
   document.getElementById('seconds').innerHTML=(totalSeconds);
   document.getElementById('minutes').innerHTML=(parseInt(totalMinutes));
 }, 1000);
