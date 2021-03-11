/**
 * Chessboard is an alias for a nested boolean array
 * If a cell is labeled true, then it has a rook on it.
 * If a cell is labeled false, then it is empty.
 */
export type Chessboard = boolean[][];

/**
 * ROOK is an alias for true, this is mainly to increase readability.
 */
export const ROOK = true;

/**
 * BOARD_SIZE is the size of the board, which is 8x8
 */
export const BOARD_SIZE = 8;

// The ASCII value for an uppercase A
// This is used for the conversion from ASCII to numeric
const A_ASCII = 65;

// UTF-8 characters used in the chessboard drawings
const UTF_ROOK = '\u265C';
const UTF_DOT = '\u00B7';

// A representation of an 8x8 chessboard with no pieces on it
export const EMPTY_BOARD: Chessboard = Array.from({ length: BOARD_SIZE }, () =>
	Array.from({ length: BOARD_SIZE }, () => !ROOK)
);

/**
 * Draws an ascii representation of a chessboard
 * @param board Board is an 8x8 boolean array. If a location is marked as true,
 * then it contains a rook
 */
export function drawChessBoard(board: Chessboard = EMPTY_BOARD) {
	// Draws the top boundary of the board
	console.log('     1 2 3 4 5 6 7 8  ');
	console.log('    ----------------- ');

	// Draws the content of the board, row by row
	for (let row = 0; row < BOARD_SIZE; row++) {
		// The rows are labelled A-E
		const rowLabel = String.fromCharCode(row + A_ASCII);
		let rowText = ' ';

		for (let col = 0; col < BOARD_SIZE; col++) {
			const content = board[row][col] === ROOK ? UTF_ROOK : UTF_DOT;
			rowText += content + ' ';
		}
		console.log(` ${rowLabel} |${rowText}|`);
	}

	// Draws the bottom boundary of the chess board
	console.log('    ----------------- ');
	console.log();
}

/**
 * Converts a location on a chess board to a 2 element array containing the
 * equivalent row and column number of that cell.
 *
 * For Example: A5 would be converted to [4, 0] which means row 4, column 0
 * @param cell A location on the chess board (ie. 'A5')
 * @returns The indexable equivalent of the input cell (ie. [4, 0])
 */
export function convertCell(cell: string) {
	return [cell.charCodeAt(0) - A_ASCII, +cell[1] - 1];
}

/**
 * Checks if a users input board is valid.
 * An invalid board is one where 2 or more rooks are threatening each other
 *
 * @param board The users input board
 * @throws Program will exit if the board is invalid
 */
export function validateBoard(board: Chessboard) {
	const filledRows = new Set<number>();
	const filledCols = new Set<number>();

	// Finds all the rows and columns where a rook cannot be placed
	for (let row = 0; row < BOARD_SIZE; row++) {
		for (let col = 0; col < BOARD_SIZE; col++) {
			const cell = board[row][col];
			if (cell === ROOK) {
				if (filledRows.has(row) || filledCols.has(col)) {
					console.error('\nInvalid Board Configuration\n');
					return false;
				}

				filledRows.add(row);
				filledCols.add(col);
			}
		}
	}

	return true;
}

/**
 * Validates that all of the users inputs are valid spaces on the chess board
 * An invalid board is one where 2 or more rooks are threatening each other
 *
 * @param cells An array of cell strings (ie. ['A1', 'B2'])
 * @throws Program will exit if the board is invalid
 */
export function validateInput(cells: string[]) {
	const cellRegex = /[A-H][1-8]/;

	for (let cell of cells) {
		if (!cellRegex.test(cell)) {
			console.error(`\n'${cell}' is an invalid cell`);
			console.error('All input values must be a valid chessboard cell');
			console.error('Example Input: A1 B2 C3\n');
			return false;
		}
	}

	return true;
}
