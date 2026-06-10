const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'target-sum',
    title: 'Target Sum',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `You are given an integer array \`nums\` and an integer \`target\`.

You want to build an **expression** out of nums by adding one of the symbols \`'+'\` and \`'-'\` before each integer in nums and then concatenate all the integers.

*   For example, if \`nums = [2, 1]\`, you can add a \`'+'\` before \`2\` and a \`'-'\` before \`1\` and concatenate them to build the expression \`"+2-1"\`.

Return the number of different **expressions** that you can build, which evaluates to \`target\`.`,
    examples: [
      { input: 'nums = [1,1,1,1,1], target = 3', output: '5', explain: 'There are 5 ways to assign symbols to make the sum of nums be target 3.\n-1 + 1 + 1 + 1 + 1 = 3\n+1 - 1 + 1 + 1 + 1 = 3\n+1 + 1 - 1 + 1 + 1 = 3\n+1 + 1 + 1 - 1 + 1 = 3\n+1 + 1 + 1 + 1 - 1 = 3' },
      { input: 'nums = [1], target = 1', output: '1', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 20',
      '0 <= nums[i] <= 1000',
      '0 <= sum(nums[i]) <= 1000',
      '-1000 <= target <= 1000'
    ],
    testCases: [
      { input: { nums: [1,1,1,1,1], target: 3 }, expected: 5, functionCall: 'findTargetSumWays([1,1,1,1,1], 3)' },
      { input: { nums: [1], target: 1 }, expected: 1, functionCall: 'findTargetSumWays([1], 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findTargetSumWays(nums, target) {
    
}`,
      python: `def findTargetSumWays(nums, target):
    pass`,
      cpp: `int findTargetSumWays(vector<int>& nums, int target) {
    
}`,
      java: `public int findTargetSumWays(int[] nums, int target) {
    
}`
    },
    hints: ['This problem can be transformed into finding a subset `P` (positive elements) and a subset `N` (negative elements) such that `sum(P) - sum(N) = target`.', 'Since `sum(P) + sum(N) = sum(nums)`, we have `sum(P) = (target + sum(nums)) / 2`.', 'Now, the problem reduces to finding the number of subsets in `nums` that sum up to `sum(P)`. This is a classic 0/1 Knapsack DP problem.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 186
  },
  {
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an **infinite number of each kind of coin**.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explain: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1', explain: '' },
      { input: 'coins = [1], amount = 0', output: '0', explain: '' }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    testCases: [
      { input: { coins: [1,2,5], amount: 11 }, expected: 3, functionCall: 'coinChange([1,2,5], 11)' },
      { input: { coins: [2], amount: 3 }, expected: -1, functionCall: 'coinChange([2], 3)' },
      { input: { coins: [1], amount: 0 }, expected: 0, functionCall: 'coinChange([1], 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    
}`,
      python: `def coinChange(coins, amount):
    pass`,
      cpp: `int coinChange(vector<int>& coins, int amount) {
    
}`,
      java: `public int coinChange(int[] coins, int amount) {
    
}`
    },
    hints: ['Use Dynamic Programming. Create an array `dp` of size `amount + 1`, initialized to a large number (like infinity), where `dp[i]` is the minimum number of coins needed for amount `i`.', 'Base case: `dp[0] = 0`.', 'For each amount from 1 to `amount`, iterate through each coin: `if (i - coin >= 0) dp[i] = min(dp[i], dp[i - coin] + 1)`.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Amazon',
    order: 187
  },
  {
    slug: 'minimum-path-sum',
    title: 'Minimum Path Sum',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given a \`m x n\` \`grid\` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.`,
    examples: [
      { input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7', explain: 'Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.' },
      { input: 'grid = [[1,2,3],[4,5,6]]', output: '12', explain: '' }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 200',
      '0 <= grid[i][j] <= 200'
    ],
    testCases: [
      { input: { grid: [[1,3,1],[1,5,1],[4,2,1]] }, expected: 7, functionCall: 'minPathSum([[1,3,1],[1,5,1],[4,2,1]])' },
      { input: { grid: [[1,2,3],[4,5,6]] }, expected: 12, functionCall: 'minPathSum([[1,2,3],[4,5,6]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function minPathSum(grid) {
    
}`,
      python: `def minPathSum(grid):
    pass`,
      cpp: `int minPathSum(vector<vector<int>>& grid) {
    
}`,
      java: `public int minPathSum(int[][] grid) {
    
}`
    },
    hints: ['Create a 2D DP array `dp` where `dp[i][j]` is the minimum path sum to reach cell `(i, j)`.', 'The recurrence relation is `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`.', 'Initialize the first row and the first column correctly by accumulating the sum along the edges.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 63,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 188
  },
  {
    slug: 'maximal-rectangle',
    title: 'Maximal Rectangle',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: `Given a \`rows x cols\` binary \`matrix\` filled with \`0\`'s and \`1\`'s, find the largest rectangle containing only \`1\`'s and return its area.`,
    examples: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '6', explain: 'The maximal rectangle is shown.' },
      { input: 'matrix = [["0"]]', output: '0', explain: '' },
      { input: 'matrix = [["1"]]', output: '1', explain: '' }
    ],
    constraints: [
      'rows == matrix.length',
      'cols == matrix[i].length',
      '1 <= row, cols <= 200',
      'matrix[i][j] is \'0\' or \'1\'.'
    ],
    testCases: [
      { input: { matrix: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]] }, expected: 6, functionCall: 'maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])' },
      { input: { matrix: [["0"]] }, expected: 0, functionCall: 'maximalRectangle([["0"]])' },
      { input: { matrix: [["1"]] }, expected: 1, functionCall: 'maximalRectangle([["1"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} matrix
 * @return {number}
 */
function maximalRectangle(matrix) {
    
}`,
      python: `def maximalRectangle(matrix):
    pass`,
      cpp: `int maximalRectangle(vector<vector<char>>& matrix) {
    
}`,
      java: `public int maximalRectangle(char[][] matrix) {
    
}`
    },
    hints: ['This problem can be reduced to "Largest Rectangle in Histogram" problem.', 'Treat each row as the base of a histogram. If `matrix[i][j] == "1"`, the height is `height[j] + 1`. If `matrix[i][j] == "0"`, the height is 0.', 'For each row, use a monotonic stack to find the largest rectangle in O(cols) time.'],
    companies: ['Amazon', 'Google', 'Meta'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 189
  },
  {
    slug: 'burst-balloons',
    title: 'Burst Balloons',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: `You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.

If you burst the \`i^{th}\` balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds of the array, then treat it as if there is a balloon with a \`1\` painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.`,
    examples: [
      { input: 'nums = [3,1,5,8]', output: '167', explain: 'nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []\ncoins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167' },
      { input: 'nums = [1,5]', output: '10', explain: '' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 300',
      '0 <= nums[i] <= 100'
    ],
    testCases: [
      { input: { nums: [3,1,5,8] }, expected: 167, functionCall: 'maxCoins([3,1,5,8])' },
      { input: { nums: [1,5] }, expected: 10, functionCall: 'maxCoins([1,5])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxCoins(nums) {
    
}`,
      python: `def maxCoins(nums):
    pass`,
      cpp: `int maxCoins(vector<int>& nums) {
    
}`,
      java: `public int maxCoins(int[] nums) {
    
}`
    },
    hints: ['Pad the `nums` array with a 1 at both the start and end to handle boundary conditions easily.', 'Instead of thinking about which balloon to burst first, think about which balloon to burst LAST in the interval `[left, right]`.', 'Let `dp[left][right]` be the max coins collected in the open interval `(left, right)`. For each `k` in `(left, right)`, if `k` is the last balloon to burst, then `dp[left][right] = max(dp[left][k] + dp[k][right] + nums[left] * nums[k] * nums[right])`.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Google',
    order: 190
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
