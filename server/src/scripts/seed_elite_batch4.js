const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'remove-element',
    title: 'Remove Element',
    difficulty: 'Easy',
    category: 'Arrays',
    description: `Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` in \`nums\` **in-place**. The order of the elements may be changed. Then return the number of elements in \`nums\` which are not equal to \`val\`.

Consider the number of elements in \`nums\` which are not equal to \`val\` be \`k\`, to get accepted, you need to do the following things:
- Change the array \`nums\` such that the first \`k\` elements of \`nums\` contain the elements which are not equal to \`val\`. The remaining elements of \`nums\` are not important as well as the size of \`nums\`.
- Return \`k\`.`,
    examples: [
      { input: 'nums = [3,2,2,3], val = 3', output: '2', explain: 'Your function should return k = 2, with the first two elements of nums being 2.' },
      { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', output: '5', explain: 'Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.' }
    ],
    constraints: [
      '0 <= nums.length <= 100',
      '0 <= nums[i] <= 50',
      '0 <= val <= 100'
    ],
    testCases: [
      { input: { nums: [3,2,2,3], val: 3 }, expected: 2, functionCall: 'removeElement([3,2,2,3], 3)' },
      { input: { nums: [0,1,2,2,3,0,4,2], val: 2 }, expected: 5, functionCall: 'removeElement([0,1,2,2,3,0,4,2], 2)' },
      { input: { nums: [], val: 0 }, expected: 0, functionCall: 'removeElement([], 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
    
}`,
      python: `def removeElement(nums, val):
    pass`,
      cpp: `int removeElement(vector<int>& nums, int val) {
    
}`,
      java: `public int removeElement(int[] nums, int val) {
    
}`
    },
    hints: ['Try two pointers. One pointer iterates the array, the other pointer keeps track of where to place the next valid element.', 'Whenever you find an element that is not `val`, place it at the index of the second pointer and increment it.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 72,
    isFaang: true,
    topCompany: 'Amazon',
    order: 16
  },
  {
    slug: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    category: 'Arrays',
    description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same. Then return the number of unique elements in \`nums\`.

Consider the number of unique elements of \`nums\` to be \`k\`, to get accepted, you need to do the following things:
- Change the array \`nums\` such that the first \`k\` elements of \`nums\` contain the unique elements in the order they were present in \`nums\` initially.
- Return \`k\`.`,
    examples: [
      { input: 'nums = [1,1,2]', output: '2', explain: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5', explain: 'Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.' }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-100 <= nums[i] <= 100',
      'nums is sorted in non-decreasing order.'
    ],
    testCases: [
      { input: { nums: [1,1,2] }, expected: 2, functionCall: 'removeDuplicates([1,1,2])' },
      { input: { nums: [0,0,1,1,1,2,2,3,3,4] }, expected: 5, functionCall: 'removeDuplicates([0,0,1,1,1,2,2,3,3,4])' },
      { input: { nums: [1,2,3] }, expected: 3, functionCall: 'removeDuplicates([1,2,3])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    
}`,
      python: `def removeDuplicates(nums):
    pass`,
      cpp: `int removeDuplicates(vector<int>& nums) {
    
}`,
      java: `public int removeDuplicates(int[] nums) {
    
}`
    },
    hints: ['In this problem, the key point to focus on is the input array being sorted.', 'Use two pointers `i` and `j`. `i` is the slow-runner while `j` is the fast-runner.'],
    companies: ['Meta', 'Google', 'Microsoft'],
    acceptance: 53,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Meta',
    order: 17
  },
  {
    slug: 'remove-duplicates-from-sorted-array-ii',
    title: 'Remove Duplicates from Sorted Array II',
    difficulty: 'Medium',
    category: 'Arrays',
    description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove some duplicates **in-place** such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the same.

Return \`k\` after placing the final result in the first \`k\` slots of \`nums\`.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3]', output: '5', explain: 'Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.' },
      { input: 'nums = [0,0,1,1,1,1,2,3,3]', output: '7', explain: 'Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.' }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums is sorted in non-decreasing order.'
    ],
    testCases: [
      { input: { nums: [1,1,1,2,2,3] }, expected: 5, functionCall: 'removeDuplicates([1,1,1,2,2,3])' },
      { input: { nums: [0,0,1,1,1,1,2,3,3] }, expected: 7, functionCall: 'removeDuplicates([0,0,1,1,1,1,2,3,3])' },
      { input: { nums: [1,1,1,1,1] }, expected: 2, functionCall: 'removeDuplicates([1,1,1,1,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    
}`,
      python: `def removeDuplicates(nums):
    pass`,
      cpp: `int removeDuplicates(vector<int>& nums) {
    
}`,
      java: `public int removeDuplicates(int[] nums) {
    
}`
    },
    hints: ['You can keep a pointer that points to the next available position to place a valid element.', 'Compare the current element with the element two indices behind the pointer.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 18
  },
  {
    slug: 'best-time-to-buy-and-sell-stock-ii',
    title: 'Best Time to Buy and Sell Stock II',
    difficulty: 'Medium',
    category: 'Greedy',
    description: `You are given an integer array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i^{th}\` day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.

Find and return the **maximum** profit you can achieve.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '7', explain: 'Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3. Total profit is 4 + 3 = 7.' },
      { input: 'prices = [1,2,3,4,5]', output: '4', explain: 'Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.' }
    ],
    constraints: [
      '1 <= prices.length <= 3 * 10^4',
      '0 <= prices[i] <= 10^4'
    ],
    testCases: [
      { input: { prices: [7,1,5,3,6,4] }, expected: 7, functionCall: 'maxProfit([7,1,5,3,6,4])' },
      { input: { prices: [1,2,3,4,5] }, expected: 4, functionCall: 'maxProfit([1,2,3,4,5])' },
      { input: { prices: [7,6,4,3,1] }, expected: 0, functionCall: 'maxProfit([7,6,4,3,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    
}`,
      python: `def maxProfit(prices):
    pass`,
      cpp: `int maxProfit(vector<int>& prices) {
    
}`,
      java: `public int maxProfit(int[] prices) {
    
}`
    },
    hints: ['If the price of the stock tomorrow is higher than today, we buy today and sell tomorrow.', 'You just need to capture all upward price movements.'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance: 64,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Google',
    order: 19
  },
  {
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    category: 'Greedy',
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true', explain: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { input: 'nums = [3,2,1,0,4]', output: 'false', explain: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 10^5'
    ],
    testCases: [
      { input: { nums: [2,3,1,1,4] }, expected: true, functionCall: 'canJump([2,3,1,1,4])' },
      { input: { nums: [3,2,1,0,4] }, expected: false, functionCall: 'canJump([3,2,1,0,4])' },
      { input: { nums: [0] }, expected: true, functionCall: 'canJump([0])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
    
}`,
      python: `def canJump(nums):
    pass`,
      cpp: `bool canJump(vector<int>& nums) {
    
}`,
      java: `public boolean canJump(int[] nums) {
    
}`
    },
    hints: ['Keep track of the maximum reachable index.', 'Iterate through the array. If the current index is greater than the maximum reachable index, then you cannot reach the end.', 'Update the maximum reachable index to be the maximum of its current value and `i + nums[i]`.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 38,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Meta',
    order: 20
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
