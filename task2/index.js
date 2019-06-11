


class Shooter {
    constructor() {
    }
    draw() {
        if (moveleft) shooterspeed = -shootermaxSpeed;
        else shooterspeed = 0;
        if (moveright) shooterspeed = shootermaxSpeed;

        shooterposition.x += shooterspeed;
        if (shooterposition.x < 0) shooterposition.x = 0;
        if (shooterposition.x + shootersize > canvas.width) shooterposition.x = canvas.width - shootersize;
        context.imageSmoothingEnabled = false;
        context.drawImage(shooterimg, shooterposition.x, shooterposition.y, shootersize, shootersize);

    }
}

function background() {
    context.imageSmoothingEnabled = false;
    for (let i = map.length - 1; i > -1; --i) {
        let value = map[i];
        let tilex = (i % tilesize) * columns;
        let tiley = Math.floor(i / tilesize) * rows;
        context.drawImage(tilesheet, value * tilesize, 0, tilesize - 1, tilesize - 1, tilex, tiley, columns + 1, rows + 1);

    }
}
class Bullet {
    constructor() {
        this.x = shooterposition.x + shootersize / 2;
        this.y = shooterposition.y;
        this.vy = bulletspeed;
        this.viscible = true;
        bullets.push(this);
    }

    movebullet() {
        if (this.viscible) {
            context.beginPath();
            context.fillStyle = "#6b6b6b";
            context.arc(this.x, this.y, bulletradius, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();
            this.y += -this.vy;
            if (this.y < 0) {
                bullets.splice(bullets.indexOf(this), 1);
            }
        }
        else {
            bullets.splice(bullets.indexOf(this), 1);
        }
    }
    bulletvisciblity() {
        this.viscible = false;
    }
    get bulletx() {
        return this.x;
    }
    get bullety() {
        return this.y;
    }
    get getviscibility() {
        return this.viscible;
    }

}

class Rock {
    constructor() {
        this.radius = Math.random() * 50;
        if (this.radius < 25)
            this.radius = 25;
        this.y = this.radius + height / 8;
        if ((Math.random()) < 0.5)
            this.x = canvas.width - this.radius;
        else
            this.x = this.radius;
        this.vx = Math.random();
        this.vy = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.bounce = 1;
        this.strength = Math.pow(2, Math.floor(Math.random() * 5));
        rocks.push(this);

    }
    moverock() {
        if (this.strength > 0) {
            context.beginPath();
            context.fillStyle = 'yellow';
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.closePath();
            context.fill();

            context.fillStyle = "black";
            context.font = "20px Arial";
            context.textAlign = "center";
            context.fillText(this.strength, this.x, this.y);


            if (this.x < this.radius || this.x > canvas.width - this.radius) {
                this.vx = -this.vx;
            }
            if (this.y >= ((7 * canvas.height / 8) - this.radius)) {
                this.y = ((7 * canvas.height / 8) - this.radius);
                this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            }
            this.gravitySpeed += this.gravity;
            this.x += this.vx;
            this.y += this.gravitySpeed;
        }
        else {
            rocks.splice(rocks.indexOf(this), 1);
        }
    }
    rockpower() {
        this.strength--;
    }
    get rockx() {
        return this.x;
    }
    get rocky() {
        return this.y;
    }
    get rockradius() {
        return this.radius;
    }
}


function bulletrockcollision() {
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].getviscibility) {
            for (let j = 0; j < rocks.length; j++) {
                if (bullets[i].bulletx > rocks[j].rockx - rocks[j].rockradius && bullets[i].bulletx < rocks[j].rockx + rocks[j].rockradius &&
                    bullets[i].bullety > rocks[j].rocky - rocks[j].rockradius && bullets[i].bullety < rocks[j].rocky + rocks[j].rockradius) {
                    bullets[i].bulletvisciblity();
                    rocks[j].rockpower();
                    score++;
                    gamescore();
                }
            }
        }
    }
}


function gameover() {
    for (let i = 0; i < rocks.length; i++) {
        if (shooterposition.x < rocks[i].rockx && shooterposition.x + shootersize > rocks[i].rockx &&
            shooterposition.y < rocks[i].rocky + rocks[i].rockradius) {

            if (localStorage.getItem("Highscore")) {
                var highscore = parseFloat(localStorage.getItem("Highscore"));

                if (highscore < score) {
                    localStorage.setItem("Highscore", score);
                }
            }
            else {
                localStorage.setItem("Highscore", score);
            }
            var message = "End of game";
            var newLine = "\r\n";
            message += newLine;
            message += "Your score : " + score;
            message += newLine;
            message += "Highscore : " + Highscore;
            window.alert(message);
            gamestate = false;
            rocks = [];
            bullets = [];
            shooterposition = {
                x: columns * 7.3,
                y: rows * 12.6
            };
            clearInterval(shoot);
            clearInterval(drawinterval);
            clearInterval(rock);
            clearInterval(shooterdraw);
            score = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.rect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgba(0,0,0,0.1)";
            context.fill();
            context.fillStyle = "white";
            context.font = "40px Verdana";
            context.fillText("press space to start ", canvas.width / 2, canvas.height / 2);


        }
    }
}

