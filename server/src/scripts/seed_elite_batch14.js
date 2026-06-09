const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i^{th}\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4', explain: 'If Koko eats 4 bananas/hour:\nPile 1 (3) takes 1 hour.\nPile 2 (6) takes 2 hours.\nPile 3 (7) takes 2 hours.\nPile 4 (11) takes 3 hours.\nTotal hours = 1 + 2 + 2 + 3 = 8 hours.' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30', explain: '' },
      { input: 'piles = [30,11,23,4,20], h = 6', output: '23', explain: '' }
    ],
    constraints: [
      '1 <= piles.length <= 10^4',
      'piles.length <= h <= 10^9',
      '1 <= piles[i] <= 10^9'
    ],
    testCases: [
      { input: { piles: [3,6,7,11], h: 8 }, expected: 4, functionCall: 'minEatingSpeed([3,6,7,11], 8)' },
      { input: { piles: [30,11,23,4,20], h: 5 }, expected: 30, functionCall: 'minEatingSpeed([30,11,23,4,20], 5)' },
      { input: { piles: [30,11,23,4,20], h: 6 }, expected: 23, functionCall: 'minEatingSpeed([30,11,23,4,20], 6)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
    
}`,
      python: `def minEatingSpeed(piles, h):
    pass`,
      cpp: `int minEatingSpeed(vector<int>& piles, int h) {
    
}`,
      java: `public int minEatingSpeed(int[] piles, int h) {
    
}`
    },
    hints: ['Binary search between 1 and the maximum element in piles.', 'Write a helper function to check if a given eating speed k can finish all piles within h hours.'],
    companies: ['Google', 'Meta', 'Amazon'],
    acceptance: 50,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Google',
    order: 66
  },
  {
    slug: 'search-in-rotated-sorted-array-ii',
    title: 'Search in Rotated Sorted Array II',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `There is an integer array \`nums\` sorted in non-decreasing order (not necessarily with **distinct** values).

Before being passed to your function, \`nums\` is rotated at an unknown pivot index \`k\` (\`0 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (**0-indexed**). For example, \`[0,1,2,4,4,4,5,6,6,7]\` might be rotated at pivot index \`5\` and become \`[4,5,6,6,7,0,1,2,4,4]\`.

Given the array \`nums\` **after** the rotation and an integer \`target\`, return \`true\` if \`target\` is in \`nums\`, or \`false\` if it is not in \`nums\`.

You must decrease the overall operation steps as much as possible.`,
    examples: [
      { input: 'nums = [2,5,6,0,0,1,2], target = 0', output: 'true', explain: '' },
      { input: 'nums = [2,5,6,0,0,1,2], target = 3', output: 'false', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'nums is guaranteed to be rotated at some pivot.',
      '-10^4 <= target <= 10^4'
    ],
    testCases: [
      { input: { nums: [2,5,6,0,0,1,2], target: 0 }, expected: true, functionCall: 'search([2,5,6,0,0,1,2], 0)' },
      { input: { nums: [2,5,6,0,0,1,2], target: 3 }, expected: false, functionCall: 'search([2,5,6,0,0,1,2], 3)' },
      { input: { nums: [1,0,1,1,1], target: 0 }, expected: true, functionCall: 'search([1,0,1,1,1], 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
function search(nums, target) {
    
}`,
      python: `def search(nums, target):
    pass`,
      cpp: `bool search(vector<int>& nums, int target) {
    
}`,
      java: `public boolean search(int[] nums, int target) {
    
}`
    },
    hints: ['This is similar to Search in Rotated Sorted Array, but with duplicates.', 'When nums[mid] == nums[left] == nums[right], you cannot know which part is sorted. In this worst case, you just shrink the search space by left++ and right--.'],
    companies: ['Amazon', 'Microsoft', 'LinkedIn'],
    acceptance: 36,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 67
  },
  {
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times. For example, the array \`nums = [0,1,2,4,5,6,7]\` might become:
- \`[4,5,6,7,0,1,2]\` if it was rotated \`4\` times.
- \`[0,1,2,4,5,6,7]\` if it was rotated \`7\` times.

Notice that rotating an array \`[a[0], a[1], a[2], ..., a[n-1]]\` 1 time results in the array \`[a[n-1], a[0], a[1], a[2], ..., a[n-2]]\`.

Given the sorted rotated array \`nums\` of **unique** elements, return the minimum element of this array.

You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explain: 'The original array was [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explain: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.' },
      { input: 'nums = [11,13,15,17]', output: '11', explain: 'The original array was [11,13,15,17] and it was rotated 4 times.' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All the integers of nums are unique.',
      'nums is sorted and rotated between 1 and n times.'
    ],
    testCases: [
      { input: { nums: [3,4,5,1,2] }, expected: 1, functionCall: 'findMin([3,4,5,1,2])' },
      { input: { nums: [4,5,6,7,0,1,2] }, expected: 0, functionCall: 'findMin([4,5,6,7,0,1,2])' },
      { input: { nums: [11,13,15,17] }, expected: 11, functionCall: 'findMin([11,13,15,17])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
    
}`,
      python: `def findMin(nums):
    pass`,
      cpp: `int findMin(vector<int>& nums) {
    
}`,
      java: `public int findMin(int[] nums) {
    
}`
    },
    hints: ['Array was originally sorted in increasing order, then rotated. This means all elements to the left of the inflection point are > the first element of the array.', 'Use binary search. Compare nums[mid] to nums[right]. If nums[mid] > nums[right], the minimum is to the right. Otherwise, it is to the left or at mid.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 49,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Amazon',
    order: 68
  },
  {
    slug: 'find-minimum-in-rotated-sorted-array-ii',
    title: 'Find Minimum in Rotated Sorted Array II',
    difficulty: 'Hard',
    category: 'Binary Search',
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times. For example, the array \`nums = [0,1,4,4,5,6,7]\` might become:
- \`[4,5,6,7,0,1,4]\` if it was rotated \`4\` times.
- \`[0,1,4,4,5,6,7]\` if it was rotated \`7\` times.

Notice that rotating an array \`[a[0], a[1], a[2], ..., a[n-1]]\` 1 time results in the array \`[a[n-1], a[0], a[1], a[2], ..., a[n-2]]\`.

Given the sorted rotated array \`nums\` that may contain **duplicates**, return the minimum element of this array.

You must decrease the overall operation steps as much as possible.`,
    examples: [
      { input: 'nums = [1,3,5]', output: '1', explain: '' },
      { input: 'nums = [2,2,2,0,1]', output: '0', explain: '' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'nums is sorted and rotated between 1 and n times.'
    ],
    testCases: [
      { input: { nums: [1,3,5] }, expected: 1, functionCall: 'findMin([1,3,5])' },
      { input: { nums: [2,2,2,0,1] }, expected: 0, functionCall: 'findMin([2,2,2,0,1])' },
      { input: { nums: [3,3,1,3] }, expected: 1, functionCall: 'findMin([3,3,1,3])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
    
}`,
      python: `def findMin(nums):
    pass`,
      cpp: `int findMin(vector<int>& nums) {
    
}`,
      java: `public int findMin(int[] nums) {
    
}`
    },
    hints: ['Similar to the problem with unique elements, but what if nums[mid] == nums[right]?', 'In this case, you cannot be sure if the minimum is to the left or right. But you can safely decrement the right pointer: right--.'],
    companies: ['Meta', 'Apple', 'Microsoft'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Meta',
    order: 69
  },
  {
    slug: 'find-first-and-last-position-of-element-in-sorted-array',
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.

If \`target\` is not found in the array, return \`[-1, -1]\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]', explain: '' },
      { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]', explain: '' },
      { input: 'nums = [], target = 0', output: '[-1,-1]', explain: '' }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
      'nums is a non-decreasing array.',
      '-10^9 <= target <= 10^9'
    ],
    testCases: [
      { input: { nums: [5,7,7,8,8,10], target: 8 }, expected: [3,4], functionCall: 'searchRange([5,7,7,8,8,10], 8)' },
      { input: { nums: [5,7,7,8,8,10], target: 6 }, expected: [-1,-1], functionCall: 'searchRange([5,7,7,8,8,10], 6)' },
      { input: { nums: [], target: 0 }, expected: [-1,-1], functionCall: 'searchRange([], 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    
}`,
      python: `def searchRange(nums, target):
    pass`,
      cpp: `vector<int> searchRange(vector<int>& nums, int target) {
    
}`,
      java: `public int[] searchRange(int[] nums, int target) {
    
}`
    },
    hints: ['Perform two binary searches.', 'The first binary search finds the first occurrence of target (lower bound).', 'The second binary search finds the last occurrence of target (upper bound).'],
    companies: ['Amazon', 'Google', 'Meta'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 70
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
