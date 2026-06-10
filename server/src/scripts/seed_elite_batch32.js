const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer n and a list of \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between nodes \`ai\` and \`bi\` in the graph.

Return \`true\` if the edges of the given graph make up a valid tree, and \`false\` otherwise.`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true', explain: '' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false', explain: '' }
    ],
    constraints: [
      '1 <= n <= 2000',
      '0 <= edges.length <= 5000',
      'edges[i].length == 2',
      '0 <= ai, bi < n',
      'ai != bi',
      'There are no self-loops or repeated edges.'
    ],
    testCases: [
      { input: { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]] }, expected: true, functionCall: 'validTree(5, [[0,1],[0,2],[0,3],[1,4]])' },
      { input: { n: 5, edges: [[0,1],[1,2],[2,3],[1,3],[1,4]] }, expected: false, functionCall: 'validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function validTree(n, edges) {
    
}`,
      python: `def validTree(n, edges):
    pass`,
      cpp: `bool validTree(int n, vector<vector<int>>& edges) {
    
}`,
      java: `public boolean validTree(int n, int[][] edges) {
    
}`
    },
    hints: ['A valid tree must have exactly n - 1 edges. If it has more or less, it cannot be a tree.', 'Use Disjoint Set Union (DSU) to check for cycles. If adding an edge connects two nodes that are already in the same set, there is a cycle.', 'Also ensure that all nodes are connected (i.e., there is only one connected component).'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 48,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Amazon',
    order: 156
  },
  {
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graph',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

*   For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explain: 'There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explain: 'There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.' }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    testCases: [
      { input: { numCourses: 2, prerequisites: [[1,0]] }, expected: true, functionCall: 'canFinish(2, [[1,0]])' },
      { input: { numCourses: 2, prerequisites: [[1,0],[0,1]] }, expected: false, functionCall: 'canFinish(2, [[1,0],[0,1]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    
}`,
      python: `def canFinish(numCourses, prerequisites):
    pass`,
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    
}`,
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    
}`
    },
    hints: ['This problem is equivalent to finding if a cycle exists in a directed graph.', 'You can use Kahn\'s algorithm for Topological Sorting (BFS based).', 'Alternatively, use DFS with a `visited` array (or coloring: unvisited, visiting, visited) to detect back-edges (cycles).'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Amazon',
    order: 157
  },
  {
    slug: 'course-schedule-ii',
    title: 'Course Schedule II',
    difficulty: 'Medium',
    category: 'Graph',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

*   For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: '[0,1]', explain: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].' },
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3]', explain: 'There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.\nSo one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].' }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= numCourses * (numCourses - 1)',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'ai != bi',
      'All the pairs [ai, bi] are distinct.'
    ],
    testCases: [
      { input: { numCourses: 2, prerequisites: [[1,0]] }, expected: [0,1], functionCall: 'findOrder(2, [[1,0]])' },
      { input: { numCourses: 4, prerequisites: [[1,0],[2,0],[3,1],[3,2]] }, expected: [0,1,2,3], functionCall: 'findOrder(4, [[1,0],[2,0],[3,1],[3,2]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
    
}`,
      python: `def findOrder(numCourses, prerequisites):
    pass`,
      cpp: `vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    
}`,
      java: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    
}`
    },
    hints: ['This problem is equivalent to finding the topological order in a directed graph.', 'Use Kahn\'s algorithm: calculate the in-degree of each node. Enqueue nodes with in-degree 0. As you dequeue a node, add it to the topological order and decrement the in-degree of its neighbors.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 49,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 158
  },
  {
    slug: 'number-of-connected-components-in-an-undirected-graph',
    title: 'Number of Connected Components in an Undirected Graph',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.

Return the number of connected components in the graph.`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2', explain: '' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1', explain: '' }
    ],
    constraints: [
      '1 <= n <= 2000',
      '1 <= edges.length <= 5000',
      'edges[i].length == 2',
      '0 <= ai <= bi < n',
      'ai != bi',
      'There are no repeated edges.'
    ],
    testCases: [
      { input: { n: 5, edges: [[0,1],[1,2],[3,4]] }, expected: 2, functionCall: 'countComponents(5, [[0,1],[1,2],[3,4]])' },
      { input: { n: 5, edges: [[0,1],[1,2],[2,3],[3,4]] }, expected: 1, functionCall: 'countComponents(5, [[0,1],[1,2],[2,3],[3,4]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
    
}`,
      python: `def countComponents(n, edges):
    pass`,
      cpp: `int countComponents(int n, vector<vector<int>>& edges) {
    
}`,
      java: `public int countComponents(int n, int[][] edges) {
    
}`
    },
    hints: ['You can use Disjoint Set Union (DSU) to solve this efficiently. Initialize n components. For each edge, if the two nodes belong to different components, union them and decrement the component count.', 'Alternatively, use DFS/BFS. Keep a `visited` array. Iterate through all nodes, and for each unvisited node, increment the component count and run a DFS/BFS to mark all reachable nodes as visited.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Amazon',
    order: 159
  },
  {
    slug: 'minimum-knight-moves',
    title: 'Minimum Knight Moves',
    difficulty: 'Medium',
    category: 'Graph',
    description: `In an **infinite** chess board with coordinates from \`-infinity\` to \`+infinity\`, you have a knight at square \`[0, 0]\`.

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Return the minimum number of steps needed to move the knight to the square \`[x, y]\`. It is guaranteed the answer exists.`,
    examples: [
      { input: 'x = 2, y = 1', output: '1', explain: '[0, 0] → [2, 1]' },
      { input: 'x = 5, y = 5', output: '4', explain: '[0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]' }
    ],
    constraints: [
      '-300 <= x, y <= 300',
      '0 <= |x| + |y| <= 300'
    ],
    testCases: [
      { input: { x: 2, y: 1 }, expected: 1, functionCall: 'minKnightMoves(2, 1)' },
      { input: { x: 5, y: 5 }, expected: 4, functionCall: 'minKnightMoves(5, 5)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
function minKnightMoves(x, y) {
    
}`,
      python: `def minKnightMoves(x, y):
    pass`,
      cpp: `int minKnightMoves(int x, int y) {
    
}`,
      java: `public int minKnightMoves(int x, int y) {
    
}`
    },
    hints: ['Due to symmetry, you can use the absolute values of x and y without affecting the answer: x = abs(x), y = abs(y).', 'Use Breadth-First Search (BFS) starting from (0, 0) to find the shortest path.', 'To avoid infinite traversal, keep track of visited squares. You only need to search in the first quadrant, but allow slightly negative coordinates (like -1 or -2) to handle edge cases.'],
    companies: ['Amazon', 'Google', 'Meta'],
    acceptance: 40,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 74,
    isFaang: true,
    topCompany: 'Amazon',
    order: 160
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
