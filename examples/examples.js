let fixed_dT = 1000/30;
let paused = true;

function ToggleSim(){
    if (!paused) {
        document.querySelector(".cover").style.visibility = "visible"; 
        document.querySelector(".reset").style.visibility = "hidden";
        paused = true;
    }
    else {
        document.querySelector(".cover").style.visibility = "hidden"; 
        document.querySelector(".reset").style.visibility = "visible";
        StartSim();
    };
}
function StartSim(){
    lastFrame = Date.now();
    paused = false;
    CallUpdate();
}

let lastFrame;
function CallUpdate(){
    if (paused) return;
    let ddT = fixed_dT - (Date.now() - lastFrame);
    lastFrame = Date.now();

    Update(fixed_dT / 1000);
    Draw();

    setTimeout(CallUpdate, ddT);
}

let vw;
let vh;
let vmin;
let vmax;

window.addEventListener("resize", UpdateScale);

function UpdateScale(){
    vw = innerWidth / 100;
    vh = innerHeight / 100;

    if (vw > vh){
        vmax = vw;
        vmin = vh;
    }
    else{
        vmax = vh;
        vmin = vw;
    }
}
UpdateScale();

document.querySelector(".con").addEventListener("mousedown", ToggleSim);