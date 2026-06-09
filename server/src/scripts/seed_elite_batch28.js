const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'lowest-common-ancestor-of-a-binary-search-tree',
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**)."`,
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explain: 'The LCA of nodes 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explain: 'The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the BST.'
    ],
    testCases: [
      { input: { root: [6,2,8,0,4,7,9,null,null,3,5], p: 2, q: 8 }, expected: 6, functionCall: 'runLCABST([6,2,8,0,4,7,9,null,null,3,5], 2, 8)' },
      { input: { root: [6,2,8,0,4,7,9,null,null,3,5], p: 2, q: 4 }, expected: 2, functionCall: 'runLCABST([6,2,8,0,4,7,9,null,null,3,5], 2, 4)' }
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
function runLCABST(rootArr, pVal, qVal) {
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
    hints: ['If both p and q are smaller than the root, then the LCA must be in the left subtree.', 'If both p and q are greater than the root, then the LCA must be in the right subtree.', 'If p and q are on both sides of the root, then the root is the LCA.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 64,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 92,
    isFaang: true,
    topCompany: 'Amazon',
    order: 136
  },
  {
    slug: 'convert-sorted-array-to-binary-search-tree',
    title: 'Convert Sorted Array to Binary Search Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given an integer array \`nums\` where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.`,
    examples: [
      { input: 'nums = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]', explain: '[0,-10,5,null,-3,null,9] is also accepted.' },
      { input: 'nums = [1,3]', output: '[3,1]', explain: '[1,null,3] and [3,1] are both height-balanced BSTs.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums is sorted in a strictly increasing order.'
    ],
    testCases: [
      { input: { nums: [-10,-3,0,5,9] }, expected: [0,-3,9,-10,null,5], functionCall: 'runSortedArrayToBST([-10,-3,0,5,9])' },
      { input: { nums: [1,3] }, expected: [3,1], functionCall: 'runSortedArrayToBST([1,3])' }
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
    
}

function runSortedArrayToBST(nums) {
    return binaryTreeToArray(sortedArrayToBST(nums));
}`,
      python: `def sortedArrayToBST(nums):
    pass`,
      cpp: `TreeNode* sortedArrayToBST(vector<int>& nums) {
    
}`,
      java: `public TreeNode sortedArrayToBST(int[] nums) {
    
}`
    },
    hints: ['To create a height-balanced BST, pick the middle element of the sorted array as the root.', 'Recursively do the same for the left half of the array to create the left subtree, and for the right half to create the right subtree.'],
    companies: ['Amazon', 'Meta', 'Apple'],
    acceptance: 71,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 137
  },
  {
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true', explain: '' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explain: 'The root node\'s value is 5 but its right child\'s value is 4.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    testCases: [
      { input: { root: [2,1,3] }, expected: true, functionCall: 'isValidBST(createBinaryTree([2,1,3]))' },
      { input: { root: [5,1,4,null,null,3,6] }, expected: false, functionCall: 'isValidBST(createBinaryTree([5,1,4,null,null,3,6]))' },
      { input: { root: [2,2,2] }, expected: false, functionCall: 'isValidBST(createBinaryTree([2,2,2]))' }
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
 * @return {boolean}
 */
function isValidBST(root) {
    
}`,
      python: `def isValidBST(root):
    pass`,
      cpp: `bool isValidBST(TreeNode* root) {
    
}`,
      java: `public boolean isValidBST(TreeNode root) {
    
}`
    },
    hints: ['If you do an in-order traversal of a valid BST, the resulting array should be strictly increasing.', 'Alternatively, use a DFS and pass down the valid range [min, max] for each node. If a node violates this range, return false.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 32,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 138
  },
  {
    slug: 'kth-smallest-element-in-a-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return the \`k^{th}\` smallest value (**1-indexed**) of all the values of the nodes in the tree.`,
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1', explain: '' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is n.',
      '1 <= k <= n <= 10^4',
      '0 <= Node.val <= 10^4'
    ],
    testCases: [
      { input: { root: [3,1,4,null,2], k: 1 }, expected: 1, functionCall: 'kthSmallest(createBinaryTree([3,1,4,null,2]), 1)' },
      { input: { root: [5,3,6,2,4,null,null,1], k: 3 }, expected: 3, functionCall: 'kthSmallest(createBinaryTree([5,3,6,2,4,null,null,1]), 3)' }
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
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    
}`,
      python: `def kthSmallest(root, k):
    pass`,
      cpp: `int kthSmallest(TreeNode* root, int k) {
    
}`,
      java: `public int kthSmallest(TreeNode root, int k) {
    
}`
    },
    hints: ['Try an in-order traversal (Left -> Root -> Right).', 'The in-order traversal of a BST visits the nodes in ascending order.', 'Keep a counter and increment it each time you visit a node. When the counter reaches k, return that node\'s value.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 71,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 139
  },
  {
    slug: 'inorder-successor-in-bst',
    title: 'Inorder Successor in BST',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary search tree and a node \`p\` in it, return the in-order successor of that node in the BST. If the given node has no in-order successor in the tree, return \`null\`.

The successor of a node \`p\` is the node with the smallest key greater than \`p.val\`.`,
    examples: [
      { input: 'root = [2,1,3], p = 1', output: '2', explain: '1\'s in-order successor node is 2. Note that both p and the return value is of TreeNode type.' },
      { input: 'root = [5,3,6,2,4,null,null,1], p = 6', output: 'null', explain: 'There is no in-order successor of the current node, so the answer is null.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-10^5 <= Node.val <= 10^5',
      'All Nodes will have unique values.'
    ],
    testCases: [
      { input: { root: [2,1,3], p: 1 }, expected: 2, functionCall: 'runInorderSuccessor([2,1,3], 1)' },
      { input: { root: [5,3,6,2,4,null,null,1], p: 6 }, expected: null, functionCall: 'runInorderSuccessor([5,3,6,2,4,null,null,1], 6)' }
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
 * @return {TreeNode}
 */
function inorderSuccessor(root, p) {
    
}

function runInorderSuccessor(rootArr, pVal) {
    let root = createBinaryTree(rootArr);
    let pNode = findNode(root, pVal);
    let res = inorderSuccessor(root, pNode);
    return res ? res.val : null;
}`,
      python: `def inorderSuccessor(root, p):
    pass`,
      cpp: `TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
    
}`,
      java: `public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
    
}`
    },
    hints: ['If the node has a right child, then its inorder successor is simply the node with the minimum value in that right subtree.', 'If the node has no right child, then its inorder successor is somewhere above it in the tree. We can search from the root, keeping track of the last node we went left from.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 49,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 140
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
