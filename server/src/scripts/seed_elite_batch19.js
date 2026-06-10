const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'longest-valid-parentheses',
    title: 'Longest Valid Parentheses',
    difficulty: 'Hard',
    category: 'Stack',
    description: `Given a string containing just the characters \`'('\` and \`')'\`, return the length of the longest valid (well-formed) parentheses substring.`,
    examples: [
      { input: 's = "(()"', output: '2', explain: 'The longest valid parentheses substring is "()".' },
      { input: 's = ")()())"', output: '4', explain: 'The longest valid parentheses substring is "()()".' },
      { input: 's = ""', output: '0', explain: '' }
    ],
    constraints: [
      '0 <= s.length <= 3 * 10^4',
      's[i] is \'(\', or \')\'.'
    ],
    testCases: [
      { input: { s: "(()" }, expected: 2, functionCall: 'longestValidParentheses("(()")' },
      { input: { s: ")()())" }, expected: 4, functionCall: 'longestValidParentheses(")()())")' },
      { input: { s: "" }, expected: 0, functionCall: 'longestValidParentheses("")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses(s) {
    
}`,
      python: `def longestValidParentheses(s):
    pass`,
      cpp: `int longestValidParentheses(string s) {
    
}`,
      java: `public int longestValidParentheses(String s) {
    
}`
    },
    hints: ['Can you use a stack? Push indices onto the stack instead of characters.', 'Initialize the stack with -1 to serve as a base index. When you see \')\', pop. If the stack is empty, push the current index. Otherwise, the valid length is current index - stack top.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 34,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 91
  },
  {
    slug: 'design-hit-counter',
    title: 'Design Hit Counter',
    difficulty: 'Medium',
    category: 'Queue',
    description: `Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).

Your system should accept a \`timestamp\` parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., \`timestamp\` is monotonically increasing). Several hits may arrive roughly at the same time.

Implement the \`HitCounter\` class:
- \`HitCounter()\` Initializes the object of the hit counter system.
- \`void hit(int timestamp)\` Records a hit that happened at \`timestamp\` (In seconds). Several hits might happen at the same \`timestamp\`.
- \`int getHits(int timestamp)\` Returns the number of hits in the past 5 minutes from \`timestamp\` (i.e., the past 300 seconds).`,
    examples: [
      { input: '["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]\n[[], [1], [2], [3], [4], [300], [300], [301]]', output: '[null, null, null, null, 3, null, 4, 3]', explain: 'HitCounter hitCounter = new HitCounter();\nhitCounter.hit(1);       // hit at timestamp 1.\nhitCounter.hit(2);       // hit at timestamp 2.\nhitCounter.hit(3);       // hit at timestamp 3.\nhitCounter.getHits(4);   // get hits at timestamp 4, return 3.\nhitCounter.hit(300);     // hit at timestamp 300.\nhitCounter.getHits(300); // get hits at timestamp 300, return 4.\nhitCounter.getHits(301); // get hits at timestamp 301, return 3.' }
    ],
    constraints: [
      '1 <= timestamp <= 2 * 10^9',
      'All the calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing).',
      'At most 300 calls will be made to hit and getHits.'
    ],
    testCases: [
      { input: { ops: ["hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"], vals: [[1], [2], [3], [4], [300], [300], [301]] }, expected: [null, null, null, 3, null, 4, 3], functionCall: 'runHitCounter(["hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"], [[1], [2], [3], [4], [300], [300], [301]])' }
    ],
    starterCode: {
      javascript: `class HitCounter {
    constructor() {
        
    }

    /** 
     * @param {number} timestamp
     * @return {void}
     */
    hit(timestamp) {
        
    }

    /** 
     * @param {number} timestamp
     * @return {number}
     */
    getHits(timestamp) {
        
    }
}

// Wrapper for testing
function runHitCounter(ops, vals) {
    const hc = new HitCounter();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "hit") result.push(hc.hit(vals[i][0]) ?? null);
        else if (ops[i] === "getHits") result.push(hc.getHits(vals[i][0]));
    }
    return result;
}`,
      python: `class HitCounter:
    def __init__(self):
        pass

    def hit(self, timestamp: int) -> None:
        pass

    def getHits(self, timestamp: int) -> int:
        pass`,
      cpp: `class HitCounter {
public:
    HitCounter() {
        
    }
    
    void hit(int timestamp) {
        
    }
    
    int getHits(int timestamp) {
        
    }
};`,
      java: `class HitCounter {

    public HitCounter() {
        
    }
    
    public void hit(int timestamp) {
        
    }
    
    public int getHits(int timestamp) {
        
    }
}`
    },
    hints: ['Use a Queue to store the timestamps of the hits.', 'When getHits is called, while the queue is not empty and the first element is less than or equal to timestamp - 300, dequeue it. Return the size of the queue.'],
    companies: ['Amazon', 'Dropbox', 'Google'],
    acceptance: 68,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Dropbox',
    order: 92
  },
  {
    slug: 'car-fleet',
    title: 'Car Fleet',
    difficulty: 'Medium',
    category: 'Stack',
    description: `There are \`n\` cars at given miles away from the starting mile \`0\`, traveling to reach the mile \`target\`.

You are given two integer arrays \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the starting mile of the \`i^{th}\` car and \`speed[i]\` is the speed of the \`i^{th}\` car in miles per hour.

A car cannot pass another car ahead of it. It can only catch up to it and then drive at the same speed as the faster car. A **car fleet** is some non-empty set of cars driving at the same position and same speed.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the number of car fleets that will arrive at the destination.`,
    examples: [
      { input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', output: '3', explain: 'The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself. The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6.' },
      { input: 'target = 10, position = [3], speed = [3]', output: '1', explain: '' }
    ],
    constraints: [
      'n == position.length == speed.length',
      '1 <= n <= 10^5',
      '0 < target <= 10^6',
      '0 <= position[i] < target',
      'All the values of position are unique.',
      '0 < speed[i] <= 10^6'
    ],
    testCases: [
      { input: { target: 12, position: [10,8,0,5,3], speed: [2,4,1,1,3] }, expected: 3, functionCall: 'carFleet(12, [10,8,0,5,3], [2,4,1,1,3])' },
      { input: { target: 10, position: [3], speed: [3] }, expected: 1, functionCall: 'carFleet(10, [3], [3])' },
      { input: { target: 100, position: [0,2,4], speed: [4,2,1] }, expected: 1, functionCall: 'carFleet(100, [0,2,4], [4,2,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
function carFleet(target, position, speed) {
    
}`,
      python: `def carFleet(target, position, speed):
    pass`,
      cpp: `int carFleet(int target, vector<int>& position, vector<int>& speed) {
    
}`,
      java: `public int carFleet(int target, int[] position, int[] speed) {
    
}`
    },
    hints: ['Sort the cars by position in descending order.', 'Calculate the time it takes for each car to reach the target: (target - position) / speed.', 'If a car takes less or equal time than the car in front of it, it will catch up and form a fleet. Otherwise, it forms a new fleet.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 50,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Google',
    order: 93
  },
  {
    slug: 'next-greater-element-i',
    title: 'Next Greater Element I',
    difficulty: 'Easy',
    category: 'Stack',
    description: `The **next greater element** of some element \`x\` in an array is the **first greater** element that is to the right of \`x\` in the same array.

You are given two **distinct 0-indexed** integer arrays \`nums1\` and \`nums2\`, where \`nums1\` is a subset of \`nums2\`.

For each \`0 <= i < nums1.length\`, find the index \`j\` such that \`nums1[i] == nums2[j]\` and determine the **next greater element** of \`nums2[j]\` in \`nums2\`. If there is no next greater element, then the answer for this query is \`-1\`.

Return an array \`ans\` of length \`nums1.length\` such that \`ans[i]\` is the **next greater element** as described above.`,
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]', explain: 'For number 4, there is no next greater element so -1. For number 1, it is 3. For number 2, there is no next greater element so -1.' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]', explain: '' }
    ],
    constraints: [
      '1 <= nums1.length <= nums2.length <= 1000',
      '0 <= nums1[i], nums2[i] <= 10^4',
      'All integers in nums1 and nums2 are unique.',
      'All the integers of nums1 also appear in nums2.'
    ],
    testCases: [
      { input: { nums1: [4,1,2], nums2: [1,3,4,2] }, expected: [-1,3,-1], functionCall: 'nextGreaterElement([4,1,2], [1,3,4,2])' },
      { input: { nums1: [2,4], nums2: [1,2,3,4] }, expected: [3,-1], functionCall: 'nextGreaterElement([2,4], [1,2,3,4])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function nextGreaterElement(nums1, nums2) {
    
}`,
      python: `def nextGreaterElement(nums1, nums2):
    pass`,
      cpp: `vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    
}`,
      java: `public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    
}`
    },
    hints: ['A monotonic stack can help you find the next greater element for all elements in nums2 in O(n) time.', 'Iterate through nums2, keeping a decreasing stack. When you find an element greater than the top of the stack, you found the next greater element for the popped items.', 'Store these relationships in a Hash Map for quick O(1) lookup when processing nums1.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 71,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 79,
    isFaang: true,
    topCompany: 'Amazon',
    order: 94
  },
  {
    slug: 'next-greater-element-ii',
    title: 'Next Greater Element II',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Given a circular integer array \`nums\` (i.e., the next element of \`nums[nums.length - 1]\` is \`nums[0]\`), return the **next greater element** for every element in \`nums\`.

The **next greater element** of a number \`x\` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return \`-1\` for this number.`,
    examples: [
      { input: 'nums = [1,2,1]', output: '[2,-1,2]', explain: 'The first 1\'s next greater number is 2; The number 2 can\'t find next greater number. The second 1\'s next greater number needs to search circularly, which is also 2.' },
      { input: 'nums = [1,2,3,4,3]', output: '[2,3,4,-1,4]', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9'
    ],
    testCases: [
      { input: { nums: [1,2,1] }, expected: [2,-1,2], functionCall: 'nextGreaterElements([1,2,1])' },
      { input: { nums: [1,2,3,4,3] }, expected: [2,3,4,-1,4], functionCall: 'nextGreaterElements([1,2,3,4,3])' },
      { input: { nums: [5,4,3,2,1] }, expected: [-1,5,5,5,5], functionCall: 'nextGreaterElements([5,4,3,2,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function nextGreaterElements(nums) {
    
}`,
      python: `def nextGreaterElements(nums):
    pass`,
      cpp: `vector<int> nextGreaterElements(vector<int>& nums) {
    
}`,
      java: `public int[] nextGreaterElements(int[] nums) {
    
}`
    },
    hints: ['We can use a Monotonic Stack just like Next Greater Element I.', 'Since the array is circular, we can simply double the array length (or iterate 2 * n times using modulo) to simulate the circular behavior.'],
    companies: ['Amazon', 'Google', 'Bloomberg'],
    acceptance: 63,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 95
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
