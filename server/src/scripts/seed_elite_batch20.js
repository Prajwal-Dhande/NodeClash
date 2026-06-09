const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'online-stock-span',
    title: 'Online Stock Span',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Design a class \`StockSpanner\` which collects daily price quotes for some stock and returns the **span** of that stock's price for the current day.

The **span** of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

For example, if the prices of the stock in the last four days is \`[7, 2, 1, 2]\` and the price of the stock today is \`2\`, then the span of today is \`4\` because starting from today, the price of the stock was less than or equal \`2\` for \`4\` consecutive days.
Also, if the prices of the stock in the last four days is \`[7, 34, 1, 2]\` and the price of the stock today is \`8\`, then the span of today is \`3\` because starting from today, the price of the stock was less than or equal \`8\` for \`3\` consecutive days.

Implement the \`StockSpanner\` class:
- \`StockSpanner()\` Initializes the object of the class.
- \`int next(int price)\` Returns the **span** of the stock's price given that today's price is \`price\`.`,
    examples: [
      { input: '["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]\n[[], [100], [80], [60], [70], [60], [75], [85]]', output: '[null, 1, 1, 1, 2, 1, 4, 6]', explain: 'StockSpanner stockSpanner = new StockSpanner();\nstockSpanner.next(100); // return 1\nstockSpanner.next(80);  // return 1\nstockSpanner.next(60);  // return 1\nstockSpanner.next(70);  // return 2\nstockSpanner.next(60);  // return 1\nstockSpanner.next(75);  // return 4, because the last 4 prices (including today\'s price of 75) were less than or equal to today\'s price.\nstockSpanner.next(85);  // return 6' }
    ],
    constraints: [
      '1 <= price <= 10^5',
      'At most 10^4 calls will be made to next.'
    ],
    testCases: [
      { input: { ops: ["next", "next", "next", "next", "next", "next", "next"], vals: [[100], [80], [60], [70], [60], [75], [85]] }, expected: [1, 1, 1, 2, 1, 4, 6], functionCall: 'runStockSpanner(["next", "next", "next", "next", "next", "next", "next"], [[100], [80], [60], [70], [60], [75], [85]])' }
    ],
    starterCode: {
      javascript: `class StockSpanner {
    constructor() {
        
    }

    /** 
     * @param {number} price
     * @return {number}
     */
    next(price) {
        
    }
}

// Wrapper for testing
function runStockSpanner(ops, vals) {
    const s = new StockSpanner();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "next") result.push(s.next(vals[i][0]));
    }
    return result;
}`,
      python: `class StockSpanner:
    def __init__(self):
        pass

    def next(self, price: int) -> int:
        pass`,
      cpp: `class StockSpanner {
public:
    StockSpanner() {
        
    }
    
    int next(int price) {
        
    }
};`,
      java: `class StockSpanner {

    public StockSpanner() {
        
    }
    
    public int next(int price) {
        
    }
}`
    },
    hints: ['Keep a stack of pairs: (price, span_for_that_price).', 'When a new price arrives, pop elements from the stack if their price is less than or equal to the new price, and add their span to the new price\'s span.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 66,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 96
  },
  {
    slug: '132-pattern',
    title: '132 Pattern',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Given an array of \`n\` integers \`nums\`, a **132 pattern** is a subsequence of three integers \`nums[i]\`, \`nums[j]\` and \`nums[k]\` such that \`i < j < k\` and \`nums[i] < nums[k] < nums[j]\`.

Return \`true\` if there is a **132 pattern** in \`nums\`, otherwise, return \`false\`.`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: 'false', explain: 'There is no 132 pattern in the sequence.' },
      { input: 'nums = [3,1,4,2]', output: 'true', explain: 'There is a 132 pattern in the sequence: [1, 4, 2].' },
      { input: 'nums = [-1,3,2,0]', output: 'true', explain: 'There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 2 * 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    testCases: [
      { input: { nums: [1,2,3,4] }, expected: false, functionCall: 'find132pattern([1,2,3,4])' },
      { input: { nums: [3,1,4,2] }, expected: true, functionCall: 'find132pattern([3,1,4,2])' },
      { input: { nums: [-1,3,2,0] }, expected: true, functionCall: 'find132pattern([-1,3,2,0])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function find132pattern(nums) {
    
}`,
      python: `def find132pattern(nums):
    pass`,
      cpp: `bool find132pattern(vector<int>& nums) {
    
}`,
      java: `public boolean find132pattern(int[] nums) {
    
}`
    },
    hints: ['Iterate from right to left. Use a stack to keep track of the maximum "2" value (the k-th element) we have seen so far.', 'The stack maintains candidates for the "3" value (the j-th element). When we find a number smaller than the max "2" we\'ve tracked, it\'s our "1", meaning we found a 132 pattern!'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 34,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 97
  },
  {
    slug: 'remove-all-adjacent-duplicates-in-string',
    title: 'Remove All Adjacent Duplicates In String',
    difficulty: 'Easy',
    category: 'Stack',
    description: `You are given a string \`s\` consisting of lowercase English letters. A **duplicate removal** consists of choosing two **adjacent** and **equal** letters and removing them.

We repeatedly make **duplicate removals** on \`s\` until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is **unique**.`,
    examples: [
      { input: 's = "abbaca"', output: '"ca"', explain: 'For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".' },
      { input: 's = "azxxzy"', output: '"ay"', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of lowercase English letters.'
    ],
    testCases: [
      { input: { s: "abbaca" }, expected: "ca", functionCall: 'removeDuplicates("abbaca")' },
      { input: { s: "azxxzy" }, expected: "ay", functionCall: 'removeDuplicates("azxxzy")' },
      { input: { s: "aaaaaa" }, expected: "", functionCall: 'removeDuplicates("aaaaaa")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeDuplicates(s) {
    
}`,
      python: `def removeDuplicates(s):
    pass`,
      cpp: `string removeDuplicates(string s) {
    
}`,
      java: `public String removeDuplicates(String s) {
    
}`
    },
    hints: ['Use a stack to process the string character by character.', 'If the current character is equal to the top of the stack, pop from the stack. Otherwise, push the current character.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 71,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Meta',
    order: 98
  },
  {
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Given a string \`path\`, which is an **absolute path** (starting with a slash \`'/'\`) to a file or directory in a Unix-style file system, convert it to the simplified **canonical path**.

In a Unix-style file system, a period \`'.'\` refers to the current directory, a double period \`'..'\` refers to the directory up a level, and any multiple consecutive slashes (i.e. \`'//'\`) are treated as a single slash \`'/'\`. For this problem, any other format of periods such as \`'...'\` are treated as file/directory names.

The **canonical path** should have the following format:
- The path starts with a single slash \`'/'\`.
- Any two directories are separated by a single slash \`'/'\`.
- The path does not end with a trailing \`'/'\`.
- The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period \`'.'\` or double period \`'..'\`)

Return the simplified **canonical path**.`,
    examples: [
      { input: 'path = "/home/"', output: '"/home"', explain: 'Note that there is no trailing slash after the last directory name.' },
      { input: 'path = "/../"', output: '"/"', explain: 'Going one level up from the root directory is a no-op, as the root level is the highest level you can go.' },
      { input: 'path = "/home//foo/"', output: '"/home/foo"', explain: 'Multiple consecutive slashes are replaced by a single one.' }
    ],
    constraints: [
      '1 <= path.length <= 3000',
      'path consists of English letters, digits, period \'.\', slash \'/\' or \'_x_\'.',
      'path is a valid absolute Unix path.'
    ],
    testCases: [
      { input: { path: "/home/" }, expected: "/home", functionCall: 'simplifyPath("/home/")' },
      { input: { path: "/../" }, expected: "/", functionCall: 'simplifyPath("/../")' },
      { input: { path: "/home//foo/" }, expected: "/home/foo", functionCall: 'simplifyPath("/home//foo/")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
    
}`,
      python: `def simplifyPath(path):
    pass`,
      cpp: `string simplifyPath(string path) {
    
}`,
      java: `public String simplifyPath(String path) {
    
}`
    },
    hints: ['Split the path by \'/\' to get individual components.', 'Use a stack to process the components. If component is \'..\' pop the stack (if not empty). Ignore \'.\' and empty components. Push all other valid names.'],
    companies: ['Meta', 'Amazon', 'Apple'],
    acceptance: 42,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 98,
    isFaang: true,
    topCompany: 'Meta',
    order: 99
  },
  {
    slug: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given the \`head\` of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the **second middle** node.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explain: 'The middle node of the list is node 3.' },
      { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explain: 'Since the list has two middle nodes with values 3 and 4, we return the second one.' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 100].',
      '1 <= Node.val <= 100'
    ],
    testCases: [
      { input: { head: [1,2,3,4,5] }, expected: [3,4,5], functionCall: 'middleNode(createLinkedList([1,2,3,4,5]))' },
      { input: { head: [1,2,3,4,5,6] }, expected: [4,5,6], functionCall: 'middleNode(createLinkedList([1,2,3,4,5,6]))' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode(head) {
    
}`,
      python: `def middleNode(head):
    pass`,
      cpp: `ListNode* middleNode(ListNode* head) {
    
}`,
      java: `public ListNode middleNode(ListNode head) {
    
}`
    },
    hints: ['If you had two pointers starting at the head, and one pointer traversed twice as fast as the other...', 'By the time the fast pointer reaches the end of the list, the slow pointer will be right at the middle!'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 76,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 87,
    isFaang: true,
    topCompany: 'Amazon',
    order: 100
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
