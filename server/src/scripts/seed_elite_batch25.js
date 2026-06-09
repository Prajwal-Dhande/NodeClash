const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, return the length of the **diameter** of the tree.

The **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the \`root\`.

The length of a path between two nodes is represented by the number of edges between them.`,
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3', explain: '3 is the length of the path [4,2,1,3] or [5,2,1,3].' },
      { input: 'root = [1,2]', output: '1', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [1,2,3,4,5] }, expected: 3, functionCall: 'diameterOfBinaryTree(createBinaryTree([1,2,3,4,5]))' },
      { input: { root: [1,2] }, expected: 1, functionCall: 'diameterOfBinaryTree(createBinaryTree([1,2]))' }
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
function diameterOfBinaryTree(root) {
    
}`,
      python: `def diameterOfBinaryTree(root):
    pass`,
      cpp: `int diameterOfBinaryTree(TreeNode* root) {
    
}`,
      java: `public int diameterOfBinaryTree(TreeNode root) {
    
}`
    },
    hints: ['The diameter of a tree T is the largest of the following quantities: the diameter of T\'s left subtree, the diameter of T\'s right subtree, or the longest path between leaves that goes through the root of T.', 'The longest path that goes through the root is the height of the left subtree + the height of the right subtree.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Amazon',
    order: 121
  },
  {
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3', explain: '' },
      { input: 'root = [1,null,2]', output: '2', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: 3, functionCall: 'maxDepth(createBinaryTree([3,9,20,null,null,15,7]))' },
      { input: { root: [1,null,2] }, expected: 2, functionCall: 'maxDepth(createBinaryTree([1,null,2]))' },
      { input: { root: [] }, expected: 0, functionCall: 'maxDepth(createBinaryTree([]))' }
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
function maxDepth(root) {
    
}`,
      python: `def maxDepth(root):
    pass`,
      cpp: `int maxDepth(TreeNode* root) {
    
}`,
      java: `public int maxDepth(TreeNode root) {
    
}`
    },
    hints: ['If the tree is empty, the depth is 0.', 'Otherwise, the depth is 1 + the maximum of the depths of the left and right subtrees.'],
    companies: ['Amazon', 'Microsoft', 'LinkedIn'],
    acceptance: 75,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 122
  },
  {
    slug: 'same-tree',
    title: 'Same Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true', explain: '' },
      { input: 'p = [1,2], q = [1,null,2]', output: 'false', explain: '' },
      { input: 'p = [1,2,1], q = [1,1,2]', output: 'false', explain: '' }
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].',
      '-10^4 <= Node.val <= 10^4'
    ],
    testCases: [
      { input: { p: [1,2,3], q: [1,2,3] }, expected: true, functionCall: 'isSameTree(createBinaryTree([1,2,3]), createBinaryTree([1,2,3]))' },
      { input: { p: [1,2], q: [1,null,2] }, expected: false, functionCall: 'isSameTree(createBinaryTree([1,2]), createBinaryTree([1,null,2]))' },
      { input: { p: [1,2,1], q: [1,1,2] }, expected: false, functionCall: 'isSameTree(createBinaryTree([1,2,1]), createBinaryTree([1,1,2]))' }
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
    
}`,
      python: `def isSameTree(p, q):
    pass`,
      cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {
    
}`,
      java: `public boolean isSameTree(TreeNode p, TreeNode q) {
    
}`
    },
    hints: ['If both trees are null, they are the same.', 'If only one is null, they are different.', 'If their values are different, they are different.', 'Otherwise, recursively check the left subtrees and right subtrees.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 60,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 123
  },
  {
    slug: 'symmetric-tree',
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).`,
    examples: [
      { input: 'root = [1,2,2,3,4,4,3]', output: 'true', explain: '' },
      { input: 'root = [1,2,2,null,3,null,3]', output: 'false', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 1000].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [1,2,2,3,4,4,3] }, expected: true, functionCall: 'isSymmetric(createBinaryTree([1,2,2,3,4,4,3]))' },
      { input: { root: [1,2,2,null,3,null,3] }, expected: false, functionCall: 'isSymmetric(createBinaryTree([1,2,2,null,3,null,3]))' }
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
function isSymmetric(root) {
    
}`,
      python: `def isSymmetric(root):
    pass`,
      cpp: `bool isSymmetric(TreeNode* root) {
    
}`,
      java: `public boolean isSymmetric(TreeNode root) {
    
}`
    },
    hints: ['Two trees are a mirror reflection of each other if their roots have the same value, and the right subtree of each tree is a mirror reflection of the left subtree of the other tree.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 55,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 124
  },
  {
    slug: 'subtree-of-another-tree',
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.

A subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.`,
    examples: [
      { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true', explain: '' },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false', explain: '' }
    ],
    constraints: [
      'The number of nodes in the root tree is in the range [1, 2000].',
      'The number of nodes in the subRoot tree is in the range [1, 1000].',
      '-10^4 <= root.val <= 10^4',
      '-10^4 <= subRoot.val <= 10^4'
    ],
    testCases: [
      { input: { root: [3,4,5,1,2], subRoot: [4,1,2] }, expected: true, functionCall: 'isSubtree(createBinaryTree([3,4,5,1,2]), createBinaryTree([4,1,2]))' },
      { input: { root: [3,4,5,1,2,null,null,null,null,0], subRoot: [4,1,2] }, expected: false, functionCall: 'isSubtree(createBinaryTree([3,4,5,1,2,null,null,null,null,0]), createBinaryTree([4,1,2]))' }
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
    
}`,
      python: `def isSubtree(root, subRoot):
    pass`,
      cpp: `bool isSubtree(TreeNode* root, TreeNode* subRoot) {
    
}`,
      java: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    
}`
    },
    hints: ['Can you find a node in the main tree that is the root of the subRoot?', 'You can use a helper function that checks if two trees are exactly the same. Then recursively check if subRoot is the same as the root, the left subtree, or the right subtree.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 47,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 91,
    isFaang: true,
    topCompany: 'Amazon',
    order: 125
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
