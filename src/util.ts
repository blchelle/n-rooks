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

/**
 * A representation of an 8x8 chessboard with no rooks on it
 */
export const EMPTY_BOARD: Chessboard = Array.from({ length: BOARD_SIZE }, () =>
	Array.from({ length: BOARD_SIZE }, () => !ROOK)
);

// The ASCII value for an uppercase A
// This is used for the conversion from ASCII to numeric
const A_ASCII = 65;

// UTF-8 characters used in the chessboard drawings
const UTF_ROOK = '\u265C';
const UTF_DOT = '\u00B7';

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
 * For Example: A5 would be converted to [0, 4] which means row 0, column 4
 * @param cell A location on the chess board (ie. 'A5')
 * @returns The indexable equivalent of the input cell (ie. [0, 4])
 */
export function convertCell(cell: string) {
	return [cell.charCodeAt(0) - A_ASCII, +cell[1] - 1];
}

/**
 * Checks if a users input board is valid.
 * An invalid board is one where 2 or more rooks are threatening each other
 *
 * @param board The users input board
 * @return Whether or not the board is valid (true/false)
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
					console.log('\nInvalid Board Configuration\n');
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
 * Validates that all of the users inputs are valid cells on a chessboard
 *
 * @param cells An array of cell strings (ie. ['A1', 'B2'])
 * @return Whether or not all of the input cells are valid (true/false)
 */
export function validateInput(cells: string[]) {
	const cellRegex = /^[ABCDEFGH][12345678]$/;

	// This is going to be used for checking uniqueness at the end
	const cellSet = new Set<string>();

	for (let cell of cells) {
		if (!cellRegex.test(cell)) {
			console.log(`\n'${cell}' is an invalid cell`);
			console.log('All input values must be a valid chessboard cell');
			console.log('Example Input: A1 B2 C3\n');
			return false;
		}

		cellSet.add(cell);
	}

	// Test for uniqueness. If the size of the set doesn't change when we
	// add a cell, we know it already exists in the set.
	if (cellSet.size < cells.length) {
		console.log(`\nYou entered duplicate cells, which is invalid\n`);
		return false;
	}

	return true;
}
