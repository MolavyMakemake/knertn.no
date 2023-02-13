var grabbed_piece = null;


function grab_piece(e) {
    if (e.button != 0)
        return;

    i = mousepos_i(e);

    if (arr[i] == piece_t.none)
        return;

    con = `<div id="grabbed_piece" class="chesspiece" style="background-image: url(${img_src(arr[i])});"></div>`
    document.querySelector(".chessboard-wrapper").innerHTML += con;


    let moves_arr = legal_moves(i);
    hightlight_moves(moves_arr);

    grabbed_piece = {
        index: i,
        moves: moves_arr
    };

    move_piece(e);
}


function release_piece(e) {
    if (grabbed_piece == null) {
        console.log(e.button);
        if (e.button == 2)
            highlight_square(e);
        return;
    }

    x = mousepos_i(e);

    i = grabbed_piece.index;
    moves_arr = grabbed_piece.moves;

    if (e.button == 0 && moves_arr.includes(x)) {
        arr[x] = arr[i];
        arr[i] = piece_t.none;

        ele = document.getElementById('p' + i);
        pos = array_v(x);
        ele.style.left = pos[0] * 12.5 + "%";
        ele.style.bottom = pos[1] * 12.5 + "%";

        capture = document.getElementById('p' + x);
        if (capture != null)
            capture.remove();

        ele.setAttribute("id", 'p' + x);
    }

    clear_hand();
}

function clear_hand() {
    document.getElementById("grabbed_piece").remove();
    document.querySelectorAll(".highlight").forEach(ele => ele.remove());
    
    grabbed_piece = null;
}


function move_piece(e) {

    if (grabbed_piece == null)
        return;

    let ele = document.getElementById("grabbed_piece");

    ele.style.left = e.offsetX + "px";
    ele.style.top = e.offsetY + "px";
}


document.querySelector(".chessboard-wrapper").addEventListener("mousedown", grab_piece);
document.querySelector(".chessboard-wrapper").addEventListener("mouseup", release_piece);
document.querySelector(".chessboard-wrapper").addEventListener("mousemove", move_piece);

document.querySelector(".chessboard-wrapper").addEventListener("mouseleave", (e) => {
    if (grabbed_piece != null) 
        clear_hand();
});
