const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'word-search-ii',
    title: 'Word Search II',
    difficulty: 'Hard',
    category: 'Trie',
    description: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where **adjacent cells** are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]', explain: 'The words "eat" and "oath" can be found on the board.' },
      { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]', explain: 'The word "abcb" cannot be formed without reusing cells.' }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 12',
      'board[i][j] is a lowercase English letter.',
      '1 <= words.length <= 3 * 10^4',
      '1 <= words[i].length <= 10',
      'words[i] consists of lowercase English letters.',
      'All the strings of words are unique.'
    ],
    testCases: [
      { input: { board: [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words: ["oath","pea","eat","rain"] }, expected: ["eat","oath"], functionCall: 'findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])' },
      { input: { board: [["a","b"],["c","d"]], words: ["abcb"] }, expected: [], functionCall: 'findWords([["a","b"],["c","d"]], ["abcb"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
    
}`,
      python: `def findWords(board, words):
    pass`,
      cpp: `vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    
}`,
      java: `public List<String> findWords(char[][] board, String[] words) {
    
}`
    },
    hints: ['Put all the words into a Trie.', 'Iterate over every cell in the board and start a DFS/Backtracking search. As you traverse the board, also traverse down the Trie.', 'When you find a word, add it to the result and optionally remove it from the Trie to prevent duplicates and optimize future searches.'],
    companies: ['Amazon', 'Microsoft', 'Google'],
    acceptance: 38,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 146
  },
  {
    slug: 'populating-next-right-pointers-in-each-node',
    title: 'Populating Next Right Pointers in Each Node',
    difficulty: 'Medium',
    category: 'Tree',
    description: `You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:
\`\`\`
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
\`\`\`
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to \`NULL\`.

Initially, all next pointers are set to \`NULL\`.`,
    examples: [
      { input: 'root = [1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]', explain: 'Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with \'#\' signifying the end of each level.' },
      { input: 'root = []', output: '[]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2^12 - 1].',
      '-1000 <= Node.val <= 1000'
    ],
    testCases: [
      { input: { root: [1,2,3,4,5,6,7] }, expected: [1,'#',2,3,'#',4,5,6,7,'#'], functionCall: 'runConnect([1,2,3,4,5,6,7])' }
    ],
    starterCode: {
      javascript: `/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
function connect(root) {
    
}

// Internal wrapper to test Next pointers
function runConnect(rootArr) {
    let root = createBinaryTree(rootArr); // Note: Need a custom tree builder if testing next ptrs directly
    // Returning dummy for now since serialization of next pointers is complex
    return [];
}`,
      python: `def connect(root):
    pass`,
      cpp: `Node* connect(Node* root) {
    
}`,
      java: `public Node connect(Node root) {
    
}`
    },
    hints: ['You may only use constant extra space.', 'Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.', 'Use the previously established `next` pointers to link the current level before moving down to the next level.'],
    companies: ['Amazon', 'Bloomberg', 'Microsoft'],
    acceptance: 61,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 147
  },
  {
    slug: 'sum-root-to-leaf-numbers',
    title: 'Sum Root to Leaf Numbers',
    difficulty: 'Medium',
    category: 'Tree',
    description: `You are given the \`root\` of a binary tree containing digits from \`0\` to \`9\` only.

Each root-to-leaf path in the tree represents a number.
- For example, the root-to-leaf path \`1 -> 2 -> 3\` represents the number \`123\`.

Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a **32-bit** integer.

A **leaf** node is a node with no children.`,
    examples: [
      { input: 'root = [1,2,3]', output: '25', explain: 'The root-to-leaf path 1->2 represents the number 12.\nThe root-to-leaf path 1->3 represents the number 13.\nTherefore, sum = 12 + 13 = 25.' },
      { input: 'root = [4,9,0,5,1]', output: '1026', explain: 'The root-to-leaf path 4->9->5 represents the number 495.\nThe root-to-leaf path 4->9->1 represents the number 491.\nThe root-to-leaf path 4->0 represents the number 40.\nTherefore, sum = 495 + 491 + 40 = 1026.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 1000].',
      '0 <= Node.val <= 9',
      'The depth of the tree will not exceed 10.'
    ],
    testCases: [
      { input: { root: [1,2,3] }, expected: 25, functionCall: 'sumNumbers(createBinaryTree([1,2,3]))' },
      { input: { root: [4,9,0,5,1] }, expected: 1026, functionCall: 'sumNumbers(createBinaryTree([4,9,0,5,1]))' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumNumbers(root) {
    
}`,
      python: `def sumNumbers(root):
    pass`,
      cpp: `int sumNumbers(TreeNode* root) {
    
}`,
      java: `public int sumNumbers(TreeNode root) {
    
}`
    },
    hints: ['Use DFS. Keep track of the current number as you traverse down. `current_number = current_number * 10 + node.val`.', 'When you reach a leaf, add the `current_number` to a global sum or return it.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 148
  },
  {
    slug: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.`,
    examples: [
      { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]', explain: '' },
      { input: 'root = [1,null,3]', output: '[1,3]', explain: '' },
      { input: 'root = []', output: '[]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [1,2,3,null,5,null,4] }, expected: [1,3,4], functionCall: 'rightSideView(createBinaryTree([1,2,3,null,5,null,4]))' },
      { input: { root: [1,null,3] }, expected: [1,3], functionCall: 'rightSideView(createBinaryTree([1,null,3]))' },
      { input: { root: [] }, expected: [], functionCall: 'rightSideView(createBinaryTree([]))' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    
}`,
      python: `def rightSideView(root):
    pass`,
      cpp: `vector<int> rightSideView(TreeNode* root) {
    
}`,
      java: `public List<Integer> rightSideView(TreeNode root) {
    
}`
    },
    hints: ['Can you use Breadth First Search (BFS)? For each level, append the last node\'s value to the result.', 'Alternatively, use Depth First Search (DFS), but make sure to visit the right child before the left child, and keep track of the depth.'],
    companies: ['Amazon', 'Meta', 'Bloomberg'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Amazon',
    order: 149
  },
  {
    slug: 'flood-fill',
    title: 'Flood Fill',
    difficulty: 'Easy',
    category: 'Graph',
    description: `An image is represented by an \`m x n\` integer grid \`image\` where \`image[i][j]\` represents the pixel value of the image.

You are also given three integers \`sr\`, \`sc\`, and \`color\`. You should perform a **flood fill** on the image starting from the pixel \`image[sr][sc]\`.

To perform a **flood fill**, consider the starting pixel, plus any pixels connected **4-directionally** to the starting pixel of the same color as the starting pixel, plus any pixels connected **4-directionally** to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with \`color\`.

Return the modified image after performing the flood fill.`,
    examples: [
      { input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2', output: '[[2,2,2],[2,2,0],[2,0,1]]', explain: 'From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.\nNote the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.' },
      { input: 'image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0', output: '[[0,0,0],[0,0,0]]', explain: 'The starting pixel is already colored 0, so no changes are made to the image.' }
    ],
    constraints: [
      'm == image.length',
      'n == image[i].length',
      '1 <= m, n <= 50',
      '0 <= image[i][j], color < 2^16',
      '0 <= sr < m',
      '0 <= sc < n'
    ],
    testCases: [
      { input: { image: [[1,1,1],[1,1,0],[1,0,1]], sr: 1, sc: 1, color: 2 }, expected: [[2,2,2],[2,2,0],[2,0,1]], functionCall: 'floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)' },
      { input: { image: [[0,0,0],[0,0,0]], sr: 0, sc: 0, color: 0 }, expected: [[0,0,0],[0,0,0]], functionCall: 'floodFill([[0,0,0],[0,0,0]], 0, 0, 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
function floodFill(image, sr, sc, color) {
    
}`,
      python: `def floodFill(image, sr, sc, color):
    pass`,
      cpp: `vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
    
}`,
      java: `public int[][] floodFill(int[][] image, int sr, int sc, int color) {
    
}`
    },
    hints: ['Use Depth First Search (DFS) or Breadth First Search (BFS).', 'If the starting pixel is already the target color, return the original image to avoid an infinite loop.', 'Recursively (or iteratively) visit all 4-directional neighbors and change their color if it matches the original starting pixel color.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 150
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
