'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Print the stacks
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Check if a move is legal
const isLegal = (startStack, endStack) => {
  const startStackLength = stacks[startStack].length;
  const endStackLength = stacks[endStack].length;
  const topOfStartStack = stacks[startStack][startStackLength - 1];
  const topOfEndStack = stacks[endStack][endStackLength - 1];

  // If end stack is empty, move is legal
  if (endStackLength === 0) {
    return true;
  }

  // If top of the start stack is smaller than top of end stack, move is legal
  if (topOfStartStack < topOfEndStack) {
    return true;
  }

  // Otherwise, move is illegal
  return false;
}

// Move a disc from the start stack to the end stack
const movePiece = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    const disc = stacks[startStack].pop();
    stacks[endStack].push(disc);
    return true;
  } else {
    console.log('Illegal move! Try again.');
    return false;
  }
}

// Check if the player has won
const checkForWin = () => {
  return stacks.b.length === 4 &&
         stacks.b[0] === 4 &&
         stacks.b[1] === 3 &&
         stacks.b[2] === 2 &&
         stacks.b[3] === 1;
}

// Plays the game
const towersOfHanoi = (startStack, endStack) => {
  if (movePiece(startStack, endStack)) {
    if (checkForWin()) {
      console.log('You win!');
      process.exit();
    }
  }
}

// Get user input and play game
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
