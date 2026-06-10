const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: '01-matrix',
    title: '01 Matrix',
    difficulty: 'Medium',
    category: 'Graph',
    description: `Given an \`m x n\` binary matrix \`mat\`, return the distance of the nearest \`0\` for each cell.

The distance between two adjacent cells is \`1\`.`,
    examples: [
      { input: 'mat = [[0,0,0],[0,1,0],[0,0,0]]', output: '[[0,0,0],[0,1,0],[0,0,0]]', explain: '' },
      { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]', explain: '' }
    ],
    constraints: [
      'm == mat.length',
      'n == mat[i].length',
      '1 <= m, n <= 10^4',
      '1 <= m * n <= 10^4',
      'mat[i][j] is either 0 or 1.',
      'There is at least one 0 in mat.'
    ],
    testCases: [
      { input: { mat: [[0,0,0],[0,1,0],[0,0,0]] }, expected: [[0,0,0],[0,1,0],[0,0,0]], functionCall: 'updateMatrix([[0,0,0],[0,1,0],[0,0,0]])' },
      { input: { mat: [[0,0,0],[0,1,0],[1,1,1]] }, expected: [[0,0,0],[0,1,0],[1,2,1]], functionCall: 'updateMatrix([[0,0,0],[0,1,0],[1,1,1]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
function updateMatrix(mat) {
    
}`,
      python: `def updateMatrix(mat):
    pass`,
      cpp: `vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
    
}`,
      java: `public int[][] updateMatrix(int[][] mat) {
    
}`
    },
    hints: ['A naive BFS starting from each 1 to find the closest 0 would be too slow.', 'Instead, use a multi-source BFS. Start by enqueuing all the 0s and set the distance of 1s to infinity. Then, expand outward from the 0s to find the shortest distance to all 1s.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 151
  },
  {
    slug: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You are given an \`m x n\` \`grid\` where each cell can have one of three values:
*   \`0\` representing an empty cell,
*   \`1\` representing a fresh orange, or
*   \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.`,
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', explain: 'The rotting process spreads out from the top-left orange over 4 minutes.' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', explain: 'The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.' },
      { input: 'grid = [[0,2]]', output: '0', explain: 'Since there are already no fresh oranges at minute 0, the answer is just 0.' }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 10',
      'grid[i][j] is 0, 1, or 2.'
    ],
    testCases: [
      { input: { grid: [[2,1,1],[1,1,0],[0,1,1]] }, expected: 4, functionCall: 'orangesRotting([[2,1,1],[1,1,0],[0,1,1]])' },
      { input: { grid: [[2,1,1],[0,1,1],[1,0,1]] }, expected: -1, functionCall: 'orangesRotting([[2,1,1],[0,1,1],[1,0,1]])' },
      { input: { grid: [[0,2]] }, expected: 0, functionCall: 'orangesRotting([[0,2]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
    
}`,
      python: `def orangesRotting(grid):
    pass`,
      cpp: `int orangesRotting(vector<vector<int>>& grid) {
    
}`,
      java: `public int orangesRotting(int[][] grid) {
    
}`
    },
    hints: ['This is another classic multi-source BFS problem.', 'Start by enqueuing all the initially rotten oranges. Keep track of the number of fresh oranges. Perform level-by-level BFS. If all fresh oranges are rotted, return the time. Otherwise, return -1.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Amazon',
    order: 152
  },
  {
    slug: 'accounts-merge',
    title: 'Accounts Merge',
    difficulty: 'Medium',
    category: 'Graph',
    description: `Given a list of \`accounts\` where each element \`accounts[i]\` is a list of strings, where the first element \`accounts[i][0]\` is a name, and the rest of the elements are **emails** representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails **in sorted order**. The accounts themselves can be returned in **any order**.`,
    examples: [
      { input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]', output: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]', explain: 'The first and second John\'s are the same person as they have the common email "johnsmith@mail.com".\nThe third John and Mary are different people as none of their email addresses are used by other accounts.' }
    ],
    constraints: [
      '1 <= accounts.length <= 1000',
      '2 <= accounts[i].length <= 10',
      '1 <= accounts[i][j].length <= 30',
      'accounts[i][0] consists of English letters.',
      'accounts[i][j] (for j > 0) is a valid email.'
    ],
    testCases: [
      { input: { accounts: [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]] }, expected: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["John","johnnybravo@mail.com"],["Mary","mary@mail.com"]], functionCall: 'runAccountsMerge([["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
function accountsMerge(accounts) {
    
}

