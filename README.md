# N-Rooks Problem

Let’s say we have a chessboard, which has the typical 8 x 8 square tiles.
The rook is a chess piece that can move horizontally and vertically across the entire board.
Write a program that will take a board with N number of rooks already placed, and for the program to place more rooks with the following rules.

-   Rooks must be placed in such a way that they don’t collide with each other.
-   The program should take input for a starting board configuration with N rooks placed. (The starting set always conforms to the previous rule.)
-   We would expect 8 total rooks (including the starting set) can always be placed without violating the rule.

### Documentation

Generated documentation for the project is currently hosted at https://nrooks-docs.brockchelle.com

## Installation Instructions

All of the below technologies will be required to run this program.

-   Node
-   Yarn/NPM
-   Git

If you are certain that you have all the required installations, you may skip to step 4.

1. Execute the following command to ensure that NodeJS is installed on your machine. If it is, you will receive an output containing the version of Node on your machine.

```sh
node -v
# v14.16.0
```

2. Execute the following command to ensure that either NPM or Yarn is installed on your machine. If it is, you will receive an output containing the version of NPM/Yarn on your machine.

```sh
npm -v # 6.4.11
# or
yarn -v # 1.22.10
```

3. Execute the following to ensure that Git is installed on your machine. If it is, you will receive an output containing the version of Git on your machine.

```sh
git --version
# git version 2.25.1
```

4. Clone the repository to your local machine and navigate into the n-rooks directory

```sh
git clone https://github.com/blchelle/n-rooks && cd n-rooks/
```

6. Install all of the project dependencies

```sh
npm install
# or
yarn install
```

## Execution Instructions

1. Ensure that you have completed all the steps in [Installation Instructions](#Installation-Instructions)

2. Run the script by executing either of the following commands

```sh
npm run start
# or
yarn start
```

3. Once the script starts running, you will be shown the layout of the chessboard and then prompted to enter the locations of your rooks. Your input should be a space-separated list of cells. For example:

```sh
? Where are your rooks initially placed: A1 B2 C3 D4
```

3. After you enter your input, you will first be shown the board after it places your initial rooks. Then, once it finds locations for the remaining pieces, it will show you the solved configuration.

    **Note:** This solution only shows you one of many possible configurations. For any input of n valid cells, there are !(8 - n) board configurations

```
       Input Board
=========================
     1 2 3 4 5 6 7 8
    -----------------
 A | ♜ · · · · · · · |
 B | · ♜ · · · · · · |
 C | · · ♜ · · · · · |
 D | · · · ♜ · · · · |
 E | · · · · · · · · |
 F | · · · · · · · · |
 G | · · · · · · · · |
 H | · · · · · · · · |
    -----------------

      Solved Board
=========================
     1 2 3 4 5 6 7 8
    -----------------
 A | ♜ · · · · · · · |
 B | · ♜ · · · · · · |
 C | · · ♜ · · · · · |
 D | · · · ♜ · · · · |
 E | · · · · ♜ · · · |
 F | · · · · · ♜ · · |
 G | · · · · · · ♜ · |
 H | · · · · · · · ♜ |
    -----------------

```

### Example

**Input**

```
     1 2 3 4 5 6 7 8
    -----------------
 A | · · · · · · · · |
 B | · · · · · · · · |
 C | · · · · · · · · |
 D | · · · · · · · · |
 E | · · · · · · · · |
 F | · · · · · · · · |
 G | · · · · · · · · |
 H | · · · · · · · · |
    -----------------

? Where are your rooks initially placed: A1 B6 H4 D3
```

**Output**

```
       Input Board
=========================
     1 2 3 4 5 6 7 8
    -----------------
 A | ♜ · · · · · · · |
 B | · · · · · ♜ · · |
 C | · · · · · · · · |
 D | · · ♜ · · · · · |
 E | · · · · · · · · |
 F | · · · · · · · · |
 G | · · · · · · · · |
 H | · · · ♜ · · · · |
    -----------------

      Solved Board
=========================
     1 2 3 4 5 6 7 8
    -----------------
 A | ♜ · · · · · · · |
 B | · · · · · ♜ · · |
 C | · ♜ · · · · · · |
 D | · · ♜ · · · · · |
 E | · · · · ♜ · · · |
 F | · · · · · · ♜ · |
 G | · · · · · · · ♜ |
 H | · · · ♜ · · · · |
    -----------------
```

## Running the Test Suite

1. Ensure that you have completed all the steps in [Installation Instructions](#Installation-Instructions)
2. Execute the following command

```sh
npm run test
# or
yarn test
```
