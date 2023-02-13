function can_capture(color, other) {
    return (other != piece_t.none) && ((other & color_bm) != color);
}

function step_moves(i, color, steps, ignores) {
    let moves_arr = [];

    let pos = array_v(i);

    for (k = 0; k < steps.length; k++) {

        let step = steps[k];

        let d = step[0] + step[1] * 8;

        for (j = 1; j < 8; j++) {


            if ([pos[0] + step[0] * j, pos[1] + step[1] * j].some(x => x < 0 || x >= 8))
                break;


            let s = i + d * j;

            if (ignores.includes(arr[s] & piece_bm)) {
                moves_arr.push(s);
            }
            else {
                if (can_capture(color, arr[s]))
                    moves_arr.push(s);
            
                break;
            }
        }
    }

    return moves_arr;
}

function legal_moves(i) {

    let pos = array_v(i);

    let piece = arr[i] & piece_bm;
    let color = arr[i] & color_bm;

    let moves_arr = [];

    switch (piece) {
        case piece_t.none:
            break;

        case piece_t.pawn:

            let s = color ? 1 : -1;
            
            if (arr[i + s * 8] == piece_t.none) {
                moves_arr = [i + s * 8];

                let dbl_move = (i < 16 && color == piece_t.white) || (i >= 48 && color == piece_t.black);
                if (dbl_move && arr[i + s * 16] == piece_t.none)
                    moves_arr.push(i + s * 16);
            }

            if (can_capture(color, arr[i + s * 7]))
                moves_arr.push(i + s * 7);

            if (can_capture(color, arr[i + s * 9]))
                moves_arr.push(i + s * 9);

            break;

        case piece_t.knight:
            moves_arr = [i - 17, i - 15, i - 10,  i - 6, i + 6, i + 10, i + 15, i + 17];

            if (can_capture(color, arr[i - 9]))
                moves_arr.push(i - 9);

            if (can_capture(color, arr[i - 7]))
                moves_arr.push(i - 7);

            if (can_capture(color, arr[i + 9]))
                moves_arr.push(i + 9);

            if (can_capture(color, arr[i + 7]))
                moves_arr.push(i + 7);

            break;

        case piece_t.bishop:
            moves_arr = step_moves(i, color, [[1, 1], [1, -1], [-1, -1], [-1, 1]], [piece_t.none])
            break;

        case piece_t.rook:
            moves_arr = step_moves(i, color, [[1, 0], [0, -1], [-1, 0], [0, 1]], [piece_t.none, piece_t.bishop])
            break;

        case piece_t.queen:
            moves_arr = step_moves(i, color, [[1, 1], [1, -1], [-1, -1], [-1, 1], [1, 0], [0, -1], [-1, 0], [0, 1]], [piece_t.none])
            break;

        case piece_t.king:
            moves_arr = [i - 9, i - 8, i - 7, i - 1, i + 1, i + 7, i + 8, i + 9];
            break;
    }

    j = 0;
    while (j < moves_arr.length) {
        
        let x = moves_arr[j];

        other_piece = arr[x] & piece_bm;
        other_color = arr[x] & color_bm;

        let is_legal = x >= 0 && x < 64;
        
        let rook_bishop_rule = (piece == piece_t.rook) && (other_piece == piece_t.bishop);
        if ((other_piece != piece_t.none) && !rook_bishop_rule)
            is_legal &= color != other_color;

        if (is_legal)
            j++;

        else 
            moves_arr.splice(j, 1);
    }

    return moves_arr;
}