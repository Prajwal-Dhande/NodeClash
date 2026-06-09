const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'maximum-erasure-value',
    title: 'Maximum Erasure Value',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `You are given an array of positive integers \`nums\` and want to erase a subarray containing **unique elements**. The **score** you get by erasing the subarray is equal to the **sum** of its elements.

Return the **maximum score** you can get by erasing **exactly one** subarray.

An array \`b\` is called to be a subarray of \`a\` if it forms a contiguous subsequence of \`a\`, that is, if it is equal to \`a[l],a[l+1],...,a[r]\` for some \`(l,r)\`.`,
    examples: [
      { input: 'nums = [4,2,4,5,6]', output: '17', explain: 'The optimal subarray here is [2,4,5,6] with a sum of 17.' },
      { input: 'nums = [5,2,1,2,5,2,1,2,5]', output: '8', explain: 'The optimal subarray here is [5,2,1] or [1,2,5] with a sum of 8.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '1 <= nums[i] <= 10^4'
    ],
    testCases: [
      { input: { nums: [4,2,4,5,6] }, expected: 17, functionCall: 'maximumUniqueSubarray([4,2,4,5,6])' },
      { input: { nums: [5,2,1,2,5,2,1,2,5] }, expected: 8, functionCall: 'maximumUniqueSubarray([5,2,1,2,5,2,1,2,5])' },
      { input: { nums: [10000,1,10000,1,1,1,1,1,1] }, expected: 10001, functionCall: 'maximumUniqueSubarray([10000,1,10000,1,1,1,1,1,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maximumUniqueSubarray(nums) {
    
}`,
      python: `def maximumUniqueSubarray(nums):
    pass`,
      cpp: `int maximumUniqueSubarray(vector<int>& nums) {
    
}`,
      java: `public int maximumUniqueSubarray(int[] nums) {
    
}`
    },
    hints: ['The main point here is for the subarray to contain unique elements.', 'Use a Hash Set to track the unique elements, and a sliding window to maximize the sum.'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 71,
    isFaang: true,
    topCompany: 'Google',
    order: 46
  },
  {
    slug: 'max-consecutive-ones-iii',
    title: 'Max Consecutive Ones III',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `Given a binary array \`nums\` and an integer \`k\`, return the maximum number of consecutive \`1\`'s in the array if you can flip at most \`k\` \`0\`'s.`,
    examples: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6', explain: 'The subarray [1,1,1,0,0,1,1,1,1,1,1] has flipped the 0s at indices 5 and 10 from the original array to achieve 6 consecutive 1s.' },
      { input: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3', output: '10', explain: 'The subarray [0,0,1,1,1,1,1,1,1,1,1,1] achieved by flipping 0s at indices 4, 5, and 9.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      'nums[i] is either 0 or 1.',
      '0 <= k <= nums.length'
    ],
    testCases: [
      { input: { nums: [1,1,1,0,0,0,1,1,1,1,0], k: 2 }, expected: 6, functionCall: 'longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)' },
      { input: { nums: [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k: 3 }, expected: 10, functionCall: 'longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)' },
      { input: { nums: [0,0,0,0], k: 0 }, expected: 0, functionCall: 'longestOnes([0,0,0,0], 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function longestOnes(nums, k) {
    
}`,
      python: `def longestOnes(nums, k):
    pass`,
      cpp: `int longestOnes(vector<int>& nums, int k) {
    
}`,
      java: `public int longestOnes(int[] nums, int k) {
    
}`
    },
    hints: ['Think of this as: Find the longest subarray with at most K zeros.', 'Use a sliding window. When the number of zeros in the window exceeds K, shrink the window from the left.'],
    companies: ['Meta', 'Amazon', 'Google'],
    acceptance: 63,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Meta',
    order: 47
  },
  {
    slug: 'fruit-into-baskets',
    title: 'Fruit Into Baskets',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array \`fruits\` where \`fruits[i]\` is the **type** of fruit the \`i^{th}\` tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
- You only have **two** baskets, and each basket can hold **only a single type** of fruit. There is no limit on the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick **exactly one fruit** from **every** tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array \`fruits\`, return the **maximum** number of fruits you can pick.`,
    examples: [
      { input: 'fruits = [1,2,1]', output: '3', explain: 'We can pick from all 3 trees.' },
      { input: 'fruits = [0,1,2,2]', output: '3', explain: 'We can pick from trees [1,2,2]. If we had started at the first tree, we would only pick from trees [0,1].' },
      { input: 'fruits = [1,2,3,2,2]', output: '4', explain: 'We can pick from trees [2,3,2,2]. If we had started at the first tree, we would only pick from trees [1,2].' }
    ],
    constraints: [
      '1 <= fruits.length <= 10^5',
      '0 <= fruits[i] < fruits.length'
    ],
    testCases: [
      { input: { fruits: [1,2,1] }, expected: 3, functionCall: 'totalFruit([1,2,1])' },
      { input: { fruits: [0,1,2,2] }, expected: 3, functionCall: 'totalFruit([0,1,2,2])' },
      { input: { fruits: [1,2,3,2,2] }, expected: 4, functionCall: 'totalFruit([1,2,3,2,2])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} fruits
 * @return {number}
 */
function totalFruit(fruits) {
    
}`,
      python: `def totalFruit(fruits):
    pass`,
      cpp: `int totalFruit(vector<int>& fruits) {
    
}`,
      java: `public int totalFruit(int[] fruits) {
    
}`
    },
    hints: ['This is equivalent to finding the longest subarray with at most two distinct elements.', 'Use a sliding window with a hash map to keep track of the fruit types.'],
    companies: ['Google', 'Amazon', 'Apple'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Google',
    order: 48
  },
  {
    slug: 'longest-subarray-of-1s-after-deleting-one-element',
    title: 'Longest Subarray of 1\'s After Deleting One Element',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `Given a binary array \`nums\`, you should delete one element from it.

Return the size of the longest non-empty subarray containing only \`1\`'s in the resulting array. Return \`0\` if there is no such subarray.`,
    examples: [
      { input: 'nums = [1,1,0,1]', output: '3', explain: 'After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1\'s.' },
      { input: 'nums = [0,1,1,1,0,1,1,0,1]', output: '5', explain: 'After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1\'s is [1,1,1,1,1].' },
      { input: 'nums = [1,1,1]', output: '2', explain: 'You must delete one element.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      'nums[i] is either 0 or 1.'
    ],
    testCases: [
      { input: { nums: [1,1,0,1] }, expected: 3, functionCall: 'longestSubarray([1,1,0,1])' },
      { input: { nums: [0,1,1,1,0,1,1,0,1] }, expected: 5, functionCall: 'longestSubarray([0,1,1,1,0,1,1,0,1])' },
      { input: { nums: [1,1,1] }, expected: 2, functionCall: 'longestSubarray([1,1,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestSubarray(nums) {
    
}`,
      python: `def longestSubarray(nums):
    pass`,
      cpp: `int longestSubarray(vector<int>& nums) {
    
}`,
      java: `public int longestSubarray(int[] nums) {
    
}`
    },
    hints: ['This is similar to Max Consecutive Ones III, but here k = 1 and we MUST delete an element.', 'Maintain a window with at most one zero. The length of the window minus one gives the size of the subarray of ones.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 66,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 74,
    isFaang: true,
    topCompany: 'Amazon',
    order: 49
  },
  {
    slug: 'number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold',
    title: 'Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `Given an array of integers \`arr\` and two integers \`k\` and \`threshold\`, return the number of sub-arrays of size \`k\` and average greater than or equal to \`threshold\`.`,
    examples: [
      { input: 'arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4', output: '3', explain: 'Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).' },
      { input: 'arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5', output: '6', explain: 'The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.' }
    ],
    constraints: [
      '1 <= arr.length <= 10^5',
      '1 <= arr[i] <= 10^4',
      '1 <= k <= arr.length',
      '0 <= threshold <= 10^4'
    ],
    testCases: [
      { input: { arr: [2,2,2,2,5,5,5,8], k: 3, threshold: 4 }, expected: 3, functionCall: 'numOfSubarrays([2,2,2,2,5,5,5,8], 3, 4)' },
      { input: { arr: [11,13,17,23,29,31,7,5,2,3], k: 3, threshold: 5 }, expected: 6, functionCall: 'numOfSubarrays([11,13,17,23,29,31,7,5,2,3], 3, 5)' },
      { input: { arr: [1,1,1,1,1], k: 1, threshold: 0 }, expected: 5, functionCall: 'numOfSubarrays([1,1,1,1,1], 1, 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
function numOfSubarrays(arr, k, threshold) {
    
}`,
      python: `def numOfSubarrays(arr, k, threshold):
    pass`,
      cpp: `int numOfSubarrays(vector<int>& arr, int k, int threshold) {
    
}`,
      java: `public int numOfSubarrays(int[] arr, int k, int threshold) {
    
}`
    },
    hints: ['Average >= threshold is equivalent to sum >= k * threshold.', 'Maintain a sliding window of size k and calculate the sum. If the sum is >= target sum, increment the count.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 68,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 61,
    isFaang: true,
    topCompany: 'Amazon',
    order: 50
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
