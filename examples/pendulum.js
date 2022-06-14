const G = 10;
let angleA = 100;
let angleB = 25;
let n = 75;
let d = 0.1;
let pendulums = [];
let id = 0;

function Reset(){
    pendulums = Array(n);
    id = 0;
    let con = "";
    for (let i = 0; i < n; i++){
        pendulums[i] = new Pendulum((angleA + i * d / n - d / 2) * deg, (angleA + angleB) * deg);   
        con += "<polyline fill='none' id='"+pendulums[i].id+"'/>"
    }
    document.getElementById("graphics").innerHTML = con;
    for (let i = 0; i < n; i++){
        document.getElementById(pendulums[i].id).style.stroke = `hsl(${360 * i / n}, 100%, 50%)`;
    }
    UpdateGraphics();
}

let sim;
function ToggleSim(){
    if (sim) {
        document.getElementById("cover").style.visibility = "visible"; 
        sim = clearInterval(sim);
    }
    else {
        document.getElementById("cover").style.visibility = "hidden"; 
        StartSim();
    };
}
function StartSim(){
    let lastFrame = Date.now();
    let dT;

    sim = setInterval(function(){
        dT = (Date.now() - lastFrame) / 1000;
        lastFrame = Date.now();
        pendulums.forEach(p => {
            p.Update(dT);
            p.Draw();
        });
    }, 0);
}

class Pendulum{
    constructor(a, b){
        this.a = a;
        this.b = b;
        this.id = "a" + id++;
        this.vA = 0;
        this.vB = 0;
    }
    Update(dT){
        let divisor = 3 - Math.cos(2 * (this.a - this.b));
        let vAsqr = this.vA * this.vA;
        let vBsqr = this.vB * this.vB;
        let sinD = Math.sin(this.a - this.b);
        let cosD = Math.cos(this.a - this.b);

        this.vA += dT * (-3 * G * Math.sin(this.a) - G * Math.sin(this.a - 2 * this.b) - 2 * sinD * (vBsqr + vAsqr * cosD)) / divisor;
        this.vB += dT * (2 * sinD * (vAsqr * 2 + G * 2 * Math.cos(this.a) + vBsqr * cosD)) / divisor;

        this.a += this.vA * dT;
        this.b += this.vB * dT;
    }
    Draw(){
        let x1 = rVH * (2 + Math.sin(this.a));
        let y1 = rVH * (2 + Math.cos(this.a));
        let x2 = x1 + Math.sin(this.b) * rVH;
        let y2 = y1 + Math.cos(this.b) * rVH;
        document.getElementById(this.id).setAttribute("points", `${2 * rVH},${2 * rVH} ${x1},${y1} ${x2},${y2}`);
    }
}


const r = 20;
const deg = 0.01745;
let vh = innerHeight < innerWidth ? innerHeight / 100 : innerWidth / 100;
let rVH = r * vh;

function UpdateGraphics(){
    let ele = document.getElementById("graphics");
    ele.style.width = 4 * r + "vh";
    ele.style.height = 4 * r + "vh";
    pendulums.forEach(p => {
        p.Draw();
    });

}
Reset();

window.onresize = function(){
    vh = innerHeight / 100;
    rVH = r * vh;
    UpdateGraphics();
};

document.getElementById("con").addEventListener("mousedown", ToggleSim);