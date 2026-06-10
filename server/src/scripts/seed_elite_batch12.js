const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'sort-array-by-parity',
    title: 'Sort Array By Parity',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given an integer array \`nums\`, move all the even integers at the beginning of the array followed by all the odd integers.

Return **any array** that satisfies this condition.`,
    examples: [
      { input: 'nums = [3,1,2,4]', output: '[2,4,3,1]', explain: 'The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.' },
      { input: 'nums = [0]', output: '[0]', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '0 <= nums[i] <= 5000'
    ],
    testCases: [
      { input: { nums: [3,1,2,4] }, expected: [2,4,3,1], functionCall: 'sortArrayByParity([3,1,2,4])' },
      { input: { nums: [0] }, expected: [0], functionCall: 'sortArrayByParity([0])' },
      { input: { nums: [1,3,5] }, expected: [1,3,5], functionCall: 'sortArrayByParity([1,3,5])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParity(nums) {
    
}`,
      python: `def sortArrayByParity(nums):
    pass`,
      cpp: `vector<int> sortArrayByParity(vector<int>& nums) {
    
}`,
      java: `public int[] sortArrayByParity(int[] nums) {
    
}`
    },
    hints: ['In-place swap can be done with two pointers. One from the start looking for odd numbers, and one from the end looking for even numbers.', 'Whenever you find a mismatch, swap them!'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 75,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 68,
    isFaang: true,
    topCompany: 'Amazon',
    order: 56
  },
  {
    slug: 'reverse-vowels-of-a-string',
    title: 'Reverse Vowels of a String',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given a string \`s\`, reverse only all the vowels in the string and return it.

The vowels are \`'a'\`, \`'e'\`, \`'i'\`, \`'o'\`, and \`'u'\`, and they can appear in both lower and upper cases, more than once.`,
    examples: [
      { input: 's = "hello"', output: '"holle"', explain: '' },
      { input: 's = "leetcode"', output: '"leotcede"', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 3 * 10^5',
      's consist of printable ASCII characters.'
    ],
    testCases: [
      { input: { s: "hello" }, expected: "holle", functionCall: 'reverseVowels("hello")' },
      { input: { s: "leetcode" }, expected: "leotcede", functionCall: 'reverseVowels("leetcode")' },
      { input: { s: "aA" }, expected: "Aa", functionCall: 'reverseVowels("aA")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function reverseVowels(s) {
    
}`,
      python: `def reverseVowels(s):
    pass`,
      cpp: `string reverseVowels(string s) {
    
}`,
      java: `public String reverseVowels(String s) {
    
}`
    },
    hints: ['Use two pointers, one from the start and one from the end.', 'Move the start pointer forward until it finds a vowel, and the end pointer backward until it finds a vowel. Swap them and continue.'],
    companies: ['Amazon', 'Apple', 'Microsoft'],
    acceptance: 53,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 70,
    isFaang: true,
    topCompany: 'Apple',
    order: 57
  },
  {
    slug: 'push-dominoes',
    title: 'Push Dominoes',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: `There are \`n\` dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

You are given a string \`dominoes\` representing the initial state where:
- \`'L'\`, if the \`i^{th}\` domino has been pushed to the left,
- \`'R'\`, if the \`i^{th}\` domino has been pushed to the right, and
- \`'.'\`, if the \`i^{th}\` domino has not been pushed.

Return a string representing the final state.`,
    examples: [
      { input: 'dominoes = "RR.L"', output: '"RR.L"', explain: 'The first domino expends no additional force on the second domino.' },
      { input: 'dominoes = ".L.R...LR..L.."', output: '"LL.RR.LLRRLL.."', explain: '' }
    ],
    constraints: [
      'n == dominoes.length',
      '1 <= n <= 10^5',
      'dominoes[i] is either \'L\', \'R\', or \'.\'.'
    ],
    testCases: [
      { input: { dominoes: "RR.L" }, expected: "RR.L", functionCall: 'pushDominoes("RR.L")' },
      { input: { dominoes: ".L.R...LR..L.." }, expected: "LL.RR.LLRRLL..", functionCall: 'pushDominoes(".L.R...LR..L..")' },
      { input: { dominoes: "L.....R" }, expected: "L.....R", functionCall: 'pushDominoes("L.....R")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} dominoes
 * @return {string}
 */
function pushDominoes(dominoes) {
    
}`,
      python: `def pushDominoes(dominoes):
    pass`,
      cpp: `string pushDominoes(string dominoes) {
    
}`,
      java: `public String pushDominoes(String dominoes) {
    
}`
    },
    hints: ['Find the forces acting on each domino. For each domino, find the closest domino falling to the left and the closest domino falling to the right.', 'You can do this by maintaining two passes (left to right, and right to left) tracking the distance to the nearest L or R.'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Google',
    order: 58
  },
  {
    slug: 'valid-triangle-number',
    title: 'Valid Triangle Number',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: `Given an integer array \`nums\`, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.`,
    examples: [
      { input: 'nums = [2,2,3,4]', output: '3', explain: 'Valid combinations are: \n2,3,4 (using the first 2)\n2,3,4 (using the second 2)\n2,2,3' },
      { input: 'nums = [4,2,3,4]', output: '4', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 1000',
      '0 <= nums[i] <= 1000'
    ],
    testCases: [
      { input: { nums: [2,2,3,4] }, expected: 3, functionCall: 'triangleNumber([2,2,3,4])' },
      { input: { nums: [4,2,3,4] }, expected: 4, functionCall: 'triangleNumber([4,2,3,4])' },
      { input: { nums: [0,0,0] }, expected: 0, functionCall: 'triangleNumber([0,0,0])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function triangleNumber(nums) {
    
}`,
      python: `def triangleNumber(nums):
    pass`,
      cpp: `int triangleNumber(vector<int>& nums) {
    
}`,
      java: `public int triangleNumber(int[] nums) {
    
}`
    },
    hints: ['Sort the array first.', 'For any triangle to be valid, the sum of its two smaller sides must be greater than the largest side. Fix the largest side and use a two-pointer approach to find valid pairs of the smaller sides.'],
    companies: ['LinkedIn', 'Google', 'Amazon'],
    acceptance: 51,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 73,
    isFaang: true,
    topCompany: 'LinkedIn',
    order: 59
  },
  {
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explain: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explain: '2 does not exist in nums so return -1.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    testCases: [
      { input: { nums: [-1,0,3,5,9,12], target: 9 }, expected: 4, functionCall: 'search([-1,0,3,5,9,12], 9)' },
      { input: { nums: [-1,0,3,5,9,12], target: 2 }, expected: -1, functionCall: 'search([-1,0,3,5,9,12], 2)' },
      { input: { nums: [5], target: 5 }, expected: 0, functionCall: 'search([5], 5)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    
}`,
      python: `def search(nums, target):
    pass`,
      cpp: `int search(vector<int>& nums, int target) {
    
}`,
      java: `public int search(int[] nums, int target) {
    
}`
    },
    hints: ['Keep track of a left pointer and a right pointer. Calculate the mid point.', 'If the mid point value is equal to target, return mid. If it is smaller than target, move left pointer to mid + 1. If it is greater than target, move right pointer to mid - 1.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Amazon',
    order: 60
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
