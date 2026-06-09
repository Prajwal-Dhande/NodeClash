const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    category: 'Arrays',
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\` represent the start and the end of the \`i^{th}\` interval and \`intervals\` is sorted in ascending order by \`start_i\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`start_i\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` after the insertion.`,
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]', explain: '' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', explain: 'Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].' }
    ],
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^5',
      'intervals is sorted by start_i in ascending order.',
      'newInterval.length == 2',
      '0 <= start <= end <= 10^5'
    ],
    testCases: [
      { input: { intervals: [[1,3],[6,9]], newInterval: [2,5] }, expected: [[1,5],[6,9]], functionCall: 'insert([[1,3],[6,9]], [2,5])' },
      { input: { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8] }, expected: [[1,2],[3,10],[12,16]], functionCall: 'insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])' },
      { input: { intervals: [], newInterval: [5,7] }, expected: [[5,7]], functionCall: 'insert([], [5,7])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    
}`,
      python: `def insert(intervals, newInterval):
    pass`,
      cpp: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    
}`,
      java: `public int[][] insert(int[][] intervals, int[] newInterval) {
    
}`
    },
    hints: ['Create an empty result array. Iterate through the intervals, adding the ones that come before the newInterval.', 'Merge overlapping intervals with the newInterval, then add the merged interval to the result.', 'Add all remaining intervals to the result.'],
    companies: ['Google', 'LinkedIn', 'Amazon'],
    acceptance: 40,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Google',
    order: 6
  },
  {
    slug: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'Medium',
    category: 'Arrays',
    description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.`,
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]', explain: '' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]', explain: '' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 300',
      'nums[i] is either 0, 1, or 2.'
    ],
    testCases: [
      { input: { nums: [2,0,2,1,1,0] }, expected: [0,0,1,1,2,2], functionCall: 'sortColors([2,0,2,1,1,0])' },
      { input: { nums: [2,0,1] }, expected: [0,1,2], functionCall: 'sortColors([2,0,1])' },
      { input: { nums: [0] }, expected: [0], functionCall: 'sortColors([0])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]} - Return the modified array
 */
function sortColors(nums) {
    // Write your code here and return nums
    
}`,
      python: `def sortColors(nums):
    pass`,
      cpp: `vector<int> sortColors(vector<int>& nums) {
    
}`,
      java: `public int[] sortColors(int[] nums) {
    
}`
    },
    hints: ['Think of the Dutch National Flag algorithm.', 'Maintain three pointers. The `low` pointer tracks where the next `0` should go, `high` tracks where the next `2` should go, and `curr` iterates through the array.'],
    companies: ['Microsoft', 'Amazon', 'Meta'],
    acceptance: 61,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Microsoft',
    order: 7
  },
  {
    slug: 'gas-station',
    title: 'Gas Station',
    difficulty: 'Medium',
    category: 'Greedy',
    description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`i^{th}\` station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i^{th}\` station to its next \`(i + 1)^{th}\` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is **guaranteed to be unique**.`,
    examples: [
      { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3', explain: 'Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4. Travel to station 4... It works.' },
      { input: 'gas = [2,3,4], cost = [3,4,3]', output: '-1', explain: 'You can\'t start at station 0 or 1. Station 2 has 4 units, you can travel to 0 but you run out.' }
    ],
    constraints: [
      'n == gas.length == cost.length',
      '1 <= n <= 10^5',
      '0 <= gas[i], cost[i] <= 10^4'
    ],
    testCases: [
      { input: { gas: [1,2,3,4,5], cost: [3,4,5,1,2] }, expected: 3, functionCall: 'canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])' },
      { input: { gas: [2,3,4], cost: [3,4,3] }, expected: -1, functionCall: 'canCompleteCircuit([2,3,4], [3,4,3])' },
      { input: { gas: [5,1,2,3,4], cost: [4,4,1,5,1] }, expected: 4, functionCall: 'canCompleteCircuit([5,1,2,3,4], [4,4,1,5,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function canCompleteCircuit(gas, cost) {
    
}`,
      python: `def canCompleteCircuit(gas, cost):
    pass`,
      cpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    
}`,
      java: `public int canCompleteCircuit(int[] gas, int[] cost) {
    
}`
    },
    hints: ['If the total gas is less than the total cost, it is impossible to complete the circuit.', 'Iterate through the stations, keeping a running total of the gas in the tank. If the tank drops below 0, the starting station cannot be any station from your current starting point up to the current station. Reset your starting point to the next station.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 45,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Amazon',
    order: 8
  },
  {
    slug: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    category: 'Arrays',
    description: `Given an integer array \`nums\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative.`,
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explain: 'rotate 1 steps to the right: [7,1,2,3,4,5,6], then 2 steps, then 3 steps.' },
      { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-2^31 <= nums[i] <= 2^31 - 1',
      '0 <= k <= 10^5'
    ],
    testCases: [
      { input: { nums: [1,2,3,4,5,6,7], k: 3 }, expected: [5,6,7,1,2,3,4], functionCall: 'rotate([1,2,3,4,5,6,7], 3)' },
      { input: { nums: [-1,-100,3,99], k: 2 }, expected: [3,99,-1,-100], functionCall: 'rotate([-1,-100,3,99], 2)' },
      { input: { nums: [1,2], k: 3 }, expected: [2,1], functionCall: 'rotate([1,2], 3)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]} - Return the modified array
 */
function rotate(nums, k) {
    // Modify in-place and return nums
    
}`,
      python: `def rotate(nums, k):
    pass`,
      cpp: `vector<int> rotate(vector<int>& nums, int k) {
    
}`,
      java: `public int[] rotate(int[] nums, int k) {
    
}`
    },
    hints: ['The easiest way is to use an extra array. Can you do it in-place?', 'Try reversing the entire array, then reverse the first k elements, and finally reverse the rest.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 40,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 70,
    isFaang: true,
    topCompany: 'Amazon',
    order: 9
  },
  {
    slug: 'contiguous-array',
    title: 'Contiguous Array',
    difficulty: 'Medium',
    category: 'Hashing',
    description: `Given a binary array \`nums\`, return the maximum length of a contiguous subarray with an equal number of \`0\` and \`1\`.`,
    examples: [
      { input: 'nums = [0,1]', output: '2', explain: '[0, 1] is the longest contiguous subarray with an equal number of 0 and 1.' },
      { input: 'nums = [0,1,0]', output: '2', explain: '[0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      'nums[i] is either 0 or 1.'
    ],
    testCases: [
      { input: { nums: [0,1] }, expected: 2, functionCall: 'findMaxLength([0,1])' },
      { input: { nums: [0,1,0] }, expected: 2, functionCall: 'findMaxLength([0,1,0])' },
      { input: { nums: [0,0,1,0,0,0,1,1] }, expected: 6, functionCall: 'findMaxLength([0,0,1,0,0,0,1,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxLength(nums) {
    
}`,
      python: `def findMaxLength(nums):
    pass`,
      cpp: `int findMaxLength(vector<int>& nums) {
    
}`,
      java: `public int findMaxLength(int[] nums) {
    
}`
    },
    hints: ['Treat 0s as -1s and 1s as +1s. A contiguous subarray with an equal number of 0s and 1s will have a sum of 0.', 'Keep a running sum and use a hash map to store the first time you see a specific sum.'],
    companies: ['Meta', 'Amazon', 'Google'],
    acceptance: 47,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Meta',
    order: 10
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
