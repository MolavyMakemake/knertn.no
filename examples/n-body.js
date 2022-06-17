const G = 3;
let entities = [];
let id = 0;
let graphics = document.querySelector(".graphics");
let tI;

let solar_mass = 100;

const startValues = 
[
    [1.5, -40, 40,  0.6, 1],
    [1, 0, -40, -2, -1],
    [2.5, 45, 0,  0, 2.5]
]

function Reset(){
    let n = startValues.length;
    entities = Array(n);
    id = 0;
    let con = "<circle cx='50vw' cy='50vh' r='3vmin' fill='yellow' />";
    for (let i = 0; i < n; i++){
        let s = startValues[i];
        entities[i] = new Entity(s[0], s[1], s[2], s[3], s[4]);   
        con += `<circle cx='0' cy='0' r='${entities[i].r}vmin' fill='red' id='${entities[i].id}'/>`
    }
    graphics.innerHTML = con;

    Draw();
    if (paused){
        paused = false; 
        UpdateTrail();
        paused = true;
    }
    else UpdateTrail();

    tI = setInterval(UpdateTrail, 250);
}

class Entity{
    constructor(r, x, y, vX, vY){
        this.r = r;
        this.m = Math.PI * r*r;
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;

        this.trail = [];

        this.id = "a" + id++;
    }

    Force(e){
        if (e == this) return [0, 0];

        let dX = e.x - this.x;
        let dY = e.y - this.y;
        let sqr_d = dX*dX + dY*dY;

        let F = G * this.m * e.m / sqr_d;
        let d = Math.sqrt(sqr_d);

        return [F * dX / d, F * dY / d];
    }

    Draw(){
        document.getElementById(this.id).setAttribute("cx", 50*vw + this.x*vmin);
        document.getElementById(this.id).setAttribute("cy", 50*vh - this.y*vmin);
    }

    Clone(){
        return new Entity(this.r, this.x, this.y, this.vX, this.vY);
    }
}

const c1 =  0.6756036;
const c2 = -0.1756036;
const d1 =  1.3512072;
const d2 = -1.7024144;


function Update(dT, system = entities){
    Step(system, c1, d1, dT);
    Step(system, c2, d2, dT);
    Step(system, c2, d1, dT);

    for (let i = 0; i < system.length; i ++){
        system[i].x += c1 * system[i].vX * dT;
        system[i].y += c1 * system[i].vY * dT;
    }
}

function Draw(){
    entities.forEach(e => e.Draw());
}

function Step(system, c, d, dT)
{
    let a = AccelerationMap(system);
    
    for (let i = 0; i < system.length; i++)
    {
        let e = system[i];

        e.x += c * e.vX * dT;
        e.y += c * e.vY * dT;
        e.vX += d * a[ 2*i ] * dT;
        e.vY += d * a[2*i+1] * dT;
    }
}

function AccelerationMap(system)
{
    let a = new Array(system.length * 2).fill(0);
    

    for (let i = 0; i < system.length; i++)
    {
        let A = system[i];

        // Acceleration towards sun
        let sqr_d = A.x*A.x + A.y*A.y;
        let d = Math.sqrt(sqr_d);

        a[ 2*i ] -= G * solar_mass / sqr_d * A.x / d;
        a[2*i+1] -= G * solar_mass / sqr_d * A.y / d;

        for (let j = i + 1; j < system.length; j++)
        {
            let B = system[j];
            
            // Check force between each body
            let F = A.Force(B);

            a[ 2*i ] += F[0] / A.m;
            a[2*i+1] += F[1] / A.m;

            a[ 2*j ] -= F[0] / B.m;
            a[2*j+1] -= F[1] / B.m;
        }
    }

    return a;
}


let len_trail = 100;

function UpdateTrail(){
    if (paused) return;


    document.querySelectorAll("polyline").forEach(e => e.remove());

    let con = "";
    for (let i = 0; i < entities.length; i++){
        let e = entities[i];

        let p = `${50*vw + e.x*vmin},${50*vh - e.y*vmin}`;
        e.trail.push(p);

        if (e.trail.length >= len_trail) e.trail.shift();
            
        con += `<polyline points="${e.trail.join(" ")}"/>`;
    }


    graphics.innerHTML = con + graphics.innerHTML;
}