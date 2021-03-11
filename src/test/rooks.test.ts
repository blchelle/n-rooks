import deepCopy from 'deep-copy';

import { solveBoard } from '../rooks';
import { BOARD_SIZE, ROOK, EMPTY_BOARD } from '../util';

/**
 * This tests the case when the user specifies the placement of 7 rooks.
 * In this case there should only be one place to put the remaining rook
 */
test('7/8 rooks placed', () => {
	// Builds out an input board with all 7/8 rooks already placed
	const inputBoard = deepCopy(EMPTY_BOARD);
	inputBoard[0][6] = ROOK; // A7
	inputBoard[1][1] = ROOK; // B2
	inputBoard[3][3] = ROOK; // C4
	inputBoard[4][7] = ROOK; // E8
	inputBoard[5][0] = ROOK; // F1
	inputBoard[6][2] = ROOK; // G3
	inputBoard[7][4] = ROOK; // H5

	// Solves the board
	const resultBoard = solveBoard(deepCopy(inputBoard));

	// The only valid place to put a rook is C6, place one there
	const expectedBoard = deepCopy(inputBoard);
	expectedBoard[2][5] = ROOK; // C6

	expect(resultBoard).toStrictEqual(expectedBoard);
});

/**
 * This tests the case when the user specifies the placement of 4 rooks.
 *
 * The expected output here is just one of many possible solutions but
 * solveBoard() is pure, so it will output a single, predictable solution
 */
test('4/8 rooks placed', () => {
	// Builds out an input board with all 8 rooks already placed
	const inputBoard = deepCopy(EMPTY_BOARD);
	inputBoard[0][1] = ROOK; // A2
	inputBoard[2][5] = ROOK; // C6
	inputBoard[4][2] = ROOK; // E3
	inputBoard[6][7] = ROOK; // G8

	// Solves the board
	const resultBoard = solveBoard(deepCopy(inputBoard));

	// These are the remaining cells that need to be filled
	const expectedBoard = deepCopy(inputBoard);
	expectedBoard[1][0] = ROOK; // B1
	expectedBoard[3][3] = ROOK; // D4
	expectedBoard[5][4] = ROOK; // F5
	expectedBoard[7][6] = ROOK; // H7

	expect(resultBoard).toStrictEqual(expectedBoard);
});

/**
 * This test the case when the user enters no cells, making the initial board
 * empty. In this case, the board should place rooks diagonally from the top
 * left corner (A1) down to the bottom right corner (H8)
 *
 * The expected output here is just one of many possible solutions, but
 * solveBoard is designed to output a single, predictable solution
 */
test('0/8 rooks placed', () => {
	// Solves the board
	const resultBoard = solveBoard(deepCopy(EMPTY_BOARD));

	// Builds out the expected board. That is, rooks placed diagonally from
	// top-left to bottom right
	const expectedBoard = deepCopy(EMPTY_BOARD);
	for (let i = 0; i < BOARD_SIZE; i++) {
		expectedBoard[i][i] = ROOK;
	}

	expect(resultBoard).toStrictEqual(expectedBoard);
});

/**
 * This tests the case when the user specifies the placement of all 8 rooks.
 * In this case, the input board should not be changed, since there is no
 * possible way to place another rook on the board
 */
test('8/8 rooks placed', () => {
	// Builds out an input board with all 8 rooks already placed
	const inputBoard = deepCopy(EMPTY_BOARD);
	for (let i = 0; i < BOARD_SIZE; i++) {
		inputBoard[i][i] = ROOK;
	}

	// Solves the board
	const resultBoard = solveBoard(deepCopy(inputBoard));

	// The expected board should equal to the input board,
	// Because the input board should be unchanged
	const expectedBoard = deepCopy(inputBoard);

	expect(resultBoard).toStrictEqual(expectedBoard);
});
