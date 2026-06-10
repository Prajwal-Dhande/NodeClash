const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'palindromic-substrings',
    title: 'Palindromic Substrings',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given a string \`s\`, return the number of **palindromic substrings** in it.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.`,
    examples: [
      { input: 's = "abc"', output: '3', explain: 'Three palindromic strings: "a", "b", "c".' },
      { input: 's = "aaa"', output: '6', explain: 'Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".' }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consists of lowercase English letters.'
    ],
    testCases: [
      { input: { s: "abc" }, expected: 3, functionCall: 'countSubstrings("abc")' },
      { input: { s: "aaa" }, expected: 6, functionCall: 'countSubstrings("aaa")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function countSubstrings(s) {
    
}`,
      python: `def countSubstrings(s):
    pass`,
      cpp: `int countSubstrings(string s) {
    
}`,
      java: `public int countSubstrings(String s) {
    
}`
    },
    hints: ['How can we reuse a previously computed palindrome to compute a larger palindrome?', 'If "aba" is a palindrome, is "xabax" a palindrome? Similarly is "xabay" a palindrome?', 'Expand around center. There are 2N-1 possible centers for a palindrome in a string of length N.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 68,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Meta',
    order: 181
  },
  {
    slug: 'combination-sum-iv',
    title: 'Combination Sum IV',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given an array of **distinct** integers \`nums\` and a target integer \`target\`, return the number of possible combinations that add up to \`target\`.

The test cases are generated so that the answer can fit in a **32-bit** integer.`,
    examples: [
      { input: 'nums = [1,2,3], target = 4', output: '7', explain: 'The possible combination ways are:\n(1, 1, 1, 1)\n(1, 1, 2)\n(1, 2, 1)\n(1, 3)\n(2, 1, 1)\n(2, 2)\n(3, 1)\nNote that different sequences are counted as different combinations.' },
      { input: 'nums = [9], target = 3', output: '0', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 200',
      '1 <= nums[i] <= 1000',
      'All the elements of nums are unique.',
      '1 <= target <= 1000'
    ],
    testCases: [
      { input: { nums: [1,2,3], target: 4 }, expected: 7, functionCall: 'combinationSum4([1,2,3], 4)' },
      { input: { nums: [9], target: 3 }, expected: 0, functionCall: 'combinationSum4([9], 3)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function combinationSum4(nums, target) {
    
}`,
      python: `def combinationSum4(nums, target):
    pass`,
      cpp: `int combinationSum4(vector<int>& nums, int target) {
    
}`,
      java: `public int combinationSum4(int[] nums, int target) {
    
}`
    },
    hints: ['Think about how you can break down the problem into smaller subproblems. For example, to find combinations that sum to target, if you choose num from nums, you need to find combinations that sum to target - num.', 'Use a 1D DP array where dp[i] represents the number of combinations that sum up to i.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 81,
    isFaang: true,
    topCompany: 'Google',
    order: 182
  },
  {
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explain: 'Return true because "leetcode" can be segmented as "leet code".' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true', explain: 'Return true because "applepenapple" can be segmented as "apple pen apple".\nNote that you are allowed to reuse a dictionary word.' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 300',
      '1 <= wordDict.length <= 1000',
      '1 <= wordDict[i].length <= 20',
      's and wordDict[i] consist of only lowercase English letters.',
      'All the strings of wordDict are unique.'
    ],
    testCases: [
      { input: { s: "leetcode", wordDict: ["leet","code"] }, expected: true, functionCall: 'wordBreak("leetcode", ["leet","code"])' },
      { input: { s: "applepenapple", wordDict: ["apple","pen"] }, expected: true, functionCall: 'wordBreak("applepenapple", ["apple","pen"])' },
      { input: { s: "catsandog", wordDict: ["cats","dog","sand","and","cat"] }, expected: false, functionCall: 'wordBreak("catsandog", ["cats","dog","sand","and","cat"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    
}`,
      python: `def wordBreak(s, wordDict):
    pass`,
      cpp: `bool wordBreak(string s, vector<string>& wordDict) {
    
}`,
      java: `public boolean wordBreak(String s, List<String> wordDict) {
    
}`
    },
    hints: ['Think of this as a path-finding problem in a graph, or use Dynamic Programming.', 'Let `dp[i]` be true if the string up to index `i` can be segmented into words from the dictionary. `dp[i] = dp[j] && (s[j..i] in dictionary)` for some j < i.'],
    companies: ['Amazon', 'Meta', 'Bloomberg'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 183
  },
  {
    slug: 'word-break-ii',
    title: 'Word Break II',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, add spaces in \`s\` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in **any order**.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.`,
    examples: [
      { input: 's = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]', output: '["cats and dog","cat sand dog"]', explain: '' },
      { input: 's = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]', output: '["pine apple pen apple","pineapple pen apple","pine applepen apple"]', explain: '' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: '[]', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 20',
      '1 <= wordDict.length <= 1000',
      '1 <= wordDict[i].length <= 10',
      's and wordDict[i] consist of only lowercase English letters.',
      'All the strings of wordDict are unique.'
    ],
    testCases: [
      { input: { s: "catsanddog", wordDict: ["cat","cats","and","sand","dog"] }, expected: ["cat sand dog","cats and dog"], functionCall: 'runWordBreakII("catsanddog", ["cat","cats","and","sand","dog"])' },
      { input: { s: "pineapplepenapple", wordDict: ["apple","pen","applepen","pine","pineapple"] }, expected: ["pine apple pen apple","pine applepen apple","pineapple pen apple"], functionCall: 'runWordBreakII("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"])' },
      { input: { s: "catsandog", wordDict: ["cats","dog","sand","and","cat"] }, expected: [], functionCall: 'runWordBreakII("catsandog", ["cats","dog","sand","and","cat"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
function wordBreak(s, wordDict) {
    
}

function runWordBreakII(s, wordDict) {
    let res = wordBreak(s, wordDict);
    return res.sort();
}`,
      python: `def wordBreak(s, wordDict):
    pass`,
      cpp: `vector<string> wordBreak(string s, vector<string>& wordDict) {
    
}`,
      java: `public List<String> wordBreak(String s, List<String> wordDict) {
    
}`
    },
    hints: ['Unlike Word Break I which only needs a boolean DP array, you need to keep track of the actual paths.', 'Use DFS with memoization. The memoization table will store `memo[index] = List of valid sentences for substring s[index...]`.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 184
  },
  {
    slug: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
*   Insert a character
*   Delete a character
*   Replace a character`,
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: '3', explain: 'horse -> rorse (replace \'h\' with \'r\')\nrorse -> rose (remove \'r\')\nrose -> ros (remove \'e\')' },
      { input: 'word1 = "intention", word2 = "execution"', output: '5', explain: 'intention -> inention (remove \'t\')\ninention -> enention (replace \'i\' with \'e\')\nenention -> exention (replace \'n\' with \'x\')\nexention -> exection (replace \'n\' with \'c\')\nexection -> execution (insert \'u\')' }
    ],
    constraints: [
      '0 <= word1.length, word2.length <= 500',
      'word1 and word2 consist of lowercase English letters.'
    ],
    testCases: [
      { input: { word1: "horse", word2: "ros" }, expected: 3, functionCall: 'minDistance("horse", "ros")' },
      { input: { word1: "intention", word2: "execution" }, expected: 5, functionCall: 'minDistance("intention", "execution")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
    
}`,
      python: `def minDistance(word1, word2):
    pass`,
      cpp: `int minDistance(string word1, string word2) {
    
}`,
      java: `public int minDistance(String word1, String word2) {
    
}`
    },
    hints: ['Create a 2D DP array `dp[i][j]` representing the edit distance between `word1[0..i-1]` and `word2[0..j-1]`.', 'Base cases: `dp[i][0] = i` (deleting all characters) and `dp[0][j] = j` (inserting all characters).', 'If `word1[i-1] == word2[j-1]`, then `dp[i][j] = dp[i-1][j-1]`. Otherwise, `dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])` (replace, delete, insert respectively).'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 55,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 185
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
