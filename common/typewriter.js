//const twCursor = "▁";
const twCursor = "|";

function typewrite(query){
    document.querySelectorAll(query).forEach(e => {
        let toWrite = [];
        for (let i = 0; i < e.children.length; i++){
            toWrite.push(e.children[i].innerHTML);
            e.children[i].innerHTML = "&#8203";
        }
        twAnimate(toWrite, e);
    })
}

function twAnimate(toWrite, e, i = 0){
    let c = e.children[i];

    let j = 0;
    let con = "";
    c.innerHTML = con + twCursor;

    let blink = true;
    let blink_interval = setInterval(() => {

        c.innerHTML = blink ? con : con + twCursor;
        blink = !blink;
        console.log("test")

    }, 250)

    
    setTimeout(() => {
        let type_interval = setInterval(() => {
            con += toWrite[i][j++];
            c.innerHTML = con + twCursor;
    
            blink = true;
    
            if (j >= toWrite[i].length){
                clearInterval(type_interval);
    
                let finished = i + 1 >= toWrite.length;

                if (!finished) setTimeout(() => twAnimate(toWrite, e, i + 1), 1400);
                setTimeout(() => {
                    console.log("clear");
                    clearInterval(blink_interval);
                    c.innerHTML = con;
                }, finished ? 3500 : 1400)
            }
        }, 80)
    }, i == 0 ? 1000 : 0)
}

/*
function twCursor(e){
    return `<div class='tw-cursor'></div>`;
}*/
