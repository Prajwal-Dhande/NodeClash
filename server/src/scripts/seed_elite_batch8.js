const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: '3sum-closest',
    title: '3Sum Closest',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: `Given an integer array \`nums\` of length \`n\` and an integer \`target\`, find three integers in \`nums\` such that the sum is closest to \`target\`.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.`,
    examples: [
      { input: 'nums = [-1,2,1,-4], target = 1', output: '2', explain: 'The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).' },
      { input: 'nums = [0,0,0], target = 1', output: '0', explain: 'The sum that is closest to the target is 0. (0 + 0 + 0 = 0).' }
    ],
    constraints: [
      '3 <= nums.length <= 500',
      '-1000 <= nums[i] <= 1000',
      '-10^4 <= target <= 10^4'
    ],
    testCases: [
      { input: { nums: [-1,2,1,-4], target: 1 }, expected: 2, functionCall: 'threeSumClosest([-1,2,1,-4], 1)' },
      { input: { nums: [0,0,0], target: 1 }, expected: 0, functionCall: 'threeSumClosest([0,0,0], 1)' },
      { input: { nums: [1,1,-1,-1,3], target: -1 }, expected: -1, functionCall: 'threeSumClosest([1,1,-1,-1,3], -1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
    
}`,
      python: `def threeSumClosest(nums, target):
    pass`,
      cpp: `int threeSumClosest(vector<int>& nums, int target) {
    
}`,
      java: `public int threeSumClosest(int[] nums, int target) {
    
}`
    },
    hints: ['Sort the array first.', 'Use the same two-pointer approach as 3Sum. Maintain a variable for the minimum difference found so far.'],
    companies: ['Apple', 'Amazon', 'Bloomberg'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Apple',
    order: 36
  },
  {
    slug: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
    examples: [
      { input: 's = "ABAB", k = 2', output: '4', explain: 'Replace the two \'A\'s with two \'B\'s or vice versa.' },
      { input: 's = "AABABBA", k = 1', output: '4', explain: 'Replace the one \'A\' in the middle with \'B\' and form "AABBBBA". The substring "BBBB" has the longest repeating letters, which is 4.' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of only uppercase English letters.',
      '0 <= k <= s.length'
    ],
    testCases: [
      { input: { s: "ABAB", k: 2 }, expected: 4, functionCall: 'characterReplacement("ABAB", 2)' },
      { input: { s: "AABABBA", k: 1 }, expected: 4, functionCall: 'characterReplacement("AABABBA", 1)' },
      { input: { s: "ABBB", k: 2 }, expected: 4, functionCall: 'characterReplacement("ABBB", 2)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function characterReplacement(s, k) {
    
}`,
      python: `def characterReplacement(s, k):
    pass`,
      cpp: `int characterReplacement(string s, int k) {
    
}`,
      java: `public int characterReplacement(String s, int k) {
    
}`
    },
    hints: ['Use a sliding window.', 'The condition for the window to be valid is: `window_length - max_character_frequency_in_window <= k`. If it\'s greater than k, shrink the window.'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance: 52,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 92,
    isFaang: true,
    topCompany: 'Google',
    order: 37
  },
  {
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    category: 'Sliding Window',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (**including duplicates**) is included in the window. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is **unique**.`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explain: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.' },
      { input: 's = "a", t = "a"', output: '"a"', explain: 'The entire string s is the minimum window.' },
      { input: 's = "a", t = "aa"', output: '""', explain: 'Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.' }
    ],
    constraints: [
      'm == s.length',
      'n == t.length',
      '1 <= m, n <= 10^5',
      's and t consist of uppercase and lowercase English letters.'
    ],
    testCases: [
      { input: { s: "ADOBECODEBANC", t: "ABC" }, expected: "BANC", functionCall: 'minWindow("ADOBECODEBANC", "ABC")' },
      { input: { s: "a", t: "a" }, expected: "a", functionCall: 'minWindow("a", "a")' },
      { input: { s: "a", t: "aa" }, expected: "", functionCall: 'minWindow("a", "aa")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
    
}`,
      python: `def minWindow(s, t):
    pass`,
      cpp: `string minWindow(string s, string t) {
    
}`,
      java: `public String minWindow(String s, String t) {
    
}`
    },
    hints: ['Use two pointers to create a window of letters in S, which would have all the characters from T.', 'Expand the right pointer until you have all the characters, then shrink the left pointer to make it as small as possible.'],
    companies: ['Meta', 'LinkedIn', 'Amazon'],
    acceptance: 41,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Meta',
    order: 38
  },
  {
    slug: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    category: 'Sliding Window',
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.`,
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explain: 'Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7' },
      { input: 'nums = [1], k = 1', output: '[1]', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      '1 <= k <= nums.length'
    ],
    testCases: [
      { input: { nums: [1,3,-1,-3,5,3,6,7], k: 3 }, expected: [3,3,5,5,6,7], functionCall: 'maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)' },
      { input: { nums: [1], k: 1 }, expected: [1], functionCall: 'maxSlidingWindow([1], 1)' },
      { input: { nums: [1,-1], k: 1 }, expected: [1,-1], functionCall: 'maxSlidingWindow([1,-1], 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
    
}`,
      python: `def maxSlidingWindow(nums, k):
    pass`,
      cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    
}`,
      java: `public int[] maxSlidingWindow(int[] nums, int k) {
    
}`
    },
    hints: ['How about using a data structure such as deque (double-ended queue)?', 'The queue size need not be the same as the window’s size. Keep indices in the deque. Remove elements that are smaller than the current element, because they will never be the maximum.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 39
  },
  {
    slug: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.`,
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explain: 's2 contains one permutation of s1 ("ba").' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explain: '' }
    ],
    constraints: [
      '1 <= s1.length, s2.length <= 10^4',
      's1 and s2 consist of lowercase English letters.'
    ],
    testCases: [
      { input: { s1: "ab", s2: "eidbaooo" }, expected: true, functionCall: 'checkInclusion("ab", "eidbaooo")' },
      { input: { s1: "ab", s2: "eidboaoo" }, expected: false, functionCall: 'checkInclusion("ab", "eidboaoo")' },
      { input: { s1: "adc", s2: "dcda" }, expected: true, functionCall: 'checkInclusion("adc", "dcda")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    
}`,
      python: `def checkInclusion(s1, s2):
    pass`,
      cpp: `bool checkInclusion(string s1, string s2) {
    
}`,
      java: `public boolean checkInclusion(String s1, String s2) {
    
}`
    },
    hints: ['Obviously, brute force will result in TLE. Think of something else.', 'How will you check whether one string is a permutation of another string?', 'One way is to sort the string and then compare. But, Is there a better way? Hash maps!'],
    companies: ['Microsoft', 'Meta', 'Apple'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Microsoft',
    order: 40
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
