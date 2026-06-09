const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**)."`,
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', explain: 'The LCA of nodes 5 and 1 is 3.' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5', explain: 'The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the tree.'
    ],
    testCases: [
      { input: { root: [3,5,1,6,2,0,8,null,null,7,4], p: 5, q: 1 }, expected: 3, functionCall: 'runLCA([3,5,1,6,2,0,8,null,null,7,4], 5, 1)' },
      { input: { root: [3,5,1,6,2,0,8,null,null,7,4], p: 5, q: 4 }, expected: 5, functionCall: 'runLCA([3,5,1,6,2,0,8,null,null,7,4], 5, 4)' }
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    
}

// Wrapper to help with testing
function runLCA(rootArr, pVal, qVal) {
    let root = createBinaryTree(rootArr);
    let pNode = findNode(root, pVal);
    let qNode = findNode(root, qVal);
    let res = lowestCommonAncestor(root, pNode, qNode);
    return res ? res.val : null;
}`,
      python: `def lowestCommonAncestor(root, p, q):
    pass`,
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    
}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    
}`
    },
    hints: ['If the current (sub)tree contains both p and q, then the current node is their LCA.', 'Recursively check the left and right subtrees. If left and right subtrees both return non-null, the current node is the LCA.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 60,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Amazon',
    order: 126
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
    order: 127
  },
  {
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.`,
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]', explain: '' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]', explain: '' }
    ],
    constraints: [
      '1 <= preorder.length <= 3000',
      'inorder.length == preorder.length',
      '-3000 <= preorder[i], inorder[i] <= 3000',
      'preorder and inorder consist of unique values.',
      'Each value of inorder also appears in preorder.',
      'preorder is guaranteed to be the preorder traversal of the tree.',
      'inorder is guaranteed to be the inorder traversal of the tree.'
    ],
    testCases: [
      { input: { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7] }, expected: [3,9,20,null,null,15,7], functionCall: 'runBuildTree([3,9,20,15,7], [9,3,15,20,7])' },
      { input: { preorder: [-1], inorder: [-1] }, expected: [-1], functionCall: 'runBuildTree([-1], [-1])' }
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
    
}

function runBuildTree(preorder, inorder) {
    let res = buildTree(preorder, inorder);
    return binaryTreeToArray(res);
}`,
      python: `def buildTree(preorder, inorder):
    pass`,
      cpp: `TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    
}`,
      java: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    
}`
    },
    hints: ['The first element in preorder is always the root.', 'Find the root in inorder. The elements to its left belong to the left subtree, and elements to its right belong to the right subtree.', 'Use a HashMap to quickly find the index of the root in the inorder traversal.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Amazon',
    order: 128
  },
  {
    slug: 'path-sum',
    title: 'Path Sum',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return \`true\` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals \`targetSum\`.

A **leaf** is a node with no children.`,
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true', explain: 'The root-to-leaf path with the target sum is shown.' },
      { input: 'root = [1,2,3], targetSum = 5', output: 'false', explain: 'There two root-to-leaf paths in the tree:\n(1 --> 2): The sum is 3.\n(1 --> 3): The sum is 4.\nThere is no root-to-leaf path with sum = 5.' },
      { input: 'root = [], targetSum = 0', output: 'false', explain: 'Since the tree is empty, there are no root-to-leaf paths.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000'
    ],
    testCases: [
      { input: { root: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum: 22 }, expected: true, functionCall: 'hasPathSum(createBinaryTree([5,4,8,11,null,13,4,7,2,null,null,null,1]), 22)' },
      { input: { root: [1,2,3], targetSum: 5 }, expected: false, functionCall: 'hasPathSum(createBinaryTree([1,2,3]), 5)' },
      { input: { root: [], targetSum: 0 }, expected: false, functionCall: 'hasPathSum(createBinaryTree([]), 0)' }
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
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
    
}`,
      python: `def hasPathSum(root, targetSum):
    pass`,
      cpp: `bool hasPathSum(TreeNode* root, int targetSum) {
    
}`,
      java: `public boolean hasPathSum(TreeNode root, int targetSum) {
    
}`
    },
    hints: ['Use recursion. For a given node, its target sum becomes targetSum - node.val.', 'A node is a leaf if it has no left and right children. When you reach a leaf, check if targetSum - node.val == 0.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 50,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 129
  },
  {
    slug: 'path-sum-ii',
    title: 'Path Sum II',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return all **root-to-leaf** paths where the sum of the node values in the path equals \`targetSum\`. Each path should be returned as a list of the node **values**, not node references.

A **root-to-leaf** path is a path starting from the root and ending at any leaf node. A **leaf** is a node with no children.`,
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '[[5,4,11,2],[5,8,4,5]]', explain: '' },
      { input: 'root = [1,2,3], targetSum = 5', output: '[]', explain: '' },
      { input: 'root = [1,2], targetSum = 0', output: '[]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000].',
      '-1000 <= Node.val <= 1000',
      '-1000 <= targetSum <= 1000'
    ],
    testCases: [
      { input: { root: [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum: 22 }, expected: [[5,4,11,2],[5,8,4,5]], functionCall: 'pathSum(createBinaryTree([5,4,8,11,null,13,4,7,2,null,null,5,1]), 22)' },
      { input: { root: [1,2,3], targetSum: 5 }, expected: [], functionCall: 'pathSum(createBinaryTree([1,2,3]), 5)' },
      { input: { root: [1,2], targetSum: 0 }, expected: [], functionCall: 'pathSum(createBinaryTree([1,2]), 0)' }
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
 * @return {number[][]}
 */
function pathSum(root, targetSum) {
    
}`,
      python: `def pathSum(root, targetSum):
    pass`,
      cpp: `vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
    
}`,
      java: `public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
    
}`
    },
    hints: ['Similar to Path Sum I, but you need to keep track of the current path.', 'Use backtracking. Append the node to the path, recursively call for children, and then pop the node from the path.'],
    companies: ['Amazon', 'Bloomberg', 'Microsoft'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 130
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
