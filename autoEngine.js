// To start off
// link 'autoEngine.js' through your html file, make sure it is the first script that loads!!
// there will be instructions on how to use it next to whatever interest you.
// 
// you can also browse around this file to see its capabilities!
// hope this helps.


// to view engine version, type 'EngineVersion()' in the console.























// classes
class Player {
    constructor(x, y, vy, vxl, vxr, w, h, s, j, f, g, c, i) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.vxl = vxl;
        this.vxr = vxr;
        this.w = w;
        this.h = h;
        this.speed = s;
        this.jumpSpeed = j;
        this.mass = f;
        this.g = g;
        this.c = c;
        this.img = i;
    }
}
let player = new Player(100, 100, 0, 0, 0, 50, 50, 5, 15, 0.2, false, "black", false)


class CalcDistanceX {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let pointA = new CalcDistanceX(0, 0)
let pointB = new CalcDistanceX(0, 0)


class CanvasBorder {
    constructor(w, c) {
        this.width = w
        this.colour = c
    }
}
let border = new CanvasBorder(3, 'black')


class Engine {
    constructor(p, g, b, bc, ox, oy, o, rc, c, is, tb, tt, tl, tr, bw, bbc, i) {
        this.playerMovement = p;
        this.gravity = g;
        this.borderWalls = b;
        this.borderCollision = bc;
        this.hideOverflowX = ox;
        this.hideOverflowY = oy;
        this.hideOverflow = o;
        this.removeCanvas = rc;
        this.collision = c;
        this.imgID = is;
        this.tuneBottom = tb;
        this.tuneTop = tt;
        this.tuneLeft = tl;
        this.tuneRight = tr;
        this.borderWidth = bw;
        this.borderColor = bbc;
        this.i = i;
    }
}
let engine = new Engine(false, false, false, false, false, false, false, false, false, '', 0, 0, 0, 0, 2, 'black', 0)

// end of classes

// auto create canvas with 'canvas' as tag
// if not using canvas, removeCanvas = true
canv = document.createElement('canvas')
canv.id = 'canvas'
document.body.appendChild(canv)



const cl = console.log; // log text in the console
const ce = console.error // log an error
const cw = console.warn // log a warning
const ct = console.trace // trace something
const listen = addEventListener; // listen for an event
const canvas = document.getElementById('canvas'); // for ctx
const ctx = canvas.getContext('2d'); // for ctx
let bgc = 'white'; // change document background colour
const timeout = setTimeout; // create a timeout for an amount of time
const height = window.innerHeight; // the height of the document
const width = window.innerWidth; // the width of the document
const interval = setInterval; // create an interval
const doc = document;
function random(max, min) {
    rand = Math.floor(Math.random() * (max - min + 1)) + min
    return(rand)
}
// generate random number and control the maximum and minimum by typing 'random(1 // min, 10 // max)'
// if you individually hide each bar, then you will have to reverse both variable values to show scroll bars.
const anim = requestAnimationFrame;
let mouseX = 0; // Access the mouseX position
let mouseY = 0; // Access the mouseY position
let title = document.title; // change variable value to change document title
let calcDist = false; // to calculate the DistanceX between point A and B, you must first set 'calcDist = true'-
// then, set 'pointAx.x' to point A 'X', and 'pointBx.x' to point B 'X'.
// then use 'DistanceX' (variable) to see the DistanceX between point A and point B.
//to calculate the DistanceY between point A and B, set 'pointAy.y' to your point A 'Y', then-
// 'pointBy.y' to your point B 'Y'.
// then use 'DistanceY' (variable) to see the DistanceY between point A and point B.
// e.g:
// pointA.x = 20;
// pointB.x = 100; 
// calcDist = true;
// output would be 80px apart from each other on the X Axis

// e.g.
// pointA.y = 50;
// pointB.y = 200;
// calcDist = true;
// calcDist = true;
// output would be 150px apart from each other on the Y Axis







// private variables (not to be changed or used) 
let DistanceX;
let DistanceY;
engine.playerMovement = true;
// end

function borderCol() {
    if (player.x <= canvas.width - canvas.width + engine.tuneLeft) {
        player.x = canvas.width - canvas.width + engine.tuneLeft;
    }
    if (player.x + player.w >= canvas.width - engine.tuneRight) {
        player.x = canvas.width - player.w - 1 - engine.tuneRight;
    }
    if (player.y <= canvas.height - canvas.height + engine.tuneTop) {
        player.y = canvas.height - canvas.height + engine.tuneTop;
    }
    if (player.y + player.h >= canvas.height - engine.tuneBottom) {
        player.y = canvas.height - player.h - engine.tuneBottom;
        player.vy = 0;
        player.g = true;
    }
}

// how to use:
// 1) create function inside your main.js.
// 2) type 'requestAnimationFrame('Name of function')', or 'anim('Name of function')'.
// 3) then type 'AllowPlayerMovement()' inside that function.
// 4) Lastly, remember to call your function!
// ============
// How to customize character:
// to resize the width and height, simply change the value (in your main.js) of player.w (player width) and/or player.h (player height).
// Default is 50 x 50;
// ============
// player movement
function AllowPlayerMovement() {
    if (engine.playerMovement) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.x += player.vxl
        player.x += player.vxr
        player.y += player.vy
        if (engine.borderCollision) {
            borderCol()
        }
        if (engine.collision) {
            collision()
        }
        ctx.fillStyle = player.c
        ctx.fillRect(player.x, player.y, player.w, player.h)
    }
    anim(AllowPlayerMovement)
}
function AllowImgMovement() {
    if (engine.playerMovement) {
        player.x += player.vxl
        player.x += player.vxr
        player.y += player.vy
        if (engine.borderCollision) {
            borderCol()
        }
        if (engine.collision) {
            collision()
        }
        if (engine.imgID != ''){
        doc.getElementById(engine.imgID).style.left = player.x + 'px'
        doc.getElementById(engine.imgID).style.top = player.y + 'px'
    anim(AllowImgMovement)
        }else{
            ce("Please provide an ID for your player")
        }
    }
}
listen("keydown", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity == false) {
            if (e.code == 'KeyW') player.vy = -player.speed;
            if (e.code == 'KeyS') player.vy = player.speed;
            if (e.code == 'KeyD') player.vxr = player.speed;
            if (e.code == 'KeyA') player.vxl = -player.speed;
        }
    }
})
listen("keydown", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity) {
            if (player.g) {
                if (e.code == 'KeyW') player.vy = -player.jumpSpeed, player.g = false;
            }
            if (e.code == 'KeyD') player.vxr = player.speed;
            if (e.code == 'KeyA') player.vxl = -player.speed;
        }
    }
})
listen("keyup", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity == false) {
            if (e.code == 'KeyW') player.vy = 0;
            if (e.code == 'KeyS') player.vy = 0;
            if (e.code == 'KeyD') player.vxr = 0;
            if (e.code == 'KeyA') player.vxl = 0;
        }
    }
})
listen("keyup", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity) {
            if (e.code == 'KeyD') player.vxr = 0;
            if (e.code == 'KeyA') player.vxl = 0;
        }
    }
})
// end of charactor movement
listen("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
})
setInterval(function MainEngineInterval() {
    if (engine.hideOverflow) {
        document.body.style.overflow = 'hidden';
    }
    if (engine.hideOverflow == false) {
        document.body.style.overflow = '';
    }
    if (engine.hideOverflowX) {
        document.body.style.overflowX = 'hidden'
    }
    if (engine.hideOverflowX == false && document.body.style.overflow == false) {
        document.body.style.overflowX = ''
    }
    if (engine.hideOverflowY) {
        document.body.style.overflowY = 'hidden'
    }
    if (engine.hideOverflowY == false && document.body.style.overflow == false) {
        document.body.style.overflowY = ''
    }
    document.title = title
    if (engine.removeCanvas) {
        canvas.remove()
        engine.removeCanvas = false;
    }
    if (calcDist) {
        calcDist = false;
        DistanceX = pointB.x - pointA.x
        DistanceY = pointB.y - pointA.y
        if (DistanceX < -1) {
            DistanceX = pointA.x - pointB.x
        }
        if (DistanceY < -1) {
            DistanceY = pointA.y - pointA.y
        }
        cl("DistanceX From 'pointA.x' (" + pointA.x + ")" + " to 'pointBx.x' (" + pointB.x + ") is: " + DistanceX + "px")
        cl("===========")
        cl("DistanceY From 'pointA.y' (" + pointA.y + ")" + " to 'pointB.y' (" + pointB.y + ") is: " + DistanceY + "px")
    }
    doc.body.style.backgroundColor = bgc
    if (engine.borderWalls) {
        canvas.style.border = engine.borderWidth + 'px solid ' + engine.borderColor
    }
    if (engine.gravity) {
        if (player.g == false) {
            player.vy += player.mass
        }
    }
})
function distanceX(x1, x2) {
    x2 = x2 - x1;
    return(x2)
}
function distanceY(y1, y2) {
    y2 = y2 - y1;
    return(y2)
}
function EngineVersion() {
    cl('The current Engine version that you have installed is:')
    cl('Version 2.3.1')
}
let tag;
function createElement(Element, ID, text){
    tag = document.createElement(Element);
    if (text != undefined) tag.innerHTML = text;
    tag.id = ID;
    document.body.appendChild(tag);
    document.getElementById(ID).style = "position:absolute;";
    document.getElementById(ID).style.left = "0px";
    document.getElementById(ID).style.top = "0px";
}

function cloneElement(ID) {
    engine.i++;
    let elem = document.querySelector("#" + ID);
    let clone = elem.cloneNode(true);
    clone.id = ID + engine.i;
    elem.after(clone);
}
function removeElement(ID){
    doc.getElementById(ID).remove()
}
canvas.width = width - 30;
canvas.height = height - 30;
cl("autoEngine.js Loaded Succesfully");
cl("Built by using autoEngine.js");