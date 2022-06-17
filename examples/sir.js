const G = 10;

let time = 0;

let r = 0.58;
let a = 0.25
let cmr = 0.0028;

let S = 700000; 
let I = 50; 
let R = 0;

let population = S + I;


let pI;
function Reset(){
    S = 700000; 
    I = 50; 
    R = 0;

    ResetPlot();
}

function Update(dT){
    let dS =-r * I * S / population;
    let dR = a * I;

    S += dS * dT;
    I += (-dS - dR) * dT;
    R += dR * dT;

    if (time > 1) {
      ExtendPlot();
      time--;
    }
    time += dT;
}

let sEle = document.getElementById("susceptible");
let iEle = document.getElementById("infected");
let rEle = document.getElementById("resistant");
let dEle = document.getElementById("dead");

function Draw(){
    let d = R * cmr;
    let r = R - d;

    sEle.innerHTML = Math.floor(S);
    iEle.innerHTML = Math.floor(I);
    rEle.innerHTML = Math.floor(r);
    dEle.innerHTML = Math.floor(d);
}

function ExtendPlot(){
    if (paused) return;

    Plotly.extendTraces('chart', {
        y: [[S], [I], [R]]
      }, [0, 1, 2])
}

function ResetPlot(){
    let p = Math.max((60*vh) / (100*vw), 0.5);
    console.log(p);

    Plotly.newPlot('chart', [{
        y: [S, S],
        mode: 'lines',
        line: {color: '#5C90AC'},
        name: "Susceptible"
      },{
        y: [I, I],
        mode: 'lines',
        line: {color: '#D16262'},
        name: "Infected"
        
      },{
        y: [R, R],
        mode: 'lines',
        line: {color: '#72906B'},
        name: "Removed"
        
      }], {
        width: 700,
        height: 700 * p
      }, {
        staticPlot: true
    });

    ScaleChart();
}


window.addEventListener("resize", ScaleChart);

function ScaleChart(){
    let bounds = document.querySelector(".main-svg").getBBox();

    let pW = bounds.width;
    let pH = bounds.height;
    
    let scale = Math.min(50 * vh/pH, 88 * vw/pW);

    document.getElementById("chart").style.transform = 
    `scale(${scale})`;
}