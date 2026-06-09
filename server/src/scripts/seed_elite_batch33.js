const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'cheapest-flights-within-k-stops',
    title: 'Cheapest Flights Within K Stops',
    difficulty: 'Medium',
    category: 'Graph',
    description: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\` indicates that there is a flight from city \`fromi\` to city \`toi\` with cost \`pricei\`.

You are also given three integers \`src\`, \`dst\`, and \`k\`, return the cheapest price from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.`,
    examples: [
      { input: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1', output: '700', explain: 'The optimal path with at most 1 stop from city 0 to 3 is 0 -> 1 -> 3 with cost 100 + 600 = 700.' },
      { input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1', output: '200', explain: 'The optimal path with at most 1 stop from city 0 to 2 is 0 -> 1 -> 2 with cost 100 + 100 = 200.' },
      { input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0', output: '500', explain: 'The optimal path with at most 0 stops from city 0 to 2 is 0 -> 2 with cost 500.' }
    ],
    constraints: [
      '1 <= n <= 100',
      '0 <= flights.length <= (n * (n - 1) / 2)',
      'flights[i].length == 3',
      '0 <= fromi, toi < n',
      'fromi != toi',
      '1 <= pricei <= 10^4',
      'There will not be any multiple flights between two cities.',
      '0 <= src, dst, k < n',
      'src != dst'
    ],
    testCases: [
      { input: { n: 4, flights: [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src: 0, dst: 3, k: 1 }, expected: 700, functionCall: 'findCheapestPrice(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)' },
      { input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1 }, expected: 200, functionCall: 'findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1)' },
      { input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 0 }, expected: 500, functionCall: 'findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
function findCheapestPrice(n, flights, src, dst, k) {
    
}`,
      python: `def findCheapestPrice(n, flights, src, dst, k):
    pass`,
      cpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    
}`,
      java: `public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    
}`
    },
    hints: ['You can use Bellman-Ford algorithm with k+1 iterations.', 'Alternatively, use Dijkstra\'s algorithm, but instead of just tracking the minimum cost to a node, also track the number of stops to reach it. A path with a higher cost might be preferable if it uses fewer stops.'],
    companies: ['Amazon', 'Meta', 'Bloomberg'],
    acceptance: 38,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Amazon',
    order: 161
  },
  {
    slug: 'longest-increasing-path-in-a-matrix',
    title: 'Longest Increasing Path in a Matrix',
    difficulty: 'Hard',
    category: 'Graph',
    description: `Given an \`m x n\` integers \`matrix\`, return the length of the longest increasing path in \`matrix\`.

From each cell, you can either move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary (i.e., wrap-around is not allowed).`,
    examples: [
      { input: 'matrix = [[9,9,4],[6,6,8],[2,1,1]]', output: '4', explain: 'The longest increasing path is [1, 2, 6, 9].' },
      { input: 'matrix = [[3,4,5],[3,2,6],[2,2,1]]', output: '4', explain: 'The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.' },
      { input: 'matrix = [[1]]', output: '1', explain: '' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 200',
      '0 <= matrix[i][j] <= 2^31 - 1'
    ],
    testCases: [
      { input: { matrix: [[9,9,4],[6,6,8],[2,1,1]] }, expected: 4, functionCall: 'longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]])' },
      { input: { matrix: [[3,4,5],[3,2,6],[2,2,1]] }, expected: 4, functionCall: 'longestIncreasingPath([[3,4,5],[3,2,6],[2,2,1]])' },
      { input: { matrix: [[1]] }, expected: 1, functionCall: 'longestIncreasingPath([[1]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number}
 */
function longestIncreasingPath(matrix) {
    
}`,
      python: `def longestIncreasingPath(matrix):
    pass`,
      cpp: `int longestIncreasingPath(vector<vector<int>>& matrix) {
    
}`,
      java: `public int longestIncreasingPath(int[][] matrix) {
    
}`
    },
    hints: ['A naive DFS will get Time Limit Exceeded. Use memoization (DFS + DP).', 'Let `dp[i][j]` be the length of the longest increasing path starting at cell (i, j).', 'Since the path must be strictly increasing, there are no cycles, so you don\'t need a `visited` array during DFS.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 53,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Google',
    order: 162
  },
  {
    slug: 'alien-dictionary',
    title: 'Alien Dictionary',
    difficulty: 'Hard',
    category: 'Graph',
    description: `There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings \`words\` from the alien language's dictionary, where the strings in \`words\` are **sorted lexicographically** by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If there is no solution, return \`""\`. If there are multiple solutions, return **any of them**.`,
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"', explain: 'From "wrt" and "wrf", we can deduce \'t\' < \'f\'.\nFrom "wrt" and "er", we can deduce \'w\' < \'e\'.\nFrom "er" and "ett", we can deduce \'r\' < \'t\'.\nFrom "ett" and "rftt", we can deduce \'e\' < \'r\'.\nThe correct order is \'w\' < \'e\' < \'r\' < \'t\' < \'f\'.' },
      { input: 'words = ["z","x"]', output: '"zx"', explain: '' },
      { input: 'words = ["z","x","z"]', output: '""', explain: 'The order is invalid, so return "".' }
    ],
    constraints: [
      '1 <= words.length <= 100',
      '1 <= words[i].length <= 100',
      'words[i] consists of only lowercase English letters.'
    ],
    testCases: [
      { input: { words: ["wrt","wrf","er","ett","rftt"] }, expected: "wertf", functionCall: 'alienOrder(["wrt","wrf","er","ett","rftt"])' },
      { input: { words: ["z","x"] }, expected: "zx", functionCall: 'alienOrder(["z","x"])' },
      { input: { words: ["z","x","z"] }, expected: "", functionCall: 'alienOrder(["z","x","z"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
    
}`,
      python: `def alienOrder(words):
    pass`,
      cpp: `string alienOrder(vector<string>& words) {
    
}`,
      java: `public String alienOrder(String[] words) {
    
}`
    },
    hints: ['Compare adjacent words to find the first differing character, which gives you a directed edge in your graph representing the character ordering.', 'Perform Topological Sort (e.g. Kahn\'s algorithm). If the graph has a cycle (or if you can\'t include all unique characters), it means the order is invalid, so return "".', 'Be careful of edge cases like ["abc", "ab"] where the dictionary is invalid but you might not naturally form a cycle.'],
    companies: ['Meta', 'Amazon', 'Google'],
    acceptance: 36,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Meta',
    order: 163
  },
  {
    slug: 'bus-routes',
    title: 'Bus Routes',
    difficulty: 'Hard',
    category: 'Graph',
    description: `You are given an array \`routes\` representing bus routes where \`routes[i]\` is a bus route that the \`i^{th}\` bus repeats forever.

*   For example, if \`routes[0] = [1, 5, 7]\`, this means that the \`0^{th}\` bus travels in the sequence \`1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...\` forever.

You will start at the bus stop \`source\` (You are not on any bus initially), and you want to go to the bus stop \`target\`. You can travel between bus stops by buses only.

Return the least number of buses you must take to travel from \`source\` to \`target\`. Return \`-1\` if it is not possible.`,
    examples: [
      { input: 'routes = [[1,2,7],[3,6,7]], source = 1, target = 6', output: '2', explain: 'The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.' },
      { input: 'routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12', output: '-1', explain: '' }
    ],
    constraints: [
      '1 <= routes.length <= 500',
      '1 <= routes[i].length <= 10^5',
      'All the values of routes[i] are unique.',
      'sum(routes[i].length) <= 10^5',
      '0 <= routes[i][j] < 10^6',
      '0 <= source, target < 10^6'
    ],
    testCases: [
      { input: { routes: [[1,2,7],[3,6,7]], source: 1, target: 6 }, expected: 2, functionCall: 'numBusesToDestination([[1,2,7],[3,6,7]], 1, 6)' },
      { input: { routes: [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source: 15, target: 12 }, expected: -1, functionCall: 'numBusesToDestination([[7,12],[4,5,15],[6],[15,19],[9,12,13]], 15, 12)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
function numBusesToDestination(routes, source, target) {
    
}`,
      python: `def numBusesToDestination(routes, source, target):
    pass`,
      cpp: `int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
    
}`,
      java: `public int numBusesToDestination(int[][] routes, int source, int target) {
    
}`
    },
    hints: ['Instead of treating the stops as nodes, treat the buses as nodes.', 'Map each stop to the buses that visit it. Perform BFS starting from the buses that visit the source stop, trying to reach any bus that visits the target stop.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 164
  },
  {
    slug: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'Medium',
    category: 'Graph',
    description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are **4-directionally** surrounded by \`'X'\`.

A region is **captured** by flipping all \`'O'\`s into \`'X'\`s in that surrounded region.`,
    examples: [
      { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]', explain: 'Notice that an \'O\' should not be flipped if:\n- It is on the border, or\n- It is adjacent to an \'O\' that should not be flipped.\nThe bottom \'O\' is on the border, so it is not flipped.\nThe other three \'O\' form a surrounded region, so they are flipped.' },
      { input: 'board = [["X"]]', output: '[["X"]]', explain: '' }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 200',
      'board[i][j] is \'X\' or \'O\'.'
    ],
    testCases: [
      { input: { board: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]] }, expected: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]], functionCall: 'runSolve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]])' },
      { input: { board: [["X"]] }, expected: [["X"]], functionCall: 'runSolve([["X"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solve(board) {
    
}

function runSolve(board) {
    solve(board);
    return board;
}`,
      python: `def solve(board):
    pass`,
      cpp: `void solve(vector<vector<char>>& board) {
    
}`,
      java: `public void solve(char[][] board) {
    
}`
    },
    hints: ['Any \'O\' connected to a border \'O\' is not surrounded.', 'Start a DFS/BFS from all \'O\'s on the border, marking them and their connected \'O\'s as safe (e.g., turning them to \'S\').', 'After marking all safe \'O\'s, iterate through the matrix: change remaining \'O\'s to \'X\' (as they are surrounded), and revert \'S\'s back to \'O\'.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 39,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 80,
    isFaang: true,
    topCompany: 'Amazon',
    order: 165
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
