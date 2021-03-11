import deepCopy from 'deep-copy';
import { EMPTY_BOARD, ROOK, validateBoard, validateInput } from '../util';

/**
 * This tests the case when a user enters an invalid cell.
 * The function used to validate the input cells should return false
 */
test('one invalid cell', () => {
	// A9 is an invalid chess cell
	const input = ['A9'];

	expect(validateInput(input)).toBe(false);
});

/**
 * This tests the case when a user enters duplicate cells
 * The function used to validate the input cells should return false
 */
test('duplicate input cells', () => {
	// A1 and A1 are the same cell
	const input = ['A1', 'A1'];

	expect(validateInput(input)).toBe(false);
});

/**
 * This tests the case when the user enters both valid and invalid cells
 * The function used to validate the input cells should return false
 */
test('many valid cells, 1 invalid', () => {
	// Here, I4 is an invalid chess cell
	const input = ['A1', 'B2', 'C3', 'I4'];

	expect(validateInput(input)).toBe(false);
});

/**
 * This tests the case when all the cells the user enters are valid
 * The function used to validate the input cells should return true
 */
test('all valid cells', () => {
	// All four of these cells are valid chess cells
	const input = ['A1', 'H8', 'D3', 'C7'];

	expect(validateInput(input)).toBe(true);
});

/**
 * This tests for detection of an invalid board configuration
 * In this particular case, 2 rooks are in the same row
 */
test('invalid board configuration', () => {
	const inputBoard = deepCopy(EMPTY_BOARD);
	inputBoard[0][0] = ROOK; // A1
	inputBoard[1][1] = ROOK; // B2
	inputBoard[2][2] = ROOK; // C3
	inputBoard[3][3] = ROOK; // D4 - same row as the below line, invalid
	inputBoard[3][4] = ROOK; // D5 - same row as the above line, invalid

	expect(validateBoard(inputBoard)).toBe(false);
});

/**
 * This tests for confirmation of a valid board configuration
 */
test('valid board configuration', () => {
	const inputBoard = deepCopy(EMPTY_BOARD);
	inputBoard[0][0] = ROOK; // A1
	inputBoard[1][1] = ROOK; // B2
	inputBoard[2][2] = ROOK; // C3
	inputBoard[3][3] = ROOK; // D4
	inputBoard[4][4] = ROOK; // E5

	expect(validateBoard(inputBoard)).toBe(true);
});
