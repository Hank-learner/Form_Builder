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

        bullets.push(this);
    }

    movebullet() {
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

}

class Rock {
    constructor() {
        this.radius = 25;


        this.y = this.radius + height / 8;
        if ((Math.random()) < 0.5)
            this.x = canvas.width - this.radius;
        else
            this.x = this.radius;
        this.vx = Math.random();
        this.vy = 0;
        rocks.push(this);

    }
    moverock() {
        context.beginPath();
        context.fillStyle = 'yellow';
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        // if (this.x < this.radius || this.x > canvas.width - this.radius) {
        //     this.vx = -this.vx;
        // }
        // this.x += this.vx;
        // if (this.y <= canvas.height / 8) {
        //     this.vy = 9.8;
        // }
        // else if (this.y >= 7 * canvas.height / 8 - this.radius) {
        //     this.vy = -9.8;
        // }
        this.vy = 9.8;
        this.y = this.vy;
    }
}




var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
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

var shootersize = minsize / 10;
var shooterposition = {
    x: columns * 7.3,
    y: rows * 12.6
};
var shooterspeed = 0;
var shootermaxSpeed = 4;

var moveleft = false;
var moveright = false;

let shooter = new Shooter();
var shootinginterval = 200;

var bullets = [];
var bulletradius = 5;
var bulletspeed = 5;
var bulletinterval = 10;

var rocks = [];
var rockinterval = 2000;
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


var shoot = setInterval(function () {
    bullet = new Bullet();
}, shootinginterval);
var rock = setInterval(function () {
    rock = new Rock();
}, rockinterval);
var drawinterval = setInterval(function () {
    background();
    for (i = 0; i < rocks.length; i++) {
        rocks[i].moverock();
    }

    for (i = 0; i < bullets.length; i++) {
        bullets[i].movebullet();
    }
}, bulletinterval);








function gameloop() {
    window.requestAnimationFrame(gameloop);




    // if (height == document.documentElement.clientHeight - 16 && width == document.documentElement.clientWidth - 16) { }
    // else {
    //     var testx = shooterposition.x / columns * 7.6;
    //     height = document.documentElement.clientHeight - 16;
    //     width = document.documentElement.clientWidth - 16;
    //     minsize = height < width ? height : width;
    //     canvas.height = minsize;
    //     canvas.width = minsize;
    //     columns = minsize / 16;
    //     rows = minsize / 16;
    //     shootersize = minsize / 10;
    //     shooterposition = {
    //         x: columns * 7.3,
    //         y: rows * 12.6
    //     };
    // }



    // background();



    shooter.draw();


}
window.requestAnimationFrame(gameloop);







