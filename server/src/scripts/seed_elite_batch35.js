const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'pacific-atlantic-water-flow',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    category: 'Graph',
    description: `There is an \`m x n\` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an \`m x n\` integer matrix \`heights\` where \`heights[r][c]\` represents the **height above sea level** of the cell at coordinate \`(r, c)\`.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a **2D list** of grid coordinates \`result\` where \`result[i] = [ri, ci]\` denotes that rain water can flow from cell \`(ri, ci)\` to **both** the Pacific and Atlantic oceans.`,
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]', explain: 'The cells from which water can flow to both oceans are shown.' },
      { input: 'heights = [[1]]', output: '[[0,0]]', explain: 'The water can flow from the only cell to the Pacific and Atlantic oceans.' }
    ],
    constraints: [
      'm == heights.length',
      'n == heights[r].length',
      '1 <= m, n <= 200',
      '0 <= heights[r][c] <= 10^5'
    ],
    testCases: [
      { input: { heights: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] }, expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]], functionCall: 'runPacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])' },
      { input: { heights: [[1]] }, expected: [[0,0]], functionCall: 'runPacificAtlantic([[1]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
    
}

function runPacificAtlantic(heights) {
    let res = pacificAtlantic(heights);
    return res.sort((a,b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
}`,
      python: `def pacificAtlantic(heights):
    pass`,
      cpp: `vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    
}`,
      java: `public List<List<Integer>> pacificAtlantic(int[][] heights) {
    
}`
    },
    hints: ['Instead of starting from each cell and trying to reach the ocean, start from the ocean and see which cells you can reach.', 'You can run DFS or BFS from all cells adjacent to the Pacific Ocean, going from lower height to higher height. Do the same for the Atlantic Ocean.', 'The answer is the intersection of cells that can reach the Pacific and cells that can reach the Atlantic.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Google',
    order: 171
  },
  {
    slug: 'reconstruct-itinerary',
    title: 'Reconstruct Itinerary',
    difficulty: 'Hard',
    category: 'Graph',
    description: `You are given a list of airline \`tickets\` where \`tickets[i] = [fromi, toi]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

*   For example, the itinerary \`["JFK", "LGA"]\` has a smaller lexical order than \`["JFK", "LGB"]\`.

You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.`,
    examples: [
      { input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]', explain: '' },
      { input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]', output: '["JFK","ATL","JFK","SFO","ATL","SFO"]', explain: 'Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.' }
    ],
    constraints: [
      '1 <= tickets.length <= 300',
      'tickets[i].length == 2',
      'fromi.length == 3',
      'toi.length == 3',
      'fromi and toi consist of uppercase English letters.',
      'fromi != toi'
    ],
    testCases: [
      { input: { tickets: [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]] }, expected: ["JFK","MUC","LHR","SFO","SJC"], functionCall: 'findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]])' },
      { input: { tickets: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]] }, expected: ["JFK","ATL","JFK","SFO","ATL","SFO"], functionCall: 'findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
