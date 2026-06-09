const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return the **minimal length** of a subarray whose sum is greater than or equal to \`target\`. If there is no such subarray, return \`0\` instead.`,
    examples: [
      { input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2', explain: 'The subarray [4,3] has the minimal length under the problem constraint.' },
      { input: 'target = 4, nums = [1,4,4]', output: '1', explain: 'The subarray [4] has length 1.' },
      { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0', explain: 'No subarray sum is >= 11.' }
    ],
    constraints: [
      '1 <= target <= 10^9',
      '1 <= nums.length <= 10^5',
      '1 <= nums[i] <= 10^4'
    ],
    testCases: [
      { input: { target: 7, nums: [2,3,1,2,4,3] }, expected: 2, functionCall: 'minSubArrayLen(7, [2,3,1,2,4,3])' },
      { input: { target: 4, nums: [1,4,4] }, expected: 1, functionCall: 'minSubArrayLen(4, [1,4,4])' },
      { input: { target: 11, nums: [1,1,1,1,1,1,1,1] }, expected: 0, functionCall: 'minSubArrayLen(11, [1,1,1,1,1,1,1,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(target, nums) {
    
}`,
      python: `def minSubArrayLen(target, nums):
    pass`,
      cpp: `int minSubArrayLen(int target, vector<int>& nums) {
    
}`,
      java: `public int minSubArrayLen(int target, int[] nums) {
    
}`
    },
    hints: ['Use two pointers (a sliding window).', 'Keep expanding the window by moving the right pointer and adding values until the sum is >= target. Then try to shrink the window by moving the left pointer to find the minimal length.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 88,
    isFaang: true,
    topCompany: 'Amazon',
    order: 41
  },
  {
    slug: 'substring-with-concatenation-of-all-words',
    title: 'Substring with Concatenation of All Words',
    difficulty: 'Hard',
    category: 'Sliding Window',
    description: `You are given a string \`s\` and an array of strings \`words\`. All the strings of \`words\` are of **the same length**.

A **concatenated substring** in \`s\` is a substring that contains all the strings of any permutation of \`words\` concatenated.

Return the starting indices of all the concatenated substrings in \`s\`. You can return the answer in **any order**.`,
    examples: [
      { input: 's = "barfoothefoobarman", words = ["foo","bar"]', output: '[0,9]', explain: 'Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively. The output order does not matter.' },
      { input: 's = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]', output: '[]', explain: 'Since words.length == 4 and words[i].length == 4, the concatenated substring has to be of length 16. There is no substring of length 16 that is concatenation of every word.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      '1 <= words.length <= 5000',
      '1 <= words[i].length <= 30',
      's and words[i] consist of lowercase English letters.'
    ],
    testCases: [
      { input: { s: "barfoothefoobarman", words: ["foo","bar"] }, expected: [0,9], functionCall: 'findSubstring("barfoothefoobarman", ["foo","bar"])' },
      { input: { s: "wordgoodgoodgoodbestword", words: ["word","good","best","word"] }, expected: [], functionCall: 'findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])' },
      { input: { s: "barfoofoobarthefoobarman", words: ["bar","foo","the"] }, expected: [6,9,12], functionCall: 'findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
function findSubstring(s, words) {
    
}`,
      python: `def findSubstring(s, words):
    pass`,
      cpp: `vector<int> findSubstring(string s, vector<string>& words) {
    
}`,
      java: `public List<Integer> findSubstring(String s, String[] words) {
    
}`
    },
    hints: ['Think about a sliding window, but jumping by the length of a word instead of character by character.', 'Use a Hash Map to count the frequencies of the words.'],
    companies: ['Amazon', 'Apple', 'Meta'],
    acceptance: 32,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 42
  },
  {
    slug: 'is-subsequence',
    title: 'Is Subsequence',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`s\` is a **subsequence** of \`t\`, or \`false\` otherwise.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., \`"ace"\` is a subsequence of \`"abcde"\` while \`"aec"\` is not).`,
    examples: [
      { input: 's = "abc", t = "ahbgdc"', output: 'true', explain: '"abc" can be formed by deleting \'h\', \'g\', and \'d\' from "ahbgdc".' },
      { input: 's = "axc", t = "ahbgdc"', output: 'false', explain: 'The character \'x\' does not appear in "ahbgdc".' }
    ],
    constraints: [
      '0 <= s.length <= 100',
      '0 <= t.length <= 10^4',
      's and t consist only of lowercase English letters.'
    ],
    testCases: [
      { input: { s: "abc", t: "ahbgdc" }, expected: true, functionCall: 'isSubsequence("abc", "ahbgdc")' },
      { input: { s: "axc", t: "ahbgdc" }, expected: false, functionCall: 'isSubsequence("axc", "ahbgdc")' },
      { input: { s: "", t: "ahbgdc" }, expected: true, functionCall: 'isSubsequence("", "ahbgdc")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(s, t) {
    
}`,
      python: `def isSubsequence(s, t):
    pass`,
      cpp: `bool isSubsequence(string s, string t) {
    
}`,
      java: `public boolean isSubsequence(String s, String t) {
    
}`
    },
    hints: ['Use two pointers, one pointing to the current character in s, and another pointing to the current character in t.', 'Increment the t pointer at each step, and increment the s pointer only when the characters match.'],
    companies: ['Meta', 'Apple', 'Google'],
    acceptance: 47,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 66,
    isFaang: true,
    topCompany: 'Meta',
    order: 43
  },
  {
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i^{th}\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the **maximum amount of water** a container can store.

**Notice** that you may not slant the container.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explain: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49 (height = 7, width = 7).' },
      { input: 'height = [1,1]', output: '1', explain: 'The only container has an area of 1.' }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    testCases: [
      { input: { height: [1,8,6,2,5,4,8,3,7] }, expected: 49, functionCall: 'maxArea([1,8,6,2,5,4,8,3,7])' },
      { input: { height: [1,1] }, expected: 1, functionCall: 'maxArea([1,1])' },
      { input: { height: [4,3,2,1,4] }, expected: 16, functionCall: 'maxArea([4,3,2,1,4])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    
}`,
      python: `def maxArea(height):
    pass`,
      cpp: `int maxArea(vector<int>& height) {
    
}`,
      java: `public int maxArea(int[] height) {
    
}`
    },
    hints: ['The area depends on the distance between the lines and the height of the shorter line.', 'Start with the maximum width (pointers at both ends). Move the pointer pointing to the shorter line inward, as this is the only way to possibly increase the area.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 99,
    isFaang: true,
    topCompany: 'Amazon',
    order: 44
  },
  {
    slug: 'find-all-anagrams-in-a-string',
    title: 'Find All Anagrams in a String',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: `Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s anagrams in \`s\`. You may return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]', explain: 'The substring with start index = 0 is "cba", which is an anagram of "abc".\nThe substring with start index = 6 is "bac", which is an anagram of "abc".' },
      { input: 's = "abab", p = "ab"', output: '[0,1,2]', explain: 'The substring with start index = 0 is "ab", which is an anagram of "ab".\nThe substring with start index = 1 is "ba", which is an anagram of "ab".\nThe substring with start index = 2 is "ab", which is an anagram of "ab".' }
    ],
    constraints: [
      '1 <= s.length, p.length <= 3 * 10^4',
      's and p consist of lowercase English letters.'
    ],
    testCases: [
      { input: { s: "cbaebabacd", p: "abc" }, expected: [0,6], functionCall: 'findAnagrams("cbaebabacd", "abc")' },
      { input: { s: "abab", p: "ab" }, expected: [0,1,2], functionCall: 'findAnagrams("abab", "ab")' },
      { input: { s: "baa", p: "aa" }, expected: [1], functionCall: 'findAnagrams("baa", "aa")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
function findAnagrams(s, p) {
    
}`,
      python: `def findAnagrams(s, p):
    pass`,
      cpp: `vector<int> findAnagrams(string s, string p) {
    
}`,
      java: `public List<Integer> findAnagrams(String s, String p) {
    
}`
    },
    hints: ['Create a sliding window of the same size as p.', 'Use arrays to keep track of the character frequencies of both the string p and the current window in s. Compare the arrays to check for anagrams.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 51,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 90,
    isFaang: true,
    topCompany: 'Amazon',
    order: 45
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
