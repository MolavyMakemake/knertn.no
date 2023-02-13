// returns the index corresponding to mouse position
function mousepos_i(e) {
    i = Math.floor(8 * e.offsetX / e.srcElement.offsetWidth);
    i += 8 * Math.floor(8 - 8 * e.offsetY / e.srcElement.offsetHeight);

    return i;
}

// returns the vector corresponding to array index
function array_v(i) {
    return [i % 8, Math.floor(i / 8)];
}

function hightlight_moves(moves) {
    
    let con = "";
    
    moves.forEach(i => {

        pos = array_v(i);

        hightlight_type = arr[i] == piece_t.none ? "highlighted_move" : "highlighted_capture";
        con += `<div class="highlight ${hightlight_type}" style="left: ${pos[0] * 12.5}%; bottom: ${pos[1] * 12.5}%"></div>`
    });

    document.querySelector(".chessboard-wrapper").innerHTML += con;
}

function highlight_square(e) {

    i = Math.floor(8 * e.offsetX / e.srcElement.offsetWidth);
    j = Math.floor(8 - 8 * e.offsetY / e.srcElement.offsetHeight);
    
    let ele = document.getElementById("h" + i + j);
    if (ele)
        ele.remove();
    
    else {
        let con = `<div id="h${i}${j}" class="highlight highlighted_square" style="left: ${i * 12.5}%; bottom: ${j * 12.5}%;"></div>`
        document.querySelector(".chessboard-wrapper").innerHTML += con;
    }

    
}


document.querySelector(".chessboard-wrapper").addEventListener("contextmenu", (e) => {
    e.preventDefault();
});