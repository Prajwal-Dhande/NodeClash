const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'reverse-words-in-a-string',
    title: 'Reverse Words in a String',
    difficulty: 'Medium',
    category: 'Strings',
    description: `Given an input string \`s\`, reverse the order of the **words**.

A **word** is defined as a sequence of non-space characters. The **words** in \`s\` will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

**Note** that \`s\` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.`,
    examples: [
      { input: 's = "the sky is blue"', output: '"blue is sky the"', explain: '' },
      { input: 's = "  hello world  "', output: '"world hello"', explain: 'Your reversed string should not contain leading or trailing spaces.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's contains English letters (upper-case and lower-case), digits, and spaces \' \'.',
      'There is at least one word in s.'
    ],
    testCases: [
      { input: { s: "the sky is blue" }, expected: "blue is sky the", functionCall: 'reverseWords("the sky is blue")' },
      { input: { s: "  hello world  " }, expected: "world hello", functionCall: 'reverseWords("  hello world  ")' },
      { input: { s: "a good   example" }, expected: "example good a", functionCall: 'reverseWords("a good   example")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
    
}`,
      python: `def reverseWords(s):
    pass`,
      cpp: `string reverseWords(string s) {
    
}`,
      java: `public String reverseWords(String s) {
    
}`
    },
    hints: ['Can you do it in-place in O(1) extra space? (Note: strings are immutable in some languages)', 'Reverse the whole string first, then reverse each individual word.'],
    companies: ['Apple', 'Amazon', 'Microsoft'],
    acceptance: 37,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 78,
    isFaang: true,
    topCompany: 'Apple',
    order: 26
  },
  {
    slug: 'zigzag-conversion',
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    category: 'Strings',
    description: `The string \`"PAYPALISHIRING"\` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

\`\`\`
P   A   H   N
A P L S I I G
Y   I   R
\`\`\`

And then read line by line: \`"PAHNAPLSIIGYIR"\`

Write the code that will take a string and make this conversion given a number of rows.`,
    examples: [
      { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"', explain: '' },
      { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"', explain: 'P     I    N\nA   L S  I G\nY A   H R\nP     I' }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consists of English letters (lower-case and upper-case), \',\' and \'.\'.',
      '1 <= numRows <= 1000'
    ],
    testCases: [
      { input: { s: "PAYPALISHIRING", numRows: 3 }, expected: "PAHNAPLSIIGYIR", functionCall: 'convert("PAYPALISHIRING", 3)' },
      { input: { s: "PAYPALISHIRING", numRows: 4 }, expected: "PINALSIGYAHRPI", functionCall: 'convert("PAYPALISHIRING", 4)' },
      { input: { s: "A", numRows: 1 }, expected: "A", functionCall: 'convert("A", 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
    
}`,
      python: `def convert(s, numRows):
    pass`,
      cpp: `string convert(string s, int numRows) {
    
}`,
      java: `public String convert(String s, int numRows) {
    
}`
    },
    hints: ['Create an array of strings for each row.', 'Iterate through the string, appending characters to the correct row string. Keep track of the current direction (up or down).'],
    companies: ['Amazon', 'Apple', 'Meta'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 65,
    isFaang: true,
    topCompany: 'Amazon',
    order: 27
  },
  {
    slug: 'find-the-index-of-the-first-occurrence-in-a-string',
    title: 'Find the Index of the First Occurrence in a String',
    difficulty: 'Easy',
    category: 'Strings',
    description: `Given two strings \`needle\` and \`haystack\`, return the index of the first occurrence of \`needle\` in \`haystack\`, or \`-1\` if \`needle\` is not part of \`haystack\`.`,
    examples: [
      { input: 'haystack = "sadbutsad", needle = "sad"', output: '0', explain: '"sad" occurs at index 0 and 6. The first occurrence is at index 0, so we return 0.' },
      { input: 'haystack = "leetcode", needle = "leeto"', output: '-1', explain: '"leeto" did not occur in "leetcode", so we return -1.' }
    ],
    constraints: [
      '1 <= haystack.length, needle.length <= 10^4',
      'haystack and needle consist of only lowercase English characters.'
    ],
    testCases: [
      { input: { haystack: "sadbutsad", needle: "sad" }, expected: 0, functionCall: 'strStr("sadbutsad", "sad")' },
      { input: { haystack: "leetcode", needle: "leeto" }, expected: -1, functionCall: 'strStr("leetcode", "leeto")' },
      { input: { haystack: "hello", needle: "ll" }, expected: 2, functionCall: 'strStr("hello", "ll")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
function strStr(haystack, needle) {
    
}`,
      python: `def strStr(haystack, needle):
    pass`,
      cpp: `int strStr(string haystack, string needle) {
    
}`,
      java: `public int strStr(String haystack, String needle) {
    
}`
    },
    hints: ['A naive approach would be to check the substring starting at each index.', 'Can you optimize it using the KMP (Knuth-Morris-Pratt) algorithm or Rabin-Karp?'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 42,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 70,
    isFaang: true,
    topCompany: 'Amazon',
    order: 28
  },
  {
    slug: 'text-justification',
    title: 'Text Justification',
    difficulty: 'Hard',
    category: 'Strings',
    description: `Given an array of strings \`words\` and a width \`maxWidth\`, format the text such that each line has exactly \`maxWidth\` characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces \`' '\` when necessary so that each line has exactly \`maxWidth\` characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.`,
    examples: [
      { input: 'words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16', output: '["This    is    an", "example  of text", "justification.  "]', explain: '' },
      { input: 'words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16', output: '["What   must   be", "acknowledgment  ", "shall be        "]', explain: 'Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.' }
    ],
    constraints: [
      '1 <= words.length <= 300',
      '1 <= words[i].length <= 20',
      'words[i] consists of only English letters and symbols.',
      '1 <= maxWidth <= 100',
      'words[i].length <= maxWidth'
    ],
    testCases: [
      { input: { words: ["This", "is", "an", "example", "of", "text", "justification."], maxWidth: 16 }, expected: ["This    is    an", "example  of text", "justification.  "], functionCall: 'fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16)' },
      { input: { words: ["What","must","be","acknowledgment","shall","be"], maxWidth: 16 }, expected: ["What   must   be", "acknowledgment  ", "shall be        "], functionCall: 'fullJustify(["What","must","be","acknowledgment","shall","be"], 16)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
function fullJustify(words, maxWidth) {
    
}`,
      python: `def fullJustify(words, maxWidth):
    pass`,
      cpp: `vector<string> fullJustify(vector<string>& words, int maxWidth) {
    
}`,
      java: `public List<String> fullJustify(String[] words, int maxWidth) {
    
}`
    },
    hints: ['Determine how many words fit on the current line.', 'Calculate the number of extra spaces needed.', 'Distribute the spaces evenly, giving leftovers to the leftmost slots. Remember the last line rule.'],
    companies: ['Google', 'Amazon', 'LinkedIn'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Google',
    order: 29
  },
  {
    slug: 'candy',
    title: 'Candy',
    difficulty: 'Hard',
    category: 'Greedy',
    description: `There are \`n\` children standing in a line. Each child is assigned a rating value given in the integer array \`ratings\`.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the **minimum number of candies** you need to have to distribute the candies to the children.`,
    examples: [
      { input: 'ratings = [1,0,2]', output: '5', explain: 'You can allocate to the first, second and third child with 2, 1, 2 candies respectively.' },
      { input: 'ratings = [1,2,2]', output: '4', explain: 'You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above two conditions.' }
    ],
    constraints: [
      'n == ratings.length',
      '1 <= n <= 2 * 10^4',
      '0 <= ratings[i] <= 2 * 10^4'
    ],
    testCases: [
      { input: { ratings: [1,0,2] }, expected: 5, functionCall: 'candy([1,0,2])' },
      { input: { ratings: [1,2,2] }, expected: 4, functionCall: 'candy([1,2,2])' },
      { input: { ratings: [1,3,2,2,1] }, expected: 7, functionCall: 'candy([1,3,2,2,1])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} ratings
 * @return {number}
 */
function candy(ratings) {
    
}`,
      python: `def candy(ratings):
    pass`,
      cpp: `int candy(vector<int>& ratings) {
    
}`,
      java: `public int candy(int[] ratings) {
    
}`
    },
    hints: ['Try a two-pass approach. First pass: left to right. Second pass: right to left.', 'In the left-to-right pass, ensure that right child gets more candies if rating is higher. In right-to-left, ensure left child gets more if rating is higher. take the max of both passes.'],
    companies: ['Amazon', 'Google', 'Meta'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 91,
    isFaang: true,
    topCompany: 'Amazon',
    order: 30
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
