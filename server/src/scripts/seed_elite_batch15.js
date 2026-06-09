const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'find-peak-element',
    title: 'Find Peak Element',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that \`nums[-1] = nums[n] = -∞\`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '2', explain: '3 is a peak element and your function should return the index number 2.' },
      { input: 'nums = [1,2,1,3,5,6,4]', output: '5', explain: 'Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.' }
    ],
    constraints: [
      '1 <= nums.length <= 1000',
      '-2^31 <= nums[i] <= 2^31 - 1',
      'nums[i] != nums[i + 1] for all valid i.'
    ],
    testCases: [
      { input: { nums: [1,2,3,1] }, expected: 2, functionCall: 'findPeakElement([1,2,3,1])' },
      { input: { nums: [1] }, expected: 0, functionCall: 'findPeakElement([1])' },
      { input: { nums: [2,1] }, expected: 0, functionCall: 'findPeakElement([2,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findPeakElement(nums) {
    
}`,
      python: `def findPeakElement(nums):
    pass`,
      cpp: `int findPeakElement(vector<int>& nums) {
    
}`,
      java: `public int findPeakElement(int[] nums) {
    
}`
    },
    hints: ['If nums[mid] < nums[mid + 1], then there must be a peak to the right of mid.', 'If nums[mid] > nums[mid + 1], then there must be a peak to the left of mid (or mid itself is a peak).'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Google',
    order: 71
  },
  {
    slug: 'split-array-largest-sum',
    title: 'Split Array Largest Sum',
    difficulty: 'Hard',
    category: 'Binary Search',
    description: `Given an integer array \`nums\` and an integer \`k\`, split \`nums\` into \`k\` non-empty subarrays such that the largest sum of any subarray is **minimized**.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.`,
    examples: [
      { input: 'nums = [7,2,5,10,8], k = 2', output: '18', explain: 'There are four ways to split nums into two subarrays.\nThe best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.' },
      { input: 'nums = [1,2,3,4,5], k = 2', output: '9', explain: '' },
      { input: 'nums = [1,4,4], k = 3', output: '4', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 1000',
      '0 <= nums[i] <= 10^6',
      '1 <= k <= min(50, nums.length)'
    ],
    testCases: [
      { input: { nums: [7,2,5,10,8], k: 2 }, expected: 18, functionCall: 'splitArray([7,2,5,10,8], 2)' },
      { input: { nums: [1,2,3,4,5], k: 2 }, expected: 9, functionCall: 'splitArray([1,2,3,4,5], 2)' },
      { input: { nums: [1,4,4], k: 3 }, expected: 4, functionCall: 'splitArray([1,4,4], 3)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function splitArray(nums, k) {
    
}`,
      python: `def splitArray(nums, k):
    pass`,
      cpp: `int splitArray(vector<int>& nums, int k) {
    
}`,
      java: `public int splitArray(int[] nums, int k) {
    
}`
    },
    hints: ['The answer is between maximum value of input array numbers and sum of those numbers.', 'Use binary search to approach the correct answer. We have l = max number of array; r = sum of all numbers in the array; Every time we do mid = (l + r) / 2;', 'Use greedy to guess if mid is fine. If mid can satisfy the condition, we can try a smaller one by setting r = mid. Otherwise, we try a larger one by setting l = mid + 1.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Google',
    order: 72
  },
  {
    slug: 'capacity-to-ship-packages-within-d-days',
    title: 'Capacity To Ship Packages Within D Days',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`i^{th}\` package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by \`weights\`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.`,
    examples: [
      { input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', output: '15', explain: 'A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:\n1st day: 1, 2, 3, 4, 5\n2nd day: 6, 7\n3rd day: 8\n4th day: 9\n5th day: 10' },
      { input: 'weights = [3,2,2,4,1,4], days = 3', output: '6', explain: 'A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:\n1st day: 3, 2\n2nd day: 2, 4\n3rd day: 1, 4' }
    ],
    constraints: [
      '1 <= days <= weights.length <= 5 * 10^4',
      '1 <= weights[i] <= 500'
    ],
    testCases: [
      { input: { weights: [1,2,3,4,5,6,7,8,9,10], days: 5 }, expected: 15, functionCall: 'shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)' },
      { input: { weights: [3,2,2,4,1,4], days: 3 }, expected: 6, functionCall: 'shipWithinDays([3,2,2,4,1,4], 3)' },
      { input: { weights: [1,2,3,1,1], days: 4 }, expected: 3, functionCall: 'shipWithinDays([1,2,3,1,1], 4)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
function shipWithinDays(weights, days) {
    
}`,
      python: `def shipWithinDays(weights, days):
    pass`,
      cpp: `int shipWithinDays(vector<int>& weights, int days) {
    
}`,
      java: `public int shipWithinDays(int[] weights, int days) {
    
}`
    },
    hints: ['Binary search on the answer. The search space is between max(weights) and sum(weights).', 'For a given capacity, count the number of days needed. If the days needed > target days, the capacity is too small.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 68,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 77,
    isFaang: true,
    topCompany: 'Amazon',
    order: 73
  },
  {
    slug: 'kth-missing-positive-number',
    title: 'Kth Missing Positive Number',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `Given an array \`arr\` of positive integers sorted in a **strictly increasing order**, and an integer \`k\`.

Return the \`k^{th}\` positive integer that is **missing** from this array.`,
    examples: [
      { input: 'arr = [2,3,4,7,11], k = 5', output: '9', explain: 'The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.' },
      { input: 'arr = [1,2,3,4], k = 2', output: '6', explain: 'The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.' }
    ],
    constraints: [
      '1 <= arr.length <= 1000',
      '1 <= arr[i] <= 1000',
      '1 <= k <= 1000',
      'arr[i] < arr[j] for 1 <= i < j <= arr.length'
    ],
    testCases: [
      { input: { arr: [2,3,4,7,11], k: 5 }, expected: 9, functionCall: 'findKthPositive([2,3,4,7,11], 5)' },
      { input: { arr: [1,2,3,4], k: 2 }, expected: 6, functionCall: 'findKthPositive([1,2,3,4], 2)' },
      { input: { arr: [2], k: 1 }, expected: 1, functionCall: 'findKthPositive([2], 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
function findKthPositive(arr, k) {
    
}`,
      python: `def findKthPositive(arr, k):
    pass`,
      cpp: `int findKthPositive(vector<int>& arr, int k) {
    
}`,
      java: `public int findKthPositive(int[] arr, int k) {
    
}`
    },
    hints: ['The number of missing positive integers before index i is arr[i] - i - 1.', 'Use binary search to find the index i such that the number of missing positive integers before index i is less than k, but before index i+1 is greater than or equal to k.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 59,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Meta',
    order: 74
  },
  {
    slug: 'search-a-2d-matrix-ii',
    title: 'Search a 2D Matrix II',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `Write an efficient algorithm that searches for a value \`target\` in an \`m x n\` integer matrix \`matrix\`. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.`,
    examples: [
      { input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5', output: 'true', explain: '' },
      { input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20', output: 'false', explain: '' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= n, m <= 300',
      '-10^9 <= matrix[i][j] <= 10^9',
      'Every row and column is sorted in ascending order.',
      '-10^9 <= target <= 10^9'
    ],
    testCases: [
      { input: { matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5 }, expected: true, functionCall: 'searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5)' },
      { input: { matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20 }, expected: false, functionCall: 'searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20)' },
      { input: { matrix: [[-1,3]], target: 3 }, expected: true, functionCall: 'searchMatrix([[-1,3]], 3)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    
}`,
      python: `def searchMatrix(matrix, target):
    pass`,
      cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    
}`,
      java: `public boolean searchMatrix(int[][] matrix, int target) {
    
}`
    },
    hints: ['Start your search at the top-right corner.', 'If the current element is greater than the target, you can safely eliminate the current column (move left).', 'If the current element is less than the target, you can safely eliminate the current row (move down).'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 52,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 90,
    isFaang: true,
    topCompany: 'Amazon',
    order: 75
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
