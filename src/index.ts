import deepCopy from 'deep-copy';
import inquirer from 'inquirer';

import { solveBoard } from './rooks';
import {
	Chessboard,
	EMPTY_BOARD,
	ROOK,
	drawChessBoard,
	validateInput,
	convertCell,
	validateBoard,
} from './util';

/**
 * Prompts the user for a list of space separated chessboard coordinates such
 * as 'A1 B2 H6' and returns their input as a board representation, An 8x8
 * boolean array with 'true' located in the cells they specified.
 * @returns A promise containing a nested boolean array, which is the board representation
 */
async function getInput(): Promise<Chessboard> {
	// Draws an empty chessboard for the user to reference for their input
	drawChessBoard();

	// Prompts the user for their starting board configuration
	// Note: inquirer.prompt() returns a 'Promise<any>' so I have to explicitly
	//       cast it to the type I know it will be returned as
	const input: { cells: string } = await inquirer.prompt([
		{
			type: 'input',
			message: 'Enter your initial rook placement:',
			name: 'cells',
		},
	]);

	// Converts the input to a list of cells
	const inputString = input.cells.trim();
	const inputCells = inputString === '' ? [] : inputString.split(' ');

	// Validate the input. Terminates if the input is invalid
	validateInput(inputCells);

	// Splits the users input on spaces and converts their chessboard location
	// to an array of row, column indices
	const rookGridLocations = inputCells.map(convertCell);

	// Copies the empty board and then "places" the rooks on the board
	const boardConfig = deepCopy(EMPTY_BOARD);
	rookGridLocations.forEach(([row, col]) => (boardConfig[row][col] = ROOK));

	// Checks if the user specified an illegal board
	validateBoard(boardConfig);

	return boardConfig;
}

/**
 * Entry point to script execution
 */
async function main() {
	const initialBoardConfig = await getInput();

	// Draws the board with the users placed pieces
	console.log('       Input Board       ');
	console.log('=========================');
	drawChessBoard(initialBoardConfig);

	// Solves the board to fill in the remaining pieces
	const finalBoardConfig = solveBoard(initialBoardConfig);

	// Draws the solved board
	console.log('       Solved Board      ');
	console.log('=========================');
	drawChessBoard(finalBoardConfig);
}

main();
