import { Chessboard, ROOK, BOARD_SIZE } from './util';

/**
 * Solves the N-Rooks problem for some input board with rooks already placed
 * The N-Rooks problem can be easily solved by recognizing one key property
 * of the problem:
 *
 * No rook can occupy the same row or column as another rook. This is a pretty
 * intuitive property but it allows us to solve the problem elegantly.
 *
 * First: iterate through the board and generate a set of rows and columns that
 * do not have a rook anywhere in them.
 *
 * Second: Now that we have a sets of free rows and columns we can mix and
 * match elements from them in any way and get a correct answer. To be
 * consistent, I'm going the match the n'th free row with the n'th free column,
 * As opposed to matching them randomly. This will increase testability
 *
 * @param board The board configuration that we will solve for
 * @returns The modified board configuration after placing the remaining rooks
 */
export function solveBoard(board: Chessboard) {
	const filledRows = new Set<number>();
	const filledCols = new Set<number>();

	// Finds all the rows and columns where a rook cannot be placed
	board.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (cell === ROOK) {
				filledRows.add(rowIndex);
				filledCols.add(colIndex);
			}
		});
	});

	// Crafts an array [1, 2, ..., n] which will be used for set subtraction
	const allPossible = [...Array(BOARD_SIZE)].map((_, i) => i);

	// Subtracts the filled from the whole set to get the free rows and cols
	const freeRows = allPossible.filter((num) => !filledRows.has(num));
	const freeCols = allPossible.filter((num) => !filledCols.has(num));

	// Places rooks on the available cells
	for (let i = 0; i < freeRows.length; i++) {
		board[freeRows[i]][freeCols[i]] = ROOK;
	}

	return board;
}
