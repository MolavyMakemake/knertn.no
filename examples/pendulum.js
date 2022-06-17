const G = 5;
let entities = [];
let angleA = 100;
let angleB = 25;
let n = 75;
let d = 0.1;
let id = 0;

function Reset(){
    entities = Array(n);
    id = 0;
    let con = "";
    for (let i = 0; i < n; i++){
        entities[i] = new Entity((angleA + i * d / n - d / 2) * deg, (angleA + angleB) * deg);   
        con += "<polyline id='"+entities[i].id+"'/>"
    }
    document.querySelector(".graphics").innerHTML = con;
    for (let i = 0; i < n; i++){
        document.getElementById(entities[i].id).style.stroke = `hsl(${360 * i / n}, 100%, 50%)`;
    }
    Draw();
}

function Update(dT){
    entities.forEach(e => {
        e.Update(dT);
    });
}

function Draw(){
    entities.forEach(e => e.Draw());
}



class Entity{
    constructor(a, b, vA = 0, vB = 0){
        this.a = a;
        this.b = b;
        this.id = "a" + id++;
        this.vA = vA;
        this.vB = vB;
    }

    Update(dT){
        let k1 = this.acceleration();
        let k2 = this.Step(k1, dT / 2);
        let k3 = this.Step(k2, dT / 2);
        let k4 = this.Step(k3, dT);

        let aA = (k1[0] + 2*k2[0] + 2*k3[0] + k4[0]) / 6;
        let aB = (k1[1] + 2*k2[1] + 2*k3[1] + k4[1]) / 6;

        this.vA += aA * dT;
        this.vB += aB * dT;

        this.a += this.vA * dT;
        this.b += this.vB * dT;
    }

    Step(k, dT){

        return new Entity(this.a, this.b, this.vA + k[0] * dT, this.vB + k[1] * dT).acceleration();
    }

    acceleration(){
        let divisor = 3 - Math.cos(2 * (this.a - this.b));
        let sqr_vA = this.vA * this.vA;
        let sqr_vB = this.vB * this.vB;
        let sinD = Math.sin(this.a - this.b);
        let cosD = Math.cos(this.a - this.b);

        return [
            (-3 * G * Math.sin(this.a) - G * Math.sin(this.a - 2 * this.b) - 2 * sinD * (sqr_vB + sqr_vA * cosD)) / divisor,
            (2 * sinD * (sqr_vA * 2 + G * 2 * Math.cos(this.a) + sqr_vB * cosD)) / divisor
        ]
    }

    Draw(){
        let x1 = rVH * (2 + Math.sin(this.a));
        let y1 = rVH * (2 + Math.cos(this.a));
        let x2 = x1 + Math.sin(this.b) * rVH;
        let y2 = y1 + Math.cos(this.b) * rVH;
        document.getElementById(this.id).setAttribute("points", `${2 * rVH},${2 * rVH} ${x1},${y1} ${x2},${y2}`);
    }
}


const r = 25;
const deg = 0.01745;
let rVH = r * vh;

window.onresize = function(){
    rVH = r * vh;
};
