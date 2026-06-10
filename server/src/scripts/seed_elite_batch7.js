const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    category: 'Strings',
    description: `Roman numerals are represented by seven different symbols: \`I\`, \`V\`, \`X\`, \`L\`, \`C\`, \`D\` and \`M\`.

**Symbol**       **Value**
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, \`2\` is written as \`II\` in Roman numeral, just two ones added together. \`12\` is written as \`XII\`, which is simply \`X + II\`. The number \`27\` is written as \`XXVII\`, which is \`XX + V + II\`.

Given a roman numeral, convert it to an integer.`,
    examples: [
      { input: 's = "III"', output: '3', explain: '3 is represented as 3 ones.' },
      { input: 's = "LVIII"', output: '58', explain: 'L = 50, V= 5, III = 3.' },
      { input: 's = "MCMXCIV"', output: '1994', explain: 'M = 1000, CM = 900, XC = 90 and IV = 4.' }
    ],
    constraints: [
      '1 <= s.length <= 15',
      's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
      'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'
    ],
    testCases: [
      { input: { s: "III" }, expected: 3, functionCall: 'romanToInt("III")' },
      { input: { s: "LVIII" }, expected: 58, functionCall: 'romanToInt("LVIII")' },
      { input: { s: "MCMXCIV" }, expected: 1994, functionCall: 'romanToInt("MCMXCIV")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    
}`,
      python: `def romanToInt(s):
    pass`,
      cpp: `int romanToInt(string s) {
    
}`,
      java: `public int romanToInt(String s) {
    
}`
    },
    hints: ['Create a hash map to map the Roman numerals to their integer values.', 'Iterate from right to left. If the current value is less than the previous value, subtract it; otherwise, add it.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 59,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Amazon',
    order: 31
  },
  {
    slug: 'integer-to-roman',
    title: 'Integer to Roman',
    difficulty: 'Medium',
    category: 'Math',
    description: `Seven different symbols represent Roman numerals with the following values:

**Symbol**       **Value**
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:
- If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
- If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol.

Given an integer, convert it to a roman numeral.`,
    examples: [
      { input: 'num = 3', output: '"III"', explain: '3 is represented as 3 ones.' },
      { input: 'num = 58', output: '"LVIII"', explain: 'L = 50, V = 5, III = 3.' },
      { input: 'num = 1994', output: '"MCMXCIV"', explain: 'M = 1000, CM = 900, XC = 90 and IV = 4.' }
    ],
    constraints: [
      '1 <= num <= 3999'
    ],
    testCases: [
      { input: { num: 3 }, expected: "III", functionCall: 'intToRoman(3)' },
      { input: { num: 58 }, expected: "LVIII", functionCall: 'intToRoman(58)' },
      { input: { num: 1994 }, expected: "MCMXCIV", functionCall: 'intToRoman(1994)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} num
 * @return {string}
 */
function intToRoman(num) {
    
}`,
      python: `def intToRoman(num):
    pass`,
      cpp: `string intToRoman(int num) {
    
}`,
      java: `public String intToRoman(int num) {
    
}`
    },
    hints: ['Store the values and their corresponding Roman numerals in an array or map, including the special cases like 4 (IV) and 9 (IX).', 'Iterate through the array, subtracting the value from the number and appending the symbol until the number becomes 0.'],
    companies: ['Amazon', 'Google', 'Meta'],
    acceptance: 61,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Google',
    order: 32
  },
  {
    slug: 'first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'Hard',
    category: 'Arrays',
    description: `Given an unsorted integer array \`nums\`, return the smallest missing positive integer.

You must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.`,
    examples: [
      { input: 'nums = [1,2,0]', output: '3', explain: 'The numbers in the range [1,2] are all in the array.' },
      { input: 'nums = [3,4,-1,1]', output: '2', explain: '1 is in the array but 2 is missing.' },
      { input: 'nums = [7,8,9,11,12]', output: '1', explain: 'The smallest positive integer 1 is missing.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-2^31 <= nums[i] <= 2^31 - 1'
    ],
    testCases: [
      { input: { nums: [1,2,0] }, expected: 3, functionCall: 'firstMissingPositive([1,2,0])' },
      { input: { nums: [3,4,-1,1] }, expected: 2, functionCall: 'firstMissingPositive([3,4,-1,1])' },
      { input: { nums: [7,8,9,11,12] }, expected: 1, functionCall: 'firstMissingPositive([7,8,9,11,12])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function firstMissingPositive(nums) {
    
}`,
      python: `def firstMissingPositive(nums):
    pass`,
      cpp: `int firstMissingPositive(vector<int>& nums) {
    
}`,
      java: `public int firstMissingPositive(int[] nums) {
    
}`
    },
    hints: ['Think about how you can use the array itself as a hash map.', 'Place each positive integer `x` (where `1 <= x <= n`) at index `x - 1`. Then scan the array to find the first index that doesn\'t have the correct number.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 38,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 33
  },
  {
    slug: 'isomorphic-strings',
    title: 'Isomorphic Strings',
    difficulty: 'Easy',
    category: 'Hashing',
    description: `Given two strings \`s\` and \`t\`, determine if they are isomorphic.

Two strings \`s\` and \`t\` are isomorphic if the characters in \`s\` can be replaced to get \`t\`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.`,
    examples: [
      { input: 's = "egg", t = "add"', output: 'true', explain: '' },
      { input: 's = "foo", t = "bar"', output: 'false', explain: '' },
      { input: 's = "paper", t = "title"', output: 'true', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 5 * 10^4',
      't.length == s.length',
      's and t consist of any valid ascii character.'
    ],
    testCases: [
      { input: { s: "egg", t: "add" }, expected: true, functionCall: 'isIsomorphic("egg", "add")' },
      { input: { s: "foo", t: "bar" }, expected: false, functionCall: 'isIsomorphic("foo", "bar")' },
      { input: { s: "paper", t: "title" }, expected: true, functionCall: 'isIsomorphic("paper", "title")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
    
}`,
      python: `def isIsomorphic(s, t):
    pass`,
      cpp: `bool isIsomorphic(string s, string t) {
    
}`,
      java: `public boolean isIsomorphic(String s, String t) {
    
}`
    },
    hints: ['Use two hash maps to keep track of the character mappings from s to t and from t to s.', 'If a mapping already exists and it doesn\'t match the current character, return false.'],
    companies: ['LinkedIn', 'Google', 'Amazon'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 77,
    isFaang: true,
    topCompany: 'LinkedIn',
    order: 34
  },
  {
    slug: 'valid-palindrome-ii',
    title: 'Valid Palindrome II',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: `Given a string \`s\`, return \`true\` if the \`s\` can be palindrome after deleting **at most one** character from it.`,
    examples: [
      { input: 's = "aba"', output: 'true', explain: '' },
      { input: 's = "abca"', output: 'true', explain: 'You could delete the character \'c\'.' },
      { input: 's = "abc"', output: 'false', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of lowercase English letters.'
    ],
    testCases: [
      { input: { s: "aba" }, expected: true, functionCall: 'validPalindrome("aba")' },
      { input: { s: "abca" }, expected: true, functionCall: 'validPalindrome("abca")' },
      { input: { s: "abc" }, expected: false, functionCall: 'validPalindrome("abc")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function validPalindrome(s) {
    
}`,
      python: `def validPalindrome(s):
    pass`,
      cpp: `bool validPalindrome(string s) {
    
}`,
      java: `public boolean validPalindrome(String s) {
    
}`
    },
    hints: ['Use two pointers, one from the beginning and one from the end.', 'When you find a mismatch, you have two options: skip the left character or skip the right character. Check if either resulting substring is a palindrome.'],
    companies: ['Meta', 'Microsoft', 'Apple'],
    acceptance: 39,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Meta',
    order: 35
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
