function img_src(piece) {

    src = (piece & color_bm) == piece_t.white ? 'w' : 'b';
    src += ['p', 'n', 'b', 'r', 'q', 'k'][(piece & piece_bm) - 1];

    return `./chess/images/${src}.svg`;
}


function load_fen(fen) {

    let i = 0, j = 7;
    let con = "";

    const inv_piece_t = {
        'p' : piece_t.pawn,
        'n' : piece_t.knight,
        'b' : piece_t.bishop,
        'r' : piece_t.rook,
        'q' : piece_t.queen,
        'k' : piece_t.king
    };

    x = 0
    while (true) {

        c = fen[x++];
        if (c == ' ')
            break;

        let I = parseInt(c);
        if (!isNaN(I))
            i += I;

        else
            switch (c) {
                case '/':
                    i = 0;
                    j--;
                    break;

                default:
                    src = c.toLowerCase();
                    piece_color = c == src ? piece_t.black : piece_t.white;
                    arr[i + 8 * j] = piece_color | (inv_piece_t[src]);

                    con += `<div id="p${i + 8 * j}" class="chesspiece" style="background-image: url(${img_src(arr[i + 8 * j])}); left: ${i * 12.5}%; bottom: ${j * 12.5}%;"></div>`

                    i++;
                    break;
            }
    }

    document.querySelector(".chessboard").innerHTML = con;
}

function replaceCharAt(str, i, char) {
    return str.substring(0, i) + char + str.substring(i + 1);
}

function initialize_game() {
    let start_pos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    rnd = Math.random();
    if (rnd < 0.025) // black king is gay
        start_pos = replaceCharAt(start_pos, 3, 'k');   
    else if (rnd < 0.050) // black queen is gay
        start_pos = replaceCharAt(start_pos, 4, 'q');

    rnd = Math.random();
    if (rnd < 0.025) // white king is gay
        start_pos = replaceCharAt(start_pos, 38, 'K');
    else if (rnd < 0.050) // white queen is gay
        start_pos = replaceCharAt(start_pos, 39, 'Q');


    load_fen(start_pos);
}