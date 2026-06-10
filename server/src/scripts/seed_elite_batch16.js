const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'find-the-duplicate-number',
    title: 'Find the Duplicate Number',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.

There is only **one repeated number** in \`nums\`, return **this repeated number**.

You must solve the problem **without** modifying the array \`nums\` and uses only constant extra space.`,
    examples: [
      { input: 'nums = [1,3,4,2,2]', output: '2', explain: '' },
      { input: 'nums = [3,1,3,4,2]', output: '3', explain: '' },
      { input: 'nums = [3,3,3,3,3]', output: '3', explain: '' }
    ],
    constraints: [
      '1 <= n <= 10^5',
      'nums.length == n + 1',
      '1 <= nums[i] <= n',
      'All the integers in nums appear only once except for precisely one integer which appears two or more times.'
    ],
    testCases: [
      { input: { nums: [1,3,4,2,2] }, expected: 2, functionCall: 'findDuplicate([1,3,4,2,2])' },
      { input: { nums: [3,1,3,4,2] }, expected: 3, functionCall: 'findDuplicate([3,1,3,4,2])' },
      { input: { nums: [3,3,3,3,3] }, expected: 3, functionCall: 'findDuplicate([3,3,3,3,3])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
    
}`,
      python: `def findDuplicate(nums):
    pass`,
      cpp: `int findDuplicate(vector<int>& nums) {
    
}`,
      java: `public int findDuplicate(int[] nums) {
    
}`
    },
    hints: ['Can you use Floyd\'s Tortoise and Hare algorithm?', 'Consider the array as a linked list where the index is the node and the value is the next pointer. Since the elements are in the range [1, n], there must be a cycle, and the duplicate element is the entrance to the cycle.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 59,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Amazon',
    order: 76
  },
  {
    slug: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explain: 'merged array = [1,2,3] and median is 2.' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explain: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    testCases: [
      { input: { nums1: [1,3], nums2: [2] }, expected: 2.0, functionCall: 'findMedianSortedArrays([1,3], [2])' },
      { input: { nums1: [1,2], nums2: [3,4] }, expected: 2.5, functionCall: 'findMedianSortedArrays([1,2], [3,4])' },
      { input: { nums1: [0,0], nums2: [0,0] }, expected: 0.0, functionCall: 'findMedianSortedArrays([0,0], [0,0])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    
}`,
      python: `def findMedianSortedArrays(nums1, nums2):
    pass`,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    
}`,
      java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    
}`
    },
    hints: ['If you partition the two arrays, the left half must be equal to or one element larger than the right half.', 'Use binary search to find the correct partition. The condition is maxLeftX <= minRightY and maxLeftY <= minRightX.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 38,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 99,
    isFaang: true,
    topCompany: 'Google',
    order: 77
  },
  {
    slug: 'valid-perfect-square',
    title: 'Valid Perfect Square',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `Given a positive integer \`num\`, return \`true\` if \`num\` is a perfect square or \`false\` otherwise.

A **perfect square** is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as \`sqrt\`.`,
    examples: [
      { input: 'num = 16', output: 'true', explain: 'We return true because 4 * 4 = 16 and 4 is an integer.' },
      { input: 'num = 14', output: 'false', explain: 'We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.' }
    ],
    constraints: [
      '1 <= num <= 2^31 - 1'
    ],
    testCases: [
      { input: { num: 16 }, expected: true, functionCall: 'isPerfectSquare(16)' },
      { input: { num: 14 }, expected: false, functionCall: 'isPerfectSquare(14)' },
      { input: { num: 1 }, expected: true, functionCall: 'isPerfectSquare(1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} num
 * @return {boolean}
 */
function isPerfectSquare(num) {
    
}`,
      python: `def isPerfectSquare(num):
    pass`,
      cpp: `bool isPerfectSquare(int num) {
    
}`,
      java: `public boolean isPerfectSquare(int num) {
    
}`
    },
    hints: ['Use binary search on the numbers between 1 and num.', 'For any mid, calculate mid * mid. If it equals num, return true. If it\'s smaller, move the left pointer. Otherwise, move the right pointer.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 65,
    isFaang: true,
    topCompany: 'Amazon',
    order: 78
  },
  {
    slug: 'arranging-coins',
    title: 'Arranging Coins',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `You have \`n\` coins and you want to build a staircase with these coins. The staircase consists of \`k\` rows where the \`i^{th}\` row has exactly \`i\` coins. The last row of the staircase **may be** incomplete.

Given the integer \`n\`, return the number of **complete rows** of the staircase you will build.`,
    examples: [
      { input: 'n = 5', output: '2', explain: 'Because the 3rd row is incomplete, we return 2.' },
      { input: 'n = 8', output: '3', explain: 'Because the 4th row is incomplete, we return 3.' }
    ],
    constraints: [
      '1 <= n <= 2^31 - 1'
    ],
    testCases: [
      { input: { n: 5 }, expected: 2, functionCall: 'arrangeCoins(5)' },
      { input: { n: 8 }, expected: 3, functionCall: 'arrangeCoins(8)' },
      { input: { n: 1 }, expected: 1, functionCall: 'arrangeCoins(1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function arrangeCoins(n) {
    
}`,
      python: `def arrangeCoins(n):
    pass`,
      cpp: `int arrangeCoins(int n) {
    
}`,
      java: `public int arrangeCoins(int n) {
    
}`
    },
    hints: ['The total number of coins in a complete staircase with k rows is k * (k + 1) / 2.', 'Use binary search to find the maximum k such that k * (k + 1) / 2 <= n. Alternatively, you can use the quadratic formula to solve for k.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 60,
    isFaang: true,
    topCompany: 'Amazon',
    order: 79
  },
  {
    slug: 'implement-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    category: 'Design',
    description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (\`push\`, \`peek\`, \`pop\`, and \`empty\`).

Implement the \`MyQueue\` class:
- \`void push(int x)\` Pushes element x to the back of the queue.
- \`int pop()\` Removes the element from the front of the queue and returns it.
- \`int peek()\` Returns the element at the front of the queue.
- \`boolean empty()\` Returns \`true\` if the queue is empty, \`false\` otherwise.

**Notes:**
- You must use **only** standard operations of a stack, which means only \`push to top\`, \`peek/pop from top\`, \`size\`, and \`is empty\` operations are valid.
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.`,
    examples: [
      { input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]', output: '[null, null, null, 1, 1, false]', explain: 'MyQueue myQueue = new MyQueue();\nmyQueue.push(1); // queue is: [1]\nmyQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)\nmyQueue.peek(); // return 1\nmyQueue.pop(); // return 1, queue is [2]\nmyQueue.empty(); // return false' }
    ],
    constraints: [
      '1 <= x <= 9',
      'At most 100 calls will be made to push, pop, peek, and empty.',
      'All the calls to pop and peek are valid.'
    ],
    testCases: [
      { input: { ops: ["push", "push", "peek", "pop", "empty"], vals: [[1], [2], [], [], []] }, expected: [null, null, 1, 1, false], functionCall: 'runMyQueue(["push", "push", "peek", "pop", "empty"], [[1], [2], [], [], []])' }
    ],
    starterCode: {
      javascript: `class MyQueue {
    constructor() {
        
    }

    /** 
     * @param {number} x
     * @return {void}
     */
    push(x) {
        
    }

    /**
     * @return {number}
     */
    pop() {
        
    }

    /**
     * @return {number}
     */
    peek() {
        
    }

    /**
     * @return {boolean}
     */
    empty() {
        
    }
}

// Wrapper for testing
function runMyQueue(ops, vals) {
    const q = new MyQueue();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "push") result.push(q.push(vals[i][0]) ?? null);
        else if (ops[i] === "pop") result.push(q.pop());
        else if (ops[i] === "peek") result.push(q.peek());
        else if (ops[i] === "empty") result.push(q.empty());
    }
    return result;
}`,
      python: `class MyQueue:
    def __init__(self):
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def peek(self) -> int:
        pass

    def empty(self) -> bool:
        pass`,
      cpp: `class MyQueue {
public:
    MyQueue() {
        
    }
    
    void push(int x) {
        
    }
    
    int pop() {
        
    }
    
    int peek() {
        
    }
    
    bool empty() {
        
    }
};`,
      java: `class MyQueue {

    public MyQueue() {
        
    }
    
    public void push(int x) {
        
    }
    
    public int pop() {
        
    }
    
    public int peek() {
        
    }
    
    public boolean empty() {
        
    }
}`
    },
    hints: ['Use two stacks: an input stack and an output stack.', 'Push new elements to the input stack. When popping or peeking, if the output stack is empty, pop all elements from the input stack and push them to the output stack.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Amazon',
    order: 80
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