function runAccountsMerge(accounts) {
    let res = accountsMerge(accounts);
    res.forEach(arr => arr.sort());
    return res.sort((a,b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
}`,
      python: `def accountsMerge(accounts):
    pass`,
      cpp: `vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
    
}`,
      java: `public List<List<String>> accountsMerge(List<List<String>> accounts) {
    
}`
    },
    hints: ['Treat emails as nodes in a graph. Draw edges between emails that belong to the same account.', 'Use Disjoint Set Union (DSU) or DFS to find the connected components of emails.', 'Map each connected component to its owner\'s name and sort the emails.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 98,
    isFaang: true,
    topCompany: 'Meta',
    order: 153
  },
  {
    slug: 'minimum-height-trees',
    title: 'Minimum Height Trees',
    difficulty: 'Medium',
    category: 'Graph',
    description: `A tree is an undirected graph in which any two vertices are connected by *exactly* one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of \`n\` nodes labelled from \`0\` to \`n - 1\`, and an array of \`n - 1\` \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between the two nodes \`ai\` and \`bi\` in the tree, you can choose any node of the tree as the root. When you select a node \`x\` as the root, the result tree has height \`h\`. Among all possible rooted trees, those with minimum height (i.e. \`min(h)\`) are called **minimum height trees** (MHTs).

Return a list of all **MHTs'** root labels. You can return the answer in **any order**.

The **height** of a rooted tree is the number of edges on the longest downward path between the root and a leaf.`,
    examples: [
      { input: 'n = 4, edges = [[1,0],[1,2],[1,3]]', output: '[1]', explain: 'As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.' },
      { input: 'n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]', output: '[3,4]', explain: '' }
    ],
    constraints: [
      '1 <= n <= 2 * 10^4',
      'edges.length == n - 1',
      '0 <= ai, bi < n',
      'ai != bi',
      'All the pairs (ai, bi) are distinct.',
      'The given input is guaranteed to be a tree and there will be no repeated edges.'
    ],
    testCases: [
      { input: { n: 4, edges: [[1,0],[1,2],[1,3]] }, expected: [1], functionCall: 'runFindMinHeightTrees(4, [[1,0],[1,2],[1,3]])' },
      { input: { n: 6, edges: [[3,0],[3,1],[3,2],[3,4],[5,4]] }, expected: [3,4], functionCall: 'runFindMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function findMinHeightTrees(n, edges) {
    
}

function runFindMinHeightTrees(n, edges) {
    return findMinHeightTrees(n, edges).sort((a,b)=>a-b);
}`,
      python: `def findMinHeightTrees(n, edges):
    pass`,
      cpp: `vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
    
}`,
      java: `public List<Integer> findMinHeightTrees(int n, int[][] edges) {
    
}`
    },
    hints: ['The roots of the Minimum Height Trees are the centroids of the tree.', 'You can find the centroids by iteratively trimming the leaves of the tree (like topological sort) until there are 1 or 2 nodes left.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 39,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 154
  },
  {
    slug: 'shortest-path-to-get-food',
    title: 'Shortest Path to Get Food',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You are starving and you want to eat food as quickly as possible. You want to find the shortest path to arrive at any food cell.

You are given an \`m x n\` character matrix, \`grid\`, of these different types of cells:
*   \`'*'\` is your location. There is exactly one \`'*'\` cell.
*   \`'#'\` is a food cell. There may be multiple food cells.
*   \`'O'\` is free space, and you can travel through these cells.
*   \`'X'\` is an obstacle, and you cannot travel through these cells.

You can travel to any adjacent cell north, east, south, or west of your current location if there is not an obstacle.

Return the **length of the shortest path for you to reach any food cell**. If there is no path for you to reach food, return \`-1\`.`,
    examples: [
      { input: 'grid = [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]', output: '3', explain: 'It takes 3 steps to reach the food.' },
      { input: 'grid = [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]]', output: '-1', explain: 'It is not possible to reach the food.' },
      { input: 'grid = [["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["X","X","X","X","X","X","X","X"]]', output: '6', explain: 'There can be multiple food cells. It only takes 6 steps to reach the bottom food.' }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 200',
      'grid[i][j] is \'*\', \'X\', \'O\', or \'#\'.',
      'The \'*\' character appears exactly once in the grid.'
    ],
    testCases: [
      { input: { grid: [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]] }, expected: 3, functionCall: 'getFood([["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]])' },
      { input: { grid: [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]] }, expected: -1, functionCall: 'getFood([["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function getFood(grid) {
    
}`,
      python: `def getFood(grid):
    pass`,
      cpp: `int getFood(vector<vector<char>>& grid) {
    
}`,
      java: `public int getFood(char[][] grid) {
    
}`
    },
    hints: ['Find the starting location of the player.', 'Use Breadth-First Search (BFS) starting from the player\'s location to find the shortest path to any food cell. The first food cell reached will be the closest.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 53,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 76,
    isFaang: true,
    topCompany: 'Amazon',
    order: 155
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
