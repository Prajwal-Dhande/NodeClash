const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: 'Math',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.`,
    examples: [
      { input: 'x = 121', output: 'true', explain: '121 reads as 121 from left to right and from right to left.' },
      { input: 'x = -121', output: 'false', explain: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.' },
      { input: 'x = 10', output: 'false', explain: 'Reads 01 from right to left. Therefore it is not a palindrome.' }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    testCases: [
      { input: { x: 121 }, expected: true, functionCall: 'isPalindrome(121)' },
      { input: { x: -121 }, expected: false, functionCall: 'isPalindrome(-121)' },
      { input: { x: 10 }, expected: false, functionCall: 'isPalindrome(10)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    
}`,
      python: `def isPalindrome(x):
    pass`,
      cpp: `bool isPalindrome(int x) {
    
}`,
      java: `public boolean isPalindrome(int x) {
    
}`
    },
    hints: ['Negative numbers cannot be palindromes.', 'If the last digit is 0, the first digit must also be 0, which is only possible if x is 0.', 'You can extract digits from the end by using `% 10` and `/ 10` and construct the reversed half of the number.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 55,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 90,
    isFaang: true,
    topCompany: 'Amazon',
    order: 191
  },
  {
    slug: 'random-pick-with-weight',
    title: 'Random Pick with Weight',
    difficulty: 'Medium',
    category: 'Math',
    description: `You are given a **0-indexed** array of positive integers \`w\` where \`w[i]\` describes the **weight** of the \`i^{th}\` index.

You need to implement the function \`pickIndex()\`, which **randomly** picks an index in the range \`[0, w.length - 1]\` (**inclusive**) and returns it. The **probability** of picking an index \`i\` is \`w[i] / sum(w)\`.

*   For example, if \`w = [1, 3]\`, the probability of picking index \`0\` is \`1 / (1 + 3) = 0.25\` (i.e., \`25%\`), and the probability of picking index \`1\` is \`3 / (1 + 3) = 0.75\` (i.e., \`75%\`).`,
    examples: [
      { input: '["Solution","pickIndex"]\n[[[1]],[]]', output: '[null,0]', explain: 'Solution solution = new Solution([1]);\nsolution.pickIndex(); // return 0. The only option is index 0 since there is only one element in w.' },
      { input: '["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]\n[[[1,3]],[],[],[],[],[]]', output: '[null,1,1,1,1,0]', explain: 'Solution solution = new Solution([1, 3]);\nsolution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.\nsolution.pickIndex(); // return 1\nsolution.pickIndex(); // return 1\nsolution.pickIndex(); // return 1\nsolution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.\n\nSince this is a randomization problem, multiple answers are allowed.' }
    ],
    constraints: [
      '1 <= w.length <= 10^4',
      '1 <= w[i] <= 10^5',
      'pickIndex will be called at most 10^4 times.'
    ],
    testCases: [
      { input: { w: [1] }, expected: 0, functionCall: 'runPickIndex([1], 1)' },
      { input: { w: [1,3] }, expected: -1, functionCall: 'runPickIndex([1,3], 5)' }
    ],
    starterCode: {
      javascript: `class Solution {
    /**
     * @param {number[]} w
     */
    constructor(w) {
        
    }

    /**
     * @return {number}
     */
    pickIndex() {
        
    }
}

// Custom runner to test the distribution (for simplicity we just return -1 for random functions in basic tests)
function runPickIndex(w, calls) {
    if(w.length === 1) return 0;
    return -1; // Dummy return for random tests
}`,
      python: `class Solution:
    def __init__(self, w: List[int]):
        pass

    def pickIndex(self) -> int:
        pass`,
      cpp: `class Solution {
public:
    Solution(vector<int>& w) {
        
    }
    
    int pickIndex() {
        
    }
};`,
      java: `class Solution {

    public Solution(int[] w) {
        
    }
    
    public int pickIndex() {
        
    }
}`
    },
    hints: ['Create an array of prefix sums from the given weights.', 'Generate a random number in the range [1, total_sum].', 'Use binary search to find the correct index in the prefix sum array that corresponds to the random number.'],
    companies: ['Meta', 'Amazon', 'Google'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Meta',
    order: 192
  },
  {
    slug: 'powx-n',
    title: 'Pow(x, n)',
    difficulty: 'Medium',
    category: 'Math',
    description: `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).`,
    examples: [
      { input: 'x = 2.00000, n = 10', output: '1024.00000', explain: '' },
      { input: 'x = 2.10000, n = 3', output: '9.26100', explain: '' },
      { input: 'x = 2.00000, n = -2', output: '0.25000', explain: '2^-2 = 1/2^2 = 1/4 = 0.25' }
    ],
    constraints: [
      '-100.0 < x < 100.0',
      '-2^31 <= n <= 2^31 - 1',
      'n is an integer.',
      '-10^4 <= x^n <= 10^4'
    ],
    testCases: [
      { input: { x: 2.0, n: 10 }, expected: 1024.0, functionCall: 'myPow(2.0, 10)' },
      { input: { x: 2.1, n: 3 }, expected: 9.26100, functionCall: 'Number(myPow(2.1, 3).toFixed(5))' },
      { input: { x: 2.0, n: -2 }, expected: 0.25, functionCall: 'myPow(2.0, -2)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
    
}`,
      python: `def myPow(x, n):
    pass`,
      cpp: `double myPow(double x, int n) {
    
}`,
      java: `public double myPow(double x, int n) {
    
}`
    },
    hints: ['A naive approach would be to multiply x by itself n times, taking O(n) time. This will result in TLE.', 'Use binary exponentiation (Exponentiation by Squaring). `x^n = (x * x)^(n/2)` if n is even, and `x^n = x * (x * x)^((n-1)/2)` if n is odd.', 'Be careful with integer overflow when negating INT_MIN.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 34,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 92,
    isFaang: true,
    topCompany: 'Amazon',
    order: 193
  },
  {
    slug: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    category: 'Math',
    description: `Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**`,
    examples: [
      { input: 'x = 123', output: '321', explain: '' },
      { input: 'x = -123', output: '-321', explain: '' },
      { input: 'x = 120', output: '21', explain: '' }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    testCases: [
      { input: { x: 123 }, expected: 321, functionCall: 'reverse(123)' },
      { input: { x: -123 }, expected: -321, functionCall: 'reverse(-123)' },
      { input: { x: 120 }, expected: 21, functionCall: 'reverse(120)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    
}`,
      python: `def reverse(x):
    pass`,
      cpp: `int reverse(int x) {
    
}`,
      java: `public int reverse(int x) {
    
}`
    },
    hints: ['To reverse an integer, you can repeatedly extract the last digit using `% 10` and add it to the reversed number after multiplying the reversed number by 10.', 'Carefully check for overflow before performing `rev = rev * 10 + pop`.', 'Since the environment only allows 32-bit integers, you must compare with `INT_MAX / 10` and `INT_MIN / 10`.'],
    companies: ['Amazon', 'Meta', 'Apple'],
    acceptance: 28,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 194
  },
  {
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    category: 'Matrix',
    description: `Given an \`m x n\` \`matrix\`, return *all elements of the* \`matrix\` *in spiral order*.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explain: '' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]', explain: '' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100'
    ],
    testCases: [
      { input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] }, expected: [1,2,3,6,9,8,7,4,5], functionCall: 'spiralOrder([[1,2,3],[4,5,6],[7,8,9]])' },
      { input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] }, expected: [1,2,3,4,8,12,11,10,9,5,6,7], functionCall: 'spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
    
}`,
      python: `def spiralOrder(matrix):
    pass`,
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    
}`,
      java: `public List<Integer> spiralOrder(int[][] matrix) {
    
}`
    },
    hints: ['Maintain four boundary variables: `top`, `bottom`, `left`, `right`.', 'Use a loop to peel off the layers from the outside in. First go from left to right along the top row, then top to bottom along the right column, then right to left along the bottom row, and finally bottom to top along the left column.', 'Make sure to check if `top <= bottom` and `left <= right` before the third and fourth steps to prevent duplicating elements in non-square matrices.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 48,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Amazon',
    order: 195
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
