const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'maximum-width-of-binary-tree',
    title: 'Maximum Width of Binary Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, return the **maximum width** of the given tree.

The **maximum width** of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is **guaranteed** that the answer will in the range of a **32-bit signed integer**.`,
    examples: [
      { input: 'root = [1,3,2,5,3,null,9]', output: '4', explain: 'The maximum width exists in the third level with length 4 (5,3,null,9).' },
      { input: 'root = [1,3,2,5,null,null,9,6,null,7]', output: '7', explain: 'The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7).' },
      { input: 'root = [1,3,2,5]', output: '2', explain: 'The maximum width exists in the second level with length 2 (3,2).' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 3000].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [1,3,2,5,3,null,9] }, expected: 4, functionCall: 'widthOfBinaryTree(createBinaryTree([1,3,2,5,3,null,9]))' },
      { input: { root: [1,3,2,5,null,null,9,6,null,7] }, expected: 7, functionCall: 'widthOfBinaryTree(createBinaryTree([1,3,2,5,null,null,9,6,null,7]))' },
      { input: { root: [1,3,2,5] }, expected: 2, functionCall: 'widthOfBinaryTree(createBinaryTree([1,3,2,5]))' }
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
function widthOfBinaryTree(root) {
    
}`,
      python: `def widthOfBinaryTree(root):
    pass`,
      cpp: `int widthOfBinaryTree(TreeNode* root) {
    
}`,
      java: `public int widthOfBinaryTree(TreeNode root) {
    
}`
    },
    hints: ['Can you use Level Order Traversal (BFS)?', 'Give each node an index. If a node has index i, its left child has index 2*i and its right child has index 2*i+1.', 'The width of a level is the index of the last node - the index of the first node + 1. Be careful of integer overflow!'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 42,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 131
  },
  {
    slug: 'binary-tree-zigzag-level-order-traversal',
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]', explain: '' },
      { input: 'root = [1]', output: '[[1]]', explain: '' },
      { input: 'root = []', output: '[]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: [[3],[20,9],[15,7]], functionCall: 'zigzagLevelOrder(createBinaryTree([3,9,20,null,null,15,7]))' },
      { input: { root: [1] }, expected: [[1]], functionCall: 'zigzagLevelOrder(createBinaryTree([1]))' },
      { input: { root: [] }, expected: [], functionCall: 'zigzagLevelOrder(createBinaryTree([]))' }
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
 * @return {number[][]}
 */
function zigzagLevelOrder(root) {
    
}`,
      python: `def zigzagLevelOrder(root):
    pass`,
      cpp: `vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    
}`,
      java: `public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    
}`
    },
    hints: ['Perform a standard BFS level order traversal using a queue.', 'Keep a boolean flag to indicate the direction (left-to-right or right-to-left) and reverse the level\'s array if needed before appending it to the result.'],
    companies: ['Amazon', 'Microsoft', 'LinkedIn'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 132
  },
  {
    slug: 'path-sum-iii',
    title: 'Path Sum III',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return the number of paths where the sum of the values along the path equals \`targetSum\`.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).`,
    examples: [
      { input: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8', output: '3', explain: 'The paths that sum to 8 are:\n1.  5 -> 3\n2.  5 -> 2 -> 1\n3. -3 -> 11' },
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '3', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 1000].',
      '-10^9 <= Node.val <= 10^9',
      '-1000 <= targetSum <= 1000'
    ],
    testCases: [
      { input: { root: [10,5,-3,3,2,null,11,3,-2,null,1], targetSum: 8 }, expected: 3, functionCall: 'pathSum(createBinaryTree([10,5,-3,3,2,null,11,3,-2,null,1]), 8)' },
      { input: { root: [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum: 22 }, expected: 3, functionCall: 'pathSum(createBinaryTree([5,4,8,11,null,13,4,7,2,null,null,5,1]), 22)' }
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
 * @param {number} targetSum
 * @return {number}
 */
function pathSum(root, targetSum) {
    
}`,
      python: `def pathSum(root, targetSum):
    pass`,
      cpp: `int pathSum(TreeNode* root, int targetSum) {
    
}`,
      java: `public int pathSum(TreeNode root, int targetSum) {
    
}`
    },
    hints: ['To achieve optimal O(N) time, use a Hash Map to store the prefix sums and their frequencies as you traverse down the tree.', 'As you traverse, the number of valid paths ending at the current node is map[current_sum - targetSum]. Remember to backtrack and remove the current sum from the map before returning.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 47,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 133
  },
  {
    slug: 'all-nodes-distance-k-in-binary-tree',
    title: 'All Nodes Distance K in Binary Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, the value of a target node \`target\`, and an integer \`k\`, return an array of the values of all nodes that have a distance \`k\` from the target node.

You can return the answer in **any order**.`,
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2', output: '[7,4,1]', explain: 'The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.' },
      { input: 'root = [1], target = 1, k = 3', output: '[]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 500].',
      '0 <= Node.val <= 500',
      'All the values Node.val are unique.',
      'target is the value of one of the nodes in the tree.',
      '0 <= k <= 1000'
    ],
    testCases: [
      { input: { root: [3,5,1,6,2,0,8,null,null,7,4], target: 5, k: 2 }, expected: [7,4,1], functionCall: 'runDistanceK([3,5,1,6,2,0,8,null,null,7,4], 5, 2)' },
      { input: { root: [1], target: 1, k: 3 }, expected: [], functionCall: 'runDistanceK([1], 1, 3)' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
function distanceK(root, target, k) {
    
}

// Wrapper for testing
function runDistanceK(rootArr, targetVal, k) {
    let root = createBinaryTree(rootArr);
    let target = findNode(root, targetVal);
    let res = distanceK(root, target, k);
    return res ? res.sort((a,b)=>a-b) : [];
}`,
      python: `def distanceK(root, target, k):
    pass`,
      cpp: `vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
    
}`,
      java: `public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
    
}`
    },
    hints: ['If you had parent pointers for each node, you could treat this as a graph problem.', 'Do a DFS to map each node to its parent.', 'Then, start a BFS from the target node, exploring children and the parent. Keep track of visited nodes and stop when you reach distance K.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 63,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 134
  },
  {
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    category: 'Tree',
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the maximum **path sum** of any **non-empty** path.`,
    examples: [
      { input: 'root = [1,2,3]', output: '6', explain: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.' },
      { input: 'root = [-10,9,20,null,null,15,7]', output: '42', explain: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    testCases: [
      { input: { root: [1,2,3] }, expected: 6, functionCall: 'maxPathSum(createBinaryTree([1,2,3]))' },
      { input: { root: [-10,9,20,null,null,15,7] }, expected: 42, functionCall: 'maxPathSum(createBinaryTree([-10,9,20,null,null,15,7]))' }
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
function maxPathSum(root) {
    
}`,
      python: `def maxPathSum(root):
    pass`,
      cpp: `int maxPathSum(TreeNode* root) {
    
}`,
      java: `public int maxPathSum(TreeNode root) {
    
}`
    },
    hints: ['To find the maximum path sum, you need to compute the maximum contribution of each node to a path.', 'Use a post-order traversal (DFS). For each node, calculate the max path sum that extends through its left child and right child.', 'Update a global maximum with `node.val + left_max + right_max`. Return `node.val + max(left_max, right_max)` to its parent.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 39,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Meta',
    order: 135
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
