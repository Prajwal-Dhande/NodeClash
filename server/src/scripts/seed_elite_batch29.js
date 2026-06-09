const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'construct-binary-tree-from-inorder-and-postorder-traversal',
    title: 'Construct Binary Tree from Inorder and Postorder Traversal',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given two integer arrays \`inorder\` and \`postorder\` where \`inorder\` is the inorder traversal of a binary tree and \`postorder\` is the postorder traversal of the same tree, construct and return the binary tree.`,
    examples: [
      { input: 'inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]', output: '[3,9,20,null,null,15,7]', explain: '' },
      { input: 'inorder = [-1], postorder = [-1]', output: '[-1]', explain: '' }
    ],
    constraints: [
      '1 <= inorder.length <= 3000',
      'postorder.length == inorder.length',
      '-3000 <= inorder[i], postorder[i] <= 3000',
      'inorder and postorder consist of unique values.',
      'Each value of postorder also appears in inorder.',
      'inorder is guaranteed to be the inorder traversal of the tree.',
      'postorder is guaranteed to be the postorder traversal of the tree.'
    ],
    testCases: [
      { input: { inorder: [9,3,15,20,7], postorder: [9,15,7,20,3] }, expected: [3,9,20,null,null,15,7], functionCall: 'runBuildTree([9,3,15,20,7], [9,15,7,20,3])' },
      { input: { inorder: [-1], postorder: [-1] }, expected: [-1], functionCall: 'runBuildTree([-1], [-1])' }
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
function buildTree(inorder, postorder) {
    
}

function runBuildTree(inorder, postorder) {
    return binaryTreeToArray(buildTree(inorder, postorder));
}`,
      python: `def buildTree(inorder, postorder):
    pass`,
      cpp: `TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
    
}`,
      java: `public TreeNode buildTree(int[] inorder, int[] postorder) {
    
}`
    },
    hints: ['The last element in postorder is always the root.', 'Find the root in inorder. The elements to its left belong to the left subtree, and elements to its right belong to the right subtree.', 'Use a HashMap to quickly find the index of the root in the inorder traversal.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 61,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 141
  },
  {
    slug: 'count-good-nodes-in-binary-tree',
    title: 'Count Good Nodes in Binary Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given a binary tree \`root\`, a node X in the tree is named **good** if in the path from root to X there are no nodes with a value greater than X.

Return the number of **good** nodes in the binary tree.`,
    examples: [
      { input: 'root = [3,1,4,3,null,1,5]', output: '4', explain: 'Nodes in blue are good. Root Node (3) is always a good node. Node 4 -> (3,4) is the maximum value in the path starting from the root. Node 5 -> (3,4,5) is the maximum value in the path. Node 3 -> (3,1,3) is the maximum value in the path.' },
      { input: 'root = [3,3,null,4,2]', output: '3', explain: 'Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.' }
    ],
    constraints: [
      'The number of nodes in the binary tree is in the range [1, 10^5].',
      '-10^4 <= Node.val <= 10^4'
    ],
    testCases: [
      { input: { root: [3,1,4,3,null,1,5] }, expected: 4, functionCall: 'goodNodes(createBinaryTree([3,1,4,3,null,1,5]))' },
      { input: { root: [3,3,null,4,2] }, expected: 3, functionCall: 'goodNodes(createBinaryTree([3,3,null,4,2]))' },
      { input: { root: [1] }, expected: 1, functionCall: 'goodNodes(createBinaryTree([1]))' }
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
function goodNodes(root) {
    
}`,
      python: `def goodNodes(root):
    pass`,
      cpp: `int goodNodes(TreeNode* root) {
    
}`,
      java: `public int goodNodes(TreeNode root) {
    
}`
    },
    hints: ['Use DFS (pre-order traversal) to traverse the tree.', 'Pass the maximum value seen so far on the current path as a parameter to the DFS function.', 'If the current node\'s value is >= the maximum value seen so far, it is a good node. Update the maximum value and continue the DFS.'],
    companies: ['Microsoft', 'Amazon', 'Meta'],
    acceptance: 73,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Microsoft',
    order: 142
  },
  {
    slug: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'Medium',
    category: 'Tree',
    description: `Given the \`root\` of a binary tree, flatten the tree into a "linked list":

*   The "linked list" should use the same \`TreeNode\` class where the \`right\` child pointer points to the next node in the list and the \`left\` child pointer is always \`null\`.
*   The "linked list" should be in the same order as a **pre-order traversal** of the binary tree.`,
    examples: [
      { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]', explain: '' },
      { input: 'root = []', output: '[]', explain: '' },
      { input: 'root = [0]', output: '[0]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: { root: [1,2,5,3,4,null,6] }, expected: [1,null,2,null,3,null,4,null,5,null,6], functionCall: 'runFlatten([1,2,5,3,4,null,6])' },
      { input: { root: [] }, expected: [], functionCall: 'runFlatten([])' },
      { input: { root: [0] }, expected: [0], functionCall: 'runFlatten([0])' }
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
function flatten(root) {
    
}

function runFlatten(rootArr) {
    let root = createBinaryTree(rootArr);
    flatten(root);
    return binaryTreeToArray(root);
}`,
      python: `def flatten(root):
    pass`,
      cpp: `void flatten(TreeNode* root) {
    
}`,
      java: `public void flatten(TreeNode root) {
    
}`
    },
    hints: ['Can you do this in O(1) extra space?', 'If you notice carefully in the flattened tree, each node\'s right child points to the next node of a pre-order traversal.', 'Use a reverse post-order traversal (Right -> Left -> Root) and maintain a pointer to the previously visited node.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 64,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 143
  },
  {
    slug: 'implement-trie-prefix-tree',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    category: 'Trie',
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the \`Trie\` class:
*   \`Trie()\` Initializes the trie object.
*   \`void insert(String word)\` Inserts the string \`word\` into the trie.
*   \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
*   \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
    examples: [
      { input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]', output: '[null, null, true, false, true, null, true]', explain: 'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // return True\ntrie.search("app");     // return False\ntrie.startsWith("app"); // return True\ntrie.insert("app");\ntrie.search("app");     // return True' }
    ],
    constraints: [
      '1 <= word.length, prefix.length <= 2000',
      'word and prefix consist only of lowercase English letters.',
      'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'
    ],
    testCases: [
      { input: { ops: ["insert", "search", "search", "startsWith", "insert", "search"], vals: [["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]] }, expected: [null, true, false, true, null, true], functionCall: 'runTrie(["insert", "search", "search", "startsWith", "insert", "search"], [["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]])' }
    ],
    starterCode: {
      javascript: `class Trie {
    constructor() {
        
    }

    /** 
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        
    }

    /** 
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        
    }

    /** 
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        
    }
}

function runTrie(ops, vals) {
    const t = new Trie();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "insert") result.push(t.insert(vals[i][0]) ?? null);
        else if (ops[i] === "search") result.push(t.search(vals[i][0]));
        else if (ops[i] === "startsWith") result.push(t.startsWith(vals[i][0]));
    }
    return result;
}`,
      python: `class Trie:
    def __init__(self):
        pass

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass`,
      cpp: `class Trie {
public:
    Trie() {
        
    }
    
    void insert(string word) {
        
    }
    
    bool search(string word) {
        
    }
    
    bool startsWith(string prefix) {
        
    }
};`,
      java: `class Trie {

    public Trie() {
        
    }
    
    public void insert(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
    
    public boolean startsWith(String prefix) {
        
    }
}`
    },
    hints: ['Create a TrieNode class that contains an array or dictionary of children (for the next characters) and a boolean flag to indicate if a word ends at this node.', 'For insertion and searching, iterate through each character of the word, traversing down the trie, creating nodes if necessary.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 64,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Amazon',
    order: 144
  },
  {
    slug: 'design-add-and-search-words-data-structure',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    category: 'Trie',
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
*   \`WordDictionary()\` Initializes the object.
*   \`void addWord(word)\` Adds \`word\` to the data structure, it can be matched later.
*   \`bool search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.`,
    examples: [
      { input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', output: '[null,null,null,null,false,true,true,true]', explain: 'WordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord("bad");\nwordDictionary.addWord("dad");\nwordDictionary.addWord("mad");\nwordDictionary.search("pad"); // return False\nwordDictionary.search("bad"); // return True\nwordDictionary.search(".ad"); // return True\nwordDictionary.search("b.."); // return True' }
    ],
    constraints: [
      '1 <= word.length <= 25',
      'word in addWord consists of lowercase English letters.',
      'word in search consist of \'.\' or lowercase English letters.',
      'There will be at most 2 dots in word for search queries.',
      'At most 10^4 calls will be made to addWord and search.'
    ],
    testCases: [
      { input: { ops: ["addWord", "addWord", "addWord", "search", "search", "search", "search"], vals: [["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]] }, expected: [null, null, null, false, true, true, true], functionCall: 'runWordDictionary(["addWord", "addWord", "addWord", "search", "search", "search", "search"], [["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]])' }
    ],
    starterCode: {
      javascript: `class WordDictionary {
    constructor() {
        
    }

    /** 
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        
    }

    /** 
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        
    }
}

function runWordDictionary(ops, vals) {
    const wd = new WordDictionary();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "addWord") result.push(wd.addWord(vals[i][0]) ?? null);
        else if (ops[i] === "search") result.push(wd.search(vals[i][0]));
    }
    return result;
}`,
      python: `class WordDictionary:
    def __init__(self):
        pass

    def addWord(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass`,
      cpp: `class WordDictionary {
public:
    WordDictionary() {
        
    }
    
    void addWord(string word) {
        
    }
    
    bool search(string word) {
        
    }
};`,
      java: `class WordDictionary {

    public WordDictionary() {
        
    }
    
    public void addWord(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
}`
    },
    hints: ['Use a Trie structure to add words.', 'For searching, if you encounter a \'.\', you need to backtrack and check all possible children of the current TrieNode to see if any of them lead to a valid word match.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 90,
    isFaang: true,
    topCompany: 'Meta',
    order: 145
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