function gamescore() {
    context.fillStyle = "black";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 120, 40);
    if (Highscore < score)
        Highscore = score;
    context.fillText("Highscore : " + Highscore, 120, 70);
    context.font = "30px Verdana";

    context.fillStyle = "Purple";
    context.fillText("Ball Blast", 620, 60);
}


var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var gamestate = false;
var tilesheet = new Image();
tilesheet.src = "shoot.png";




shooterimg = document.getElementById("shooterimg");
var tilesize = 16;

var map = [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1,
    0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
    0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0,
    1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0,
    1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

var height = document.documentElement.clientHeight - 16;
var width = document.documentElement.clientWidth - 16;
var minsize = height < width ? height : width;
canvas.height = minsize;
canvas.width = minsize;
var columns = minsize / 16;
var rows = minsize / 16;

context.rect(0, 0, canvas.width, canvas.height);
context.fillStyle = "rgba(0,0,0,0.1)";
context.fill();
context.fillStyle = "white";
context.font = "40px Verdana";
context.fillText("press space to start ", canvas.width / 4, canvas.height / 2);

var shootersize = minsize / 10;
var shooterposition = {
    x: columns * 7.3,
    y: rows * 12.6
};
var timepershooter = 20;
var shootermaxSpeed = 4;

var moveleft = false;
var moveright = false;

let shooter = new Shooter();
var shooterspeed = 0;

var bullets = [];
var bulletradius = 5;
var bulletspeed = 10;
var setinterval = 10;
var timeperbullet = 100;
var rocks = [];
var rockinterval = 2000;

var score = 0;
var Highscore = 0;
if (localStorage.getItem("Highscore")) {
    Highscore = parseFloat(localStorage.getItem("Highscore"));
}
document.addEventListener("keydown", event => {
    switch (event.keyCode) {
        case 37:
        case 65:
            moveleft = true;
            break;
        case 39:
        case 68:
            moveright = true;
            break;
        case 32:
            if (gamestate == true) {
                gamestate = false;
                clearInterval(shoot);
                clearInterval(drawinterval);
                clearInterval(rock);
                clearInterval(shooterdraw);
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "rgba(0,0,0,0.1)";
                context.fill();
                context.fillStyle = "white";
                context.font = "40px Verdana";
                context.fillText("press space to resume ", canvas.width / 5, canvas.height / 2);
            }
            else if (gamestate == false) {
                gamestate = true;
                gameloop();
            }
            break;
        default: break;
    }
});
document.addEventListener("keyup", event => {
    switch (event.keyCode) {
        case 37:
        case 65:
            moveleft = false;
            break;
        case 39:
        case 68:
            moveright = false;
            break;
        default: break;
    }
});

var shoot, drawinterval, rock, shooterdraw;

function gameloop() {
    if (gamestate == true) {
        shoot = setInterval(function () {
            if (gamestate == true)
                bullet = new Bullet();
            else
                return;
        }, timeperbullet);
        rock = setInterval(function () {
            if (gamestate == true)
                rocke = new Rock();
            else
                return;
        }, rockinterval);
        drawinterval = setInterval(function () {
            if (gamestate == true) {
                background();
                for (i = 0; i < rocks.length; i++) {
                    rocks[i].moverock();
                }
                shooter.draw();
                for (i = 0; i < bullets.length; i++) {
                    bullets[i].movebullet();
                }


                bulletrockcollision();
                gamescore();
                gameover();
            }
            else
                return;
        }, setinterval);


        shooterdraw = setInterval(function () {
            if (gamestate == true)
                shooter.draw();
            else
                return;
        }, timepershooter);
    }
    else
        return;

}




// function sizeloop() {
//     window.requestAnimationFrame(sizeloop);




//     if (height == document.documentElement.clientHeight - 16 && width == document.documentElement.clientWidth - 16) { }
//     else {
//         var testx = shooterposition.x / columns * 7.6;
//         height = document.documentElement.clientHeight - 16;
//         width = document.documentElement.clientWidth - 16;
//         minsize = height < width ? height : width;
//         canvas.height = minsize;
//         canvas.width = minsize;
//         columns = minsize / 16;
//         rows = minsize / 16;
//         shootersize = minsize / 10;
//         shooterposition = {
//             x: columns * 7.3,
//             y: rows * 12.6
//         };
//     }







// }
// window.requestAnimationFrame(sizeloop);