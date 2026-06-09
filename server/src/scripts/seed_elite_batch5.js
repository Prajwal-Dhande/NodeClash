const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Medium',
    category: 'Greedy',
    description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where:
- \`0 <= j <= nums[i]\` and
- \`i + j < n\`

Return the **minimum number of jumps** to reach \`nums[n - 1]\`. The test cases are generated such that you can reach \`nums[n - 1]\`.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: '2', explain: 'The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { input: 'nums = [2,3,0,1,4]', output: '2', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 1000',
      'It\'s guaranteed that you can reach nums[n - 1].'
    ],
    testCases: [
      { input: { nums: [2,3,1,1,4] }, expected: 2, functionCall: 'jump([2,3,1,1,4])' },
      { input: { nums: [2,3,0,1,4] }, expected: 2, functionCall: 'jump([2,3,0,1,4])' },
      { input: { nums: [0] }, expected: 0, functionCall: 'jump([0])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function jump(nums) {
    
}`,
      python: `def jump(nums):
    pass`,
      cpp: `int jump(vector<int>& nums) {
    
}`,
      java: `public int jump(int[] nums) {
    
}`
    },
    hints: ['This is an implicit BFS problem. You can maintain the maximum reachable index at the current level.', 'Maintain two pointers: the end of the current jump level and the farthest index you can reach so far.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 40,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 21
  },
  {
    slug: 'h-index',
    title: 'H-Index',
    difficulty: 'Medium',
    category: 'Arrays',
    description: `Given an array of integers \`citations\` where \`citations[i]\` is the number of citations a researcher received for their \`i^{th}\` paper, return the researcher's h-index.

The h-index is defined as the maximum value of \`h\` such that the given researcher has published at least \`h\` papers that have each been cited at least \`h\` times.`,
    examples: [
      { input: 'citations = [3,0,6,1,5]', output: '3', explain: 'The researcher has 5 papers with 3, 0, 6, 1, 5 citations respectively. Since the researcher has 3 papers with at least 3 citations each, the h-index is 3.' },
      { input: 'citations = [1,3,1]', output: '1', explain: '' }
    ],
    constraints: [
      'n == citations.length',
      '1 <= n <= 5000',
      '0 <= citations[i] <= 1000'
    ],
    testCases: [
      { input: { citations: [3,0,6,1,5] }, expected: 3, functionCall: 'hIndex([3,0,6,1,5])' },
      { input: { citations: [1,3,1] }, expected: 1, functionCall: 'hIndex([1,3,1])' },
      { input: { citations: [100] }, expected: 1, functionCall: 'hIndex([100])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} citations
 * @return {number}
 */
function hIndex(citations) {
    
}`,
      python: `def hIndex(citations):
    pass`,
      cpp: `int hIndex(vector<int>& citations) {
    
}`,
      java: `public int hIndex(int[] citations) {
    
}`
    },
    hints: ['An easy approach is to sort the array first.', 'What are the possible values of h-index? Think about counting sort.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 39,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 68,
    isFaang: true,
    topCompany: 'Google',
    order: 22
  },
  {
    slug: 'insert-delete-getrandom-o1',
    title: 'Insert Delete GetRandom O(1)',
    difficulty: 'Medium',
    category: 'Hash Map',
    description: `Implement the \`RandomizedSet\` class:

- \`RandomizedSet()\` Initializes the \`RandomizedSet\` object.
- \`bool insert(int val)\` Inserts an item \`val\` into the set if not present. Returns \`true\` if the item was not present, \`false\` otherwise.
- \`bool remove(int val)\` Removes an item \`val\` from the set if present. Returns \`true\` if the item was present, \`false\` otherwise.
- \`int getRandom()\` Returns a random element from the current set of elements. Each element must have the **same probability** of being returned.

You must implement the functions of the class such that each function works in **average** \`O(1)\` time complexity.`,
    examples: [
      { input: '["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]\n[[], [1], [2], [2], [], [1], [2], []]', output: '[null, true, false, true, 2, true, false, 2]', explain: 'RandomizedSet randomizedSet = new RandomizedSet();\nrandomizedSet.insert(1); // Inserts 1.\nrandomizedSet.remove(2); // Returns false as 2 does not exist.\n...' }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'At most 2 * 10^5 calls will be made to insert, remove, and getRandom.',
      'There will be at least one element in the data structure when getRandom is called.'
    ],
    testCases: [
      { input: { ops: ["insert","remove","insert","getRandom"], vals: [[1],[2],[2],[]] }, expected: [true,false,true,2], functionCall: 'runRandomizedSet(["insert","remove","insert","getRandom"], [[1],[2],[2],[]])' },
      { input: { ops: ["insert","insert","remove","insert","getRandom"], vals: [[0],[1],[0],[2],[]] }, expected: [true,true,true,true,1], functionCall: 'runRandomizedSet(["insert","insert","remove","insert","getRandom"], [[0],[1],[0],[2],[]])' }
    ],
    starterCode: {
      javascript: `class RandomizedSet {
    constructor() {
        
    }

    /** 
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        
    }

    /** 
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        
    }

    /**
     * @return {number}
     */
    getRandom() {
        
    }
}

// Wrapper for test cases
function runRandomizedSet(ops, vals) {
    const set = new RandomizedSet();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "insert") result.push(set.insert(vals[i][0]));
        else if (ops[i] === "remove") result.push(set.remove(vals[i][0]));
        else if (ops[i] === "getRandom") {
            const val = set.getRandom();
            // Since getRandom is non-deterministic, we just return the deterministic value for simple tests
            // (Assuming test cases have 1 element when getRandom is called)
            result.push(val); 
        }
    }
    return result;
}`,
      python: `class RandomizedSet:
    def __init__(self):
        pass

    def insert(self, val: int) -> bool:
        pass

    def remove(self, val: int) -> bool:
        pass

    def getRandom(self) -> int:
        pass`,
      cpp: `class RandomizedSet {
public:
    RandomizedSet() {
    }
    
    bool insert(int val) {
    }
    
    bool remove(int val) {
    }
    
    int getRandom() {
    }
};`,
      java: `class RandomizedSet {
    public RandomizedSet() {
    }
    
    public boolean insert(int val) {
    }
    
    public boolean remove(int val) {
    }
    
    public int getRandom() {
    }
}`
    },
    hints: ['To delete a value in O(1) from an array, you can swap it with the last element and pop the last element.', 'Use a Hash Map to store the indices of the values in the array.'],
    companies: ['Amazon', 'Bloomberg', 'Google'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 23
  },
  {
    slug: 'length-of-last-word',
    title: 'Length of Last Word',
    difficulty: 'Easy',
    category: 'Strings',
    description: `Given a string \`s\` consisting of words and spaces, return the length of the **last** word in the string.

A **word** is a maximal substring consisting of non-space characters only.`,
    examples: [
      { input: 's = "Hello World"', output: '5', explain: 'The last word is "World" with length 5.' },
      { input: 's = "   fly me   to   the moon  "', output: '4', explain: 'The last word is "moon" with length 4.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of only English letters and spaces \' \'.',
      'There will be at least one word in s.'
    ],
    testCases: [
      { input: { s: "Hello World" }, expected: 5, functionCall: 'lengthOfLastWord("Hello World")' },
      { input: { s: "   fly me   to   the moon  " }, expected: 4, functionCall: 'lengthOfLastWord("   fly me   to   the moon  ")' },
      { input: { s: "luffy is still joyboy" }, expected: 6, functionCall: 'lengthOfLastWord("luffy is still joyboy")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord(s) {
    
}`,
      python: `def lengthOfLastWord(s):
    pass`,
      cpp: `int lengthOfLastWord(string s) {
    
}`,
      java: `public int lengthOfLastWord(String s) {
    
}`
    },
    hints: ['Traverse the string from the end to the beginning.', 'Skip all trailing spaces. Then count the characters until you hit another space.'],
    companies: ['Apple', 'Microsoft', 'Amazon'],
    acceptance: 45,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 60,
    isFaang: true,
    topCompany: 'Apple',
    order: 24
  },
  {
    slug: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    category: 'Strings',
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.`,
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explain: '' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explain: 'There is no common prefix among the input strings.' }
    ],
    constraints: [
      '1 <= strs.length <= 200',
      '0 <= strs[i].length <= 200',
      'strs[i] consists of only lowercase English letters.'
    ],
    testCases: [
      { input: { strs: ["flower","flow","flight"] }, expected: "fl", functionCall: 'longestCommonPrefix(["flower","flow","flight"])' },
      { input: { strs: ["dog","racecar","car"] }, expected: "", functionCall: 'longestCommonPrefix(["dog","racecar","car"])' },
      { input: { strs: ["ab", "a"] }, expected: "a", functionCall: 'longestCommonPrefix(["ab", "a"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    
}`,
      python: `def longestCommonPrefix(strs):
    pass`,
      cpp: `string longestCommonPrefix(vector<string>& strs) {
    
}`,
      java: `public String longestCommonPrefix(String[] strs) {
    
}`
    },
    hints: ['Compare the characters of the first string with the rest of the strings vertically.', 'Alternatively, you can assume the first string is the prefix, and then continually shorten it while it\'s not a prefix of the next string.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 42,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 25
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
