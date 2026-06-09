const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    category: 'Matrix',
    description: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

1.  Each row must contain the digits \`1-9\` without repetition.
2.  Each column must contain the digits \`1-9\` without repetition.
3.  Each of the nine \`3 x 3\` sub-boxes of the grid must contain the digits \`1-9\` without repetition.

**Note:**
*   A Sudoku board (partially filled) could be valid but is not necessarily solvable.
*   Only the filled cells need to be validated according to the mentioned rules.`,
    examples: [
      { input: 'board = \n[["5","3",".",".","7",".",".",".","."]\n,["6",".",".","1","9","5",".",".","."]\n,[".","9","8",".",".",".",".","6","."]\n,["8",".",".",".","6",".",".",".","3"]\n,["4",".",".","8",".","3",".",".","1"]\n,["7",".",".",".","2",".",".",".","6"]\n,[".","6",".",".",".",".","2","8","."]\n,[".",".",".","4","1","9",".",".","5"]\n,[".",".",".",".","8",".",".","7","9"]]', output: 'true', explain: '' }
    ],
    constraints: [
      'board.length == 9',
      'board[i].length == 9',
      'board[i][j] is a digit 1-9 or \'.\'.'
    ],
    testCases: [
      { input: { board: [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]] }, expected: true, functionCall: 'isValidSudoku([["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    
}`,
      python: `def isValidSudoku(board):
    pass`,
      cpp: `bool isValidSudoku(vector<vector<char>>& board) {
    
}`,
      java: `public boolean isValidSudoku(char[][] board) {
    
}`
    },
    hints: ['A sudoku board is valid if all rows, columns, and 3x3 sub-boxes contain unique digits (ignoring \'.\').', 'Use hash sets to keep track of the numbers you have seen in each row, column, and sub-box.', 'To map a cell `(i, j)` to its corresponding sub-box index, you can use `(i / 3) * 3 + (j / 3)`.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Amazon',
    order: 196
  },
  {
    slug: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    category: 'Matrix',
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explain: '' },
      { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', explain: '' }
    ],
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000'
    ],
    testCases: [
      { input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] }, expected: [[7,4,1],[8,5,2],[9,6,3]], functionCall: 'runRotate([[1,2,3],[4,5,6],[7,8,9]])' },
      { input: { matrix: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] }, expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]], functionCall: 'runRotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
    
}

function runRotate(matrix) {
    rotate(matrix);
    return matrix;
}`,
      python: `def rotate(matrix):
    pass`,
      cpp: `void rotate(vector<vector<int>>& matrix) {
    
}`,
      java: `public void rotate(int[][] matrix) {
    
}`
    },
    hints: ['The most elegant way to rotate a matrix by 90 degrees clockwise is to first transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`), and then reverse each row.', 'This modifies the matrix in-place and takes O(N^2) time.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 73,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 197
  },
  {
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    category: 'Matrix',
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.

You must do it **in place**.`,
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explain: '' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]', explain: '' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[0].length',
      '1 <= m, n <= 200',
      '-2^31 <= matrix[i][j] <= 2^31 - 1'
    ],
    testCases: [
      { input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] }, expected: [[1,0,1],[0,0,0],[1,0,1]], functionCall: 'runSetZeroes([[1,1,1],[1,0,1],[1,1,1]])' },
      { input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] }, expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]], functionCall: 'runSetZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix) {
    
}

function runSetZeroes(matrix) {
    setZeroes(matrix);
    return matrix;
}`,
      python: `def setZeroes(matrix):
    pass`,
      cpp: `void setZeroes(vector<vector<int>>& matrix) {
    
}`,
      java: `public void setZeroes(int[][] matrix) {
    
}`
    },
    hints: ['If you use O(m + n) space, you can store which rows and columns should be zeroed out. But can you do it in O(1) space?', 'Use the first row and first column of the matrix to store the flags for whether that row or column needs to be zeroed.', 'Be careful because the first row and column overlap at `matrix[0][0]`. Use an extra variable to track if the first column needs to be zeroed.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Amazon',
    order: 198
  },
  {
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    category: 'Greedy',
    description: `There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array \`points\` where \`points[i] = [xstart, xend]\` denotes a balloon whose **horizontal diameter** stretches between \`xstart\` and \`xend\`. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up **directly vertically** (in the positive y-direction) from different points along the x-axis. A balloon with \`xstart\` and \`xend\` is **burst** by an arrow shot at \`x\` if \`xstart <= x <= xend\`. There is **no limit** to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array \`points\`, return the **minimum** number of arrows that must be shot to burst all balloons.`,
    examples: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explain: 'The balloons can be burst by 2 arrows:\n- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].\n- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].' },
      { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4', explain: 'One arrow needs to be shot for each balloon for a total of 4 arrows.' },
      { input: 'points = [[1,2],[2,3],[3,4],[4,5]]', output: '2', explain: 'The balloons can be burst by 2 arrows:\n- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].\n- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].' }
    ],
    constraints: [
      '1 <= points.length <= 10^5',
      'points[i].length == 2',
      '-2^31 <= xstart < xend <= 2^31 - 1'
    ],
    testCases: [
      { input: { points: [[10,16],[2,8],[1,6],[7,12]] }, expected: 2, functionCall: 'findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])' },
      { input: { points: [[1,2],[3,4],[5,6],[7,8]] }, expected: 4, functionCall: 'findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])' },
      { input: { points: [[1,2],[2,3],[3,4],[4,5]] }, expected: 2, functionCall: 'findMinArrowShots([[1,2],[2,3],[3,4],[4,5]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
    
}`,
      python: `def findMinArrowShots(points):
    pass`,
      cpp: `int findMinArrowShots(vector<vector<int>>& points) {
    
}`,
      java: `public int findMinArrowShots(int[][] points) {
    
}`
    },
    hints: ['This is a classic Greedy interval problem.', 'Sort the intervals by their end coordinates.', 'Greedily shoot an arrow at the end coordinate of the first balloon. This arrow will burst any subsequent balloons whose start coordinate is less than or equal to this end coordinate.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Meta',
    order: 199
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codearena').then(async () => {
  console.log('MongoDB Connected');
  let added = 0;
  for (const p of problems) {
    const existing = await Problem.findOne({ slug: p.slug });
    if (existing) {
      console.log(`Problem ${p.slug} already exists. Updating...`);
      await Problem.updateOne({ slug: p.slug }, p);
    } else {
      await Problem.create(p);
      console.log(`Added ${p.slug}`);
    }
    added++;
  }
  console.log(`Successfully injected ${added} Elite Archive problems.`);
  mongoose.disconnect();
}).catch(err => {
  console.error('DB Connection Error:', err);
  process.exit(1);
});
