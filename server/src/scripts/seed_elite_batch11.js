const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'maximum-points-you-can-obtain-from-cards',
    title: 'Maximum Points You Can Obtain from Cards',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `There are several cards **arranged in a row**, and each card has an associated number of points. The points are given in the integer array \`cardPoints\`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly \`k\` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array \`cardPoints\` and the integer \`k\`, return the **maximum score** you can obtain.`,
    examples: [
      { input: 'cardPoints = [1,2,3,4,5,6,1], k = 3', output: '12', explain: 'After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.' },
      { input: 'cardPoints = [2,2,2], k = 2', output: '4', explain: 'Regardless of which two cards you take, your score will always be 4.' },
      { input: 'cardPoints = [9,7,7,9,7,7,9], k = 7', output: '55', explain: 'You have to take all the cards. Your score is the sum of points of all cards.' }
    ],
    constraints: [
      '1 <= cardPoints.length <= 10^5',
      '1 <= cardPoints[i] <= 10^4',
      '1 <= k <= cardPoints.length'
    ],
    testCases: [
      { input: { cardPoints: [1,2,3,4,5,6,1], k: 3 }, expected: 12, functionCall: 'maxScore([1,2,3,4,5,6,1], 3)' },
      { input: { cardPoints: [2,2,2], k: 2 }, expected: 4, functionCall: 'maxScore([2,2,2], 2)' },
      { input: { cardPoints: [9,7,7,9,7,7,9], k: 7 }, expected: 55, functionCall: 'maxScore([9,7,7,9,7,7,9], 7)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
function maxScore(cardPoints, k) {
    
}`,
      python: `def maxScore(cardPoints, k):
    pass`,
      cpp: `int maxScore(vector<int>& cardPoints, int k) {
    
}`,
      java: `public int maxScore(int[] cardPoints, int k) {
    
}`
    },
    hints: ['Let the sum of all points be total_pts. You need to remove a sub-array from cardPoints with length n - k.', 'Keep a window of size n - k over the array. The answer is max(answer, total_pts - sumOfCurrentWindow).'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 52,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Google',
    order: 51
  },
  {
    slug: 'subarrays-with-k-different-integers',
    title: 'Subarrays with K Different Integers',
    difficulty: 'Hard',
    category: 'Sliding Window',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the number of **good subarrays** of \`nums\`.

A **good array** is an array where the number of different integers in that array is exactly \`k\`.

For example, \`[1,2,3,1,2]\` has \`3\` different integers: \`1\`, \`2\`, and \`3\`.
A subarray is a **contiguous** part of an array.`,
    examples: [
      { input: 'nums = [1,2,1,2,3], k = 2', output: '7', explain: 'Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]' },
      { input: 'nums = [1,2,1,3,4], k = 3', output: '3', explain: 'Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].' }
    ],
    constraints: [
      '1 <= nums.length <= 2 * 10^4',
      '1 <= nums[i], k <= nums.length'
    ],
    testCases: [
      { input: { nums: [1,2,1,2,3], k: 2 }, expected: 7, functionCall: 'subarraysWithKDistinct([1,2,1,2,3], 2)' },
      { input: { nums: [1,2,1,3,4], k: 3 }, expected: 3, functionCall: 'subarraysWithKDistinct([1,2,1,3,4], 3)' },
      { input: { nums: [1,2], k: 1 }, expected: 2, functionCall: 'subarraysWithKDistinct([1,2], 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraysWithKDistinct(nums, k) {
    
}`,
      python: `def subarraysWithKDistinct(nums, k):
    pass`,
      cpp: `int subarraysWithKDistinct(vector<int>& nums, int k) {
    
}`,
      java: `public int subarraysWithKDistinct(int[] nums, int k) {
    
}`
    },
    hints: ['Write a helper function to find the number of subarrays with at most k distinct elements.', 'The number of subarrays with exactly k distinct elements is exactly the number of subarrays with at most k distinct elements minus the number of subarrays with at most k - 1 distinct elements.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 91,
    isFaang: true,
    topCompany: 'Amazon',
    order: 52
  },
  {
    slug: 'minimum-number-of-flips-to-make-the-binary-string-alternating',
    title: 'Minimum Number of Flips to Make the Binary String Alternating',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `You are given a binary string \`s\`. You are allowed to perform two types of operations on the string in any sequence:

- **Type-1: Remove** the character at the start of the string \`s\` and **append** it to the end of the string.
- **Type-2: Pick** any character in \`s\` and **flip** its value, i.e., if its value is \`'0'\` it becomes \`'1'\` and vice-versa.

Return the **minimum** number of **type-2** operations you need to perform such that \`s\` becomes alternating.

The string is called alternating if no two adjacent characters are equal. For example, the strings \`"010"\` and \`"1010"\` are alternating.`,
    examples: [
      { input: 's = "111000"', output: '2', explain: 'Use type-1 operation 2 times to obtain "100011". Then use type-2 on the third and sixth characters to obtain "101010".' },
      { input: 's = "010"', output: '0', explain: 'The string is already alternating.' },
      { input: 's = "1110"', output: '1', explain: 'Use type-2 operation on the second character to obtain "1010".' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is either \'0\' or \'1\'.'
    ],
    testCases: [
      { input: { s: "111000" }, expected: 2, functionCall: 'minFlips("111000")' },
      { input: { s: "010" }, expected: 0, functionCall: 'minFlips("010")' },
      { input: { s: "1110" }, expected: 1, functionCall: 'minFlips("1110")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function minFlips(s) {
    
}`,
      python: `def minFlips(s):
    pass`,
      cpp: `int minFlips(string s) {
    
}`,
      java: `public int minFlips(String s) {
    
}`
    },
    hints: ['Double the string (s + s) to easily simulate the Type-1 operation using a sliding window.', 'Create two alternating strings of the same length as s + s, one starting with 0 and one starting with 1.', 'Use a sliding window of size n (length of original s) and keep track of differences.'],
    companies: ['Google', 'Amazon', 'Apple'],
    acceptance: 39,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 76,
    isFaang: true,
    topCompany: 'Google',
    order: 53
  },
  {
    slug: 'get-equal-substrings-within-budget',
    title: 'Get Equal Substrings Within Budget',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `You are given two strings \`s\` and \`t\` of the same length and an integer \`maxCost\`.

You want to change \`s\` to \`t\`. Changing the \`i^{th}\` character of \`s\` to \`i^{th}\` character of \`t\` costs \`|s[i] - t[i]|\` (i.e., the absolute difference between the ASCII values of the characters).

Return the maximum length of a substring of \`s\` that can be changed to be the same as the corresponding substring of \`t\` with a cost less than or equal to \`maxCost\`. If there is no substring from \`s\` that can be changed to its corresponding substring from \`t\`, return \`0\`.`,
    examples: [
      { input: 's = "abcd", t = "bcdf", maxCost = 3', output: '3', explain: '"abc" of s can change to "bcd". That costs 3, so the maximum length is 3.' },
      { input: 's = "abcd", t = "cdef", maxCost = 3', output: '1', explain: 'Each character in s costs 2 to change to character in t, so the maximum length is 1.' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      't.length == s.length',
      '0 <= maxCost <= 10^6',
      's and t consist of only lowercase English letters.'
    ],
    testCases: [
      { input: { s: "abcd", t: "bcdf", maxCost: 3 }, expected: 3, functionCall: 'equalSubstring("abcd", "bcdf", 3)' },
      { input: { s: "abcd", t: "cdef", maxCost: 3 }, expected: 1, functionCall: 'equalSubstring("abcd", "cdef", 3)' },
      { input: { s: "abcd", t: "acde", maxCost: 0 }, expected: 1, functionCall: 'equalSubstring("abcd", "acde", 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
function equalSubstring(s, t, maxCost) {
    
}`,
      python: `def equalSubstring(s, t, maxCost):
    pass`,
      cpp: `int equalSubstring(string s, string t, int maxCost) {
    
}`,
      java: `public int equalSubstring(String s, String t, int maxCost) {
    
}`
    },
    hints: ['Calculate the differences between s[i] and t[i] as an array of costs.', 'Find the longest subarray of this costs array such that the sum is less than or equal to maxCost. Use a sliding window!'],
    companies: ['Meta', 'Apple', 'Google'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Meta',
    order: 54
  },
  {
    slug: 'find-k-closest-elements',
    title: 'Find K Closest Elements',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: `Given a **sorted** integer array \`arr\`, two integers \`k\` and \`x\`, return the \`k\` closest integers to \`x\` in the array. The result should also be sorted in ascending order.

An integer \`a\` is closer to \`x\` than an integer \`b\` if:
- \`|a - x| < |b - x|\`, or
- \`|a - x| == |b - x|\` and \`a < b\``,
    examples: [
      { input: 'arr = [1,2,3,4,5], k = 4, x = 3', output: '[1,2,3,4]', explain: '' },
      { input: 'arr = [1,2,3,4,5], k = 4, x = -1', output: '[1,2,3,4]', explain: '' }
    ],
    constraints: [
      '1 <= k <= arr.length',
      '1 <= arr.length <= 10^4',
      'arr is sorted in ascending order.',
      '-10^4 <= arr[i], x <= 10^4'
    ],
    testCases: [
      { input: { arr: [1,2,3,4,5], k: 4, x: 3 }, expected: [1,2,3,4], functionCall: 'findClosestElements([1,2,3,4,5], 4, 3)' },
      { input: { arr: [1,2,3,4,5], k: 4, x: -1 }, expected: [1,2,3,4], functionCall: 'findClosestElements([1,2,3,4,5], 4, -1)' },
      { input: { arr: [1,2,3,4,5], k: 4, x: 6 }, expected: [2,3,4,5], functionCall: 'findClosestElements([1,2,3,4,5], 4, 6)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
function findClosestElements(arr, k, x) {
    
}`,
      python: `def findClosestElements(arr, k, x):
    pass`,
      cpp: `vector<int> findClosestElements(vector<int>& arr, int k, int x) {
    
}`,
      java: `public List<Integer> findClosestElements(int[] arr, int k, int x) {
    
}`
    },
    hints: ['The array is sorted. Think about binary search to find the closest element or the starting index of the window.', 'Alternatively, use two pointers from both ends and eliminate the element that is further away from x until only k elements remain.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 47,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 55
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
