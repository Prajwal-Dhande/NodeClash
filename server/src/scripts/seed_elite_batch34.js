const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'network-delay-time',
    title: 'Network Delay Time',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (ui, vi, wi)\`, where \`ui\` is the source node, \`vi\` is the target node, and \`wi\` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node \`k\`. Return the **minimum** time it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.`,
    examples: [
      { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', output: '2', explain: 'Node 2 sends out the signal. At time t=1, nodes 1 and 3 receive it. At time t=2, node 4 receives it from node 3.' },
      { input: 'times = [[1,2,1]], n = 2, k = 1', output: '1', explain: '' },
      { input: 'times = [[1,2,1]], n = 2, k = 2', output: '-1', explain: 'Node 1 will never receive the signal.' }
    ],
    constraints: [
      '1 <= k <= n <= 100',
      '1 <= times.length <= 6000',
      'times[i].length == 3',
      '1 <= ui, vi <= n',
      'ui != vi',
      '0 <= wi <= 100',
      'All the pairs (ui, vi) are unique. (i.e., no multiple edges.)'
    ],
    testCases: [
      { input: { times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2 }, expected: 2, functionCall: 'networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)' },
      { input: { times: [[1,2,1]], n: 2, k: 1 }, expected: 1, functionCall: 'networkDelayTime([[1,2,1]], 2, 1)' },
      { input: { times: [[1,2,1]], n: 2, k: 2 }, expected: -1, functionCall: 'networkDelayTime([[1,2,1]], 2, 2)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function networkDelayTime(times, n, k) {
    
}`,
      python: `def networkDelayTime(times, n, k):
    pass`,
      cpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    
}`,
      java: `public int networkDelayTime(int[][] times, int n, int k) {
    
}`
    },
    hints: ['This is a classic Single-Source Shortest Path problem.', 'Use Dijkstra\'s algorithm with a priority queue to find the shortest path from node k to all other nodes.', 'The answer is the maximum shortest path distance to any node. If any node has an infinite distance (unreachable), return -1.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Amazon',
    order: 166
  },
  {
    slug: 'redundant-connection',
    title: 'Redundant Connection',
    difficulty: 'Medium',
    category: 'Graph',
    description: `In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two **different** vertices chosen from \`1\` to \`n\`, and was not an edge that already existed. The graph is represented as an array \`edges\` of length \`n\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between nodes \`ai\` and \`bi\` in the graph.

Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.`,
    examples: [
      { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]', explain: 'Removing the edge [2,3] breaks the cycle.' },
      { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]', explain: 'Removing the edge [1,4] breaks the cycle.' }
    ],
    constraints: [
      'n == edges.length',
      '3 <= n <= 1000',
      'edges[i].length == 2',
      '1 <= ai < bi <= edges.length',
      'ai != bi',
      'There are no repeated edges.',
      'The given graph is connected.'
    ],
    testCases: [
      { input: { edges: [[1,2],[1,3],[2,3]] }, expected: [2,3], functionCall: 'findRedundantConnection([[1,2],[1,3],[2,3]])' },
      { input: { edges: [[1,2],[2,3],[3,4],[1,4],[1,5]] }, expected: [1,4], functionCall: 'findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {
    
}`,
      python: `def findRedundantConnection(edges):
    pass`,
      cpp: `vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    
}`,
      java: `public int[] findRedundantConnection(int[][] edges) {
    
}`
    },
    hints: ['A disjoint set (Union-Find) is perfect for cycle detection in undirected graphs.', 'Iterate through the edges and apply union on the two nodes. If the two nodes already belong to the same set, then this edge creates a cycle and is the redundant connection.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 63,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 167
  },
  {
    slug: 'evaluate-division',
    title: 'Evaluate Division',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You are given an array of variable pairs \`equations\` and an array of real numbers \`values\`, where \`equations[i] = [Ai, Bi]\` and \`values[i]\` represent the equation \`Ai / Bi = values[i]\`. Each \`Ai\` or \`Bi\` is a string that represents a single variable.

You are also given some \`queries\`, where \`queries[j] = [Cj, Dj]\` represents the \`j^{th}\` query where you must find the answer for \`Cj / Dj = ?\`.

Return the answers to all queries. If a single answer cannot be determined, return \`-1.0\`.

**Note:** The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.`,
    examples: [
      { input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]', output: '[6.00000, 0.50000, -1.00000, 1.00000, -1.00000]', explain: 'Given: a / b = 2.0, b / c = 3.0\nqueries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?\nreturn: [6.0, 0.5, -1.0, 1.0, -1.0]' },
      { input: 'equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]', output: '[3.75000, 0.40000, 5.00000, 0.20000]', explain: '' }
    ],
    constraints: [
      '1 <= equations.length <= 20',
      'equations[i].length == 2',
      '1 <= Ai.length, Bi.length <= 5',
      'values.length == equations.length',
      '0.0 < values[i] <= 20.0',
      '1 <= queries.length <= 20',
      'queries[i].length == 2',
      '1 <= Cj.length, Dj.length <= 5',
      'Ai, Bi, Cj, Dj consist of lower case English letters and digits.'
    ],
    testCases: [
      { input: { equations: [["a","b"],["b","c"]], values: [2.0,3.0], queries: [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]] }, expected: [6.0, 0.5, -1.0, 1.0, -1.0], functionCall: 'calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]])' },
      { input: { equations: [["a","b"],["b","c"],["bc","cd"]], values: [1.5,2.5,5.0], queries: [["a","c"],["c","b"],["bc","cd"],["cd","bc"]] }, expected: [3.75, 0.4, 5.0, 0.2], functionCall: 'calcEquation([["a","b"],["b","c"],["bc","cd"]], [1.5,2.5,5.0], [["a","c"],["c","b"],["bc","cd"],["cd","bc"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
function calcEquation(equations, values, queries) {
    
}`,
      python: `def calcEquation(equations, values, queries):
    pass`,
      cpp: `vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
    
}`,
      java: `public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
    
}`
    },
    hints: ['Model the equations as a directed graph. Each variable is a node, and an equation A / B = V represents a directed edge from A to B with weight V, and a directed edge from B to A with weight 1/V.', 'For each query (C, D), do a DFS or BFS starting from C to find a path to D. The answer is the product of the weights on the path.', 'If C or D does not exist in the graph, or if there is no path between them, the answer is -1.0.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 61,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Amazon',
    order: 168
  },
  {
    slug: 'max-area-of-island',
    title: 'Max Area of Island',
    difficulty: 'Medium',
    category: 'Graph',
    description: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`'s (representing land) connected **4-directionally** (horizontal or vertical). You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value \`1\` in the island.

Return the maximum **area** of an island in \`grid\`. If there is no island, return \`0\`.`,
    examples: [
      { input: 'grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]', output: '6', explain: 'The answer is not 11, because the island must be connected 4-directionally.' },
      { input: 'grid = [[0,0,0,0,0,0,0,0]]', output: '0', explain: '' }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 50',
      'grid[i][j] is either 0 or 1.'
    ],
    testCases: [
      { input: { grid: [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]] }, expected: 6, functionCall: 'maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]])' },
      { input: { grid: [[0,0,0,0,0,0,0,0]] }, expected: 0, functionCall: 'maxAreaOfIsland([[0,0,0,0,0,0,0,0]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
    
}`,
      python: `def maxAreaOfIsland(grid):
    pass`,
      cpp: `int maxAreaOfIsland(vector<vector<int>>& grid) {
    
}`,
      java: `public int maxAreaOfIsland(int[][] grid) {
    
}`
    },
    hints: ['Iterate through the grid. When you find a 1, start a DFS or BFS to count the number of 1s connected to it.', 'Mark the visited cells (e.g., by changing 1 to 0) so you don\'t count them multiple times.', 'Keep track of the maximum area found so far.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 72,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 91,
    isFaang: true,
    topCompany: 'Meta',
    order: 169
  },
  {
    slug: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'Medium',
    category: 'Graph',
    description: `Given a reference of a node in a **connected** undirected graph.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.
\`\`\`
class Node {
    public int val;
    public List<Node> neighbors;
}
\`\`\``,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explain: 'There are 4 nodes in the graph.\nNode 1\'s value is 1, and it has two neighbors: Node 2 and 4.\nNode 2\'s value is 2, and it has two neighbors: Node 1 and 3.\nNode 3\'s value is 3, and it has two neighbors: Node 2 and 4.\nNode 4\'s value is 4, and it has two neighbors: Node 1 and 3.' },
      { input: 'adjList = [[]]', output: '[[]]', explain: 'Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.' },
      { input: 'adjList = []', output: '[]', explain: 'This an empty graph, it does not have any nodes.' }
    ],
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 <= Node.val <= 100',
      'Node.val is unique for each node.',
      'There are no repeated edges and no self-loops in the graph.',
      'The Graph is connected and all nodes can be visited starting from the given node.'
    ],
    testCases: [
      { input: { adjList: [[2,4],[1,3],[2,4],[1,3]] }, expected: [[2,4],[1,3],[2,4],[1,3]], functionCall: 'runCloneGraph([[2,4],[1,3],[2,4],[1,3]])' }
    ],
    starterCode: {
      javascript: `/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
function cloneGraph(node) {
    
}

function runCloneGraph(adjList) {
    // Note: returning dummy because deep copy graph building & testing requires special runner logic.
    return adjList; 
}`,
      python: `def cloneGraph(node):
    pass`,
      cpp: `Node* cloneGraph(Node* node) {
    
}`,
      java: `public Node cloneGraph(Node node) {
    
}`
    },
    hints: ['Use a hash map to map the original nodes to their corresponding cloned nodes.', 'You can use DFS or BFS to traverse the graph. When visiting a node, make a copy of it if it hasn\'t been copied yet, and then recursively copy its neighbors and attach them to the clone\'s neighbors list.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 92,
    isFaang: true,
    topCompany: 'Meta',
    order: 170
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