function findItinerary(tickets) {
    
}`,
      python: `def findItinerary(tickets):
    pass`,
      cpp: `vector<string> findItinerary(vector<vector<string>>& tickets) {
    
}`,
      java: `public List<String> findItinerary(List<List<String>> tickets) {
    
}`
    },
    hints: ['This is an Eulerian path problem on a directed graph.', 'Build an adjacency list and sort the destinations for each airport in lexical order.', 'Use Hierholzer\'s Algorithm (post-order DFS). When you get stuck, add the airport to the route, and then reverse the route at the end.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 42,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Amazon',
    order: 172
  },
  {
    slug: 'is-graph-bipartite',
    title: 'Is Graph Bipartite?',
    difficulty: 'Medium',
    category: 'Graph',
    description: `There is an **undirected** graph with \`n\` nodes, where each node is numbered between \`0\` and \`n - 1\`. You are given a 2D array \`graph\`, where \`graph[u]\` is an array of nodes that node \`u\` is adjacent to. More formally, for each \`v\` in \`graph[u]\`, there is an undirected edge between node \`u\` and node \`v\`. The graph has the following properties:

*   There are no self-edges (\`graph[u]\` does not contain \`u\`).
*   There are no parallel edges (\`graph[u]\` does not contain duplicate values).
*   If \`v\` is in \`graph[u]\`, then \`u\` is in \`graph[v]\` (the graph is undirected).
*   The graph may not be connected, meaning there may be two nodes \`u\` and \`v\` such that there is no path between them.

A graph is **bipartite** if the nodes can be partitioned into two independent sets \`A\` and \`B\` such that **every** edge in the graph connects a node in set \`A\` and a node in set \`B\`.

Return \`true\` if and only if it is **bipartite**.`,
    examples: [
      { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false', explain: 'There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.' },
      { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true', explain: 'We can partition the nodes into two sets: {0, 2} and {1, 3}.' }
    ],
    constraints: [
      'graph.length == n',
      '1 <= n <= 100',
      '0 <= graph[u].length < n',
      '0 <= graph[u][i] <= n - 1',
      'graph[u] does not contain u.',
      'All the values of graph[u] are unique.',
      'If graph[u] contains v, then graph[v] contains u.'
    ],
    testCases: [
      { input: { graph: [[1,2,3],[0,2],[0,1,3],[0,2]] }, expected: false, functionCall: 'isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])' },
      { input: { graph: [[1,3],[0,2],[1,3],[0,2]] }, expected: true, functionCall: 'isBipartite([[1,3],[0,2],[1,3],[0,2]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} graph
 * @return {boolean}
 */
function isBipartite(graph) {
    
}`,
      python: `def isBipartite(graph):
    pass`,
      cpp: `bool isBipartite(vector<vector<int>>& graph) {
    
}`,
      java: `public boolean isBipartite(int[][] graph) {
    
}`
    },
    hints: ['Graph coloring! Use an array to keep track of colors assigned to each node (-1 for uncolored, 0 for color A, 1 for color B).', 'Use DFS or BFS to traverse the graph. When you visit a node, color it with the opposite color of its parent.', 'If you visit a node that is already colored with the same color as its parent, the graph is not bipartite. Remember the graph might be disconnected, so check all nodes.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Meta',
    order: 173
  },
  {
    slug: 'find-eventual-safe-states',
    title: 'Find Eventual Safe States',
    difficulty: 'Medium',
    category: 'Graph',
    description: `There is a directed graph of \`n\` nodes with each node labeled from \`0\` to \`n - 1\`. The graph is represented by a **0-indexed** 2D integer array \`graph\` where \`graph[i]\` is an integer array of nodes adjacent to node \`i\`, meaning there is an edge from node \`i\` to each node in \`graph[i]\`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a **terminal node** (or another safe node).

Return an array containing all the **safe nodes** of the graph. The answer should be sorted in **ascending order**.`,
    examples: [
      { input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]', output: '[2,4,5,6]', explain: 'The given graph is shown above.\nNodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.\nEvery path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.' },
      { input: 'graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]', output: '[4]', explain: 'Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.' }
    ],
    constraints: [
      'n == graph.length',
      '1 <= n <= 10^4',
      '0 <= graph[i].length <= n',
      '0 <= graph[i][j] <= n - 1',
      'graph[i] is sorted in a strictly increasing order.',
      'The graph may contain self-loops.',
      'The number of edges in the graph will be in the range [1, 4 * 10^4].'
    ],
    testCases: [
      { input: { graph: [[1,2],[2,3],[5],[0],[5],[],[]] }, expected: [2,4,5,6], functionCall: 'eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])' },
      { input: { graph: [[1,2,3,4],[1,2],[3,4],[0,4],[]] }, expected: [4], functionCall: 'eventualSafeNodes([[1,2,3,4],[1,2],[3,4],[0,4],[]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} graph
 * @return {number[]}
 */
function eventualSafeNodes(graph) {
    
}`,
      python: `def eventualSafeNodes(graph):
    pass`,
      cpp: `vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
    
}`,
      java: `public List<Integer> eventualSafeNodes(int[][] graph) {
    
}`
    },
    hints: ['A node is a safe node if it is not part of a cycle and no paths starting from it lead to a cycle.', 'Use DFS with 3 states (0: unvisited, 1: visiting, 2: safe). If during DFS you encounter a node in state 1, you found a cycle.', 'Alternatively, you can reverse all edges in the graph and then use Kahn\'s algorithm for topological sort starting from terminal nodes (nodes with 0 out-degree in the original graph).'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 60,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 174
  },
  {
    slug: 'k-closest-points-to-origin',
    title: 'K Closest Points to Origin',
    difficulty: 'Medium',
    category: 'Heap',
    description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the **X-Y** plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the **X-Y** plane is the Euclidean distance (i.e., \`sqrt((x1 - x2)^2 + (y1 - y2)^2)\`).

You may return the answer in **any order**. The answer is **guaranteed** to be **unique** (except for the order that it is in).`,
    examples: [
      { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]', explain: 'The distance between (1, 3) and the origin is sqrt(10).\nThe distance between (-2, 2) and the origin is sqrt(8).\nSince sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.\nWe only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]', explain: 'The answer [[-2,4],[3,3]] would also be accepted.' }
    ],
    constraints: [
      '1 <= k <= points.length <= 10^4',
      '-10^4 <= xi, yi <= 10^4'
    ],
    testCases: [
      { input: { points: [[1,3],[-2,2]], k: 1 }, expected: [[-2,2]], functionCall: 'runKClosest([[1,3],[-2,2]], 1)' },
      { input: { points: [[3,3],[5,-1],[-2,4]], k: 2 }, expected: [[-2,4],[3,3]], functionCall: 'runKClosest([[3,3],[5,-1],[-2,4]], 2)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
    
}

function runKClosest(points, k) {
    let res = kClosest(points, k);
    // Sort so it can be strictly compared in test runner
    return res.sort((a,b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
}`,
      python: `def kClosest(points, k):
    pass`,
      cpp: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    
}`,
      java: `public int[][] kClosest(int[][] points, int k) {
    
}`
    },
    hints: ['Calculate the distance (or squared distance to avoid square roots) for each point.', 'You can use a Max-Heap of size K. When the heap size exceeds K, pop the maximum element. This takes O(N log K) time.', 'Alternatively, use QuickSelect to find the Kth smallest element in O(N) average time.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 66,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Meta',
    order: 175
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
