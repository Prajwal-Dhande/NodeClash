const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'encode-and-decode-strings',
    title: 'Encode and Decode Strings',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: `Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement \`encode\` and \`decode\` functions.`,
    examples: [
      { input: '["lint","code","love","you"]', output: '["lint","code","love","you"]', explain: 'One possible encode method is: "lint:;code:;love:;you"' },
      { input: '["we", "say", ":", "yes"]', output: '["we", "say", ":", "yes"]', explain: 'One possible encode method is: "we:;say:;::;yes"' }
    ],
    constraints: [
      '0 <= strs.length < 100',
      '0 <= strs[i].length < 200',
      'strs[i] contains any possible characters out of 256 valid ASCII characters.'
    ],
    testCases: [
      { input: { strs: ["lint","code","love","you"] }, expected: ["lint","code","love","you"], functionCall: 'decode(encode(["lint","code","love","you"]))' },
      { input: { strs: ["we", "say", ":", "yes"] }, expected: ["we", "say", ":", "yes"], functionCall: 'decode(encode(["we", "say", ":", "yes"]))' },
      { input: { strs: [""] }, expected: [""], functionCall: 'decode(encode([""]))' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @returns {string}
 */
function encode(strs) {
    // Write your code here
    
}

/**
 * @param {string} str
 * @returns {string[]}
 */
function decode(str) {
    // Write your code here
    
}`,
      python: `def encode(strs):
    pass
    
def decode(str):
    pass`,
      cpp: `string encode(vector<string>& strs) {
    
}
vector<string> decode(string s) {
    
}`,
      java: `public String encode(List<String> strs) {
    
}
public List<String> decode(String s) {
    
}`
    },
    hints: ['Think about using a length prefix followed by a delimiter.', 'What if the delimiter is in the string? A length prefix guarantees you read the exact number of characters.'],
    companies: ['Google', 'Meta', 'LinkedIn'],
    acceptance: 48,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Google',
    order: 1
  },
  {
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in \`O(n)\` time.`,
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explain: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9', explain: 'The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. Therefore its length is 9.' }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    testCases: [
      { input: { nums: [100,4,200,1,3,2] }, expected: 4, functionCall: 'longestConsecutive([100,4,200,1,3,2])' },
      { input: { nums: [0,3,7,2,5,8,4,6,0,1] }, expected: 9, functionCall: 'longestConsecutive([0,3,7,2,5,8,4,6,0,1])' },
      { input: { nums: [] }, expected: 0, functionCall: 'longestConsecutive([])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
    
}`,
      python: `def longestConsecutive(nums):
    pass`,
      cpp: `int longestConsecutive(vector<int>& nums) {
    
}`,
      java: `public int longestConsecutive(int[] nums) {
    
}`
    },
    hints: ['Can you use a HashSet to check for element existence in O(1) time?', 'Only start counting from numbers that are the beginning of a sequence (i.e., num - 1 is not in the set).'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance: 52,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 92,
    isFaang: true,
    topCompany: 'Google',
    order: 2
  },
  {
    slug: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: `Given an array \`nums\` of size \`n\`, return the majority element.

The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.

Can you solve the problem in linear time and in \`O(1)\` space?`,
    examples: [
      { input: 'nums = [3,2,3]', output: '3', explain: '' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2', explain: '' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5 * 10^4',
      '-10^9 <= nums[i] <= 10^9'
    ],
    testCases: [
      { input: { nums: [3,2,3] }, expected: 3, functionCall: 'majorityElement([3,2,3])' },
      { input: { nums: [2,2,1,1,1,2,2] }, expected: 2, functionCall: 'majorityElement([2,2,1,1,1,2,2])' },
      { input: { nums: [1] }, expected: 1, functionCall: 'majorityElement([1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
    
}`,
      python: `def majorityElement(nums):
    pass`,
      cpp: `int majorityElement(vector<int>& nums) {
    
}`,
      java: `public int majorityElement(int[] nums) {
    
}`
    },
    hints: ['Think about the Boyer-Moore Voting Algorithm.', 'Maintain a count and a candidate. If count is 0, change candidate. Otherwise, increment/decrement based on whether current element equals candidate.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 64,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 3
  },
  {
    slug: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note** that you must do this in-place without making a copy of the array.`,
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explain: '' },
      { input: 'nums = [0]', output: '[0]', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-2^31 <= nums[i] <= 2^31 - 1'
    ],
    testCases: [
      { input: { nums: [0,1,0,3,12] }, expected: [1,3,12,0,0], functionCall: 'moveZeroes([0,1,0,3,12])' },
      { input: { nums: [0] }, expected: [0], functionCall: 'moveZeroes([0])' },
      { input: { nums: [1,0,2] }, expected: [1,2,0], functionCall: 'moveZeroes([1,0,2])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]} - Return the modified array
 */
function moveZeroes(nums) {
    // Write your code here and return nums
    
}`,
      python: `def moveZeroes(nums):
    pass`,
      cpp: `vector<int> moveZeroes(vector<int>& nums) {
    
}`,
      java: `public int[] moveZeroes(int[] nums) {
    
}`
    },
    hints: ['Use two pointers. One pointer iterates through the array, the other keeps track of the position of the last non-zero element found so far.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 62,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Meta',
    order: 4
  },
  {
    slug: 'squares-of-a-sorted-array',
    title: 'Squares of a Sorted Array',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given an integer array \`nums\` sorted in **non-decreasing** order, return an array of **the squares of each number** sorted in non-decreasing order.

Could you find an \`O(n)\` solution using a different approach?`,
    examples: [
      { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]', explain: 'After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].' },
      { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums is sorted in non-decreasing order.'
    ],
    testCases: [
      { input: { nums: [-4,-1,0,3,10] }, expected: [0,1,9,16,100], functionCall: 'sortedSquares([-4,-1,0,3,10])' },
      { input: { nums: [-7,-3,2,3,11] }, expected: [4,9,9,49,121], functionCall: 'sortedSquares([-7,-3,2,3,11])' },
      { input: { nums: [2,3,4] }, expected: [4,9,16], functionCall: 'sortedSquares([2,3,4])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortedSquares(nums) {
    
}`,
      python: `def sortedSquares(nums):
    pass`,
      cpp: `vector<int> sortedSquares(vector<int>& nums) {
    
}`,
      java: `public int[] sortedSquares(int[] nums) {
    
}`
    },
    hints: ['The array is already sorted. Can you compare the absolute values of the elements from both ends?', 'Use two pointers, one at the beginning and one at the end, and populate the new array from the end to the beginning.'],
    companies: ['Apple', 'Amazon', 'Google'],
    acceptance: 72,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 78,
    isFaang: true,
    topCompany: 'Apple',
    order: 5
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
