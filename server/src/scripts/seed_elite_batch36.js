const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'Medium',
    category: 'Heap',
    description: `You are given an array of CPU \`tasks\`, each represented by letters A to Z, and a cooling time \`n\`. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: **identical** tasks must be separated by at least \`n\` intervals due to cooling time.

Return the *minimum number of intervals* required to complete all tasks.`,
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8', explain: 'A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.\nAfter completing task A, you must wait two cycles before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th cycle, you can do A again as 2 intervals have passed.' },
      { input: 'tasks = ["A","C","A","B","D","B"], n = 1', output: '6', explain: 'A possible sequence is: A -> B -> C -> D -> A -> B.\nWith a cooling interval of 1, you can repeat a task after just one other task.' },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 3', output: '10', explain: 'A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.\nThere are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.' }
    ],
    constraints: [
      '1 <= tasks.length <= 10^4',
      'tasks[i] is an uppercase English letter.',
      '0 <= n <= 100'
    ],
    testCases: [
      { input: { tasks: ["A","A","A","B","B","B"], n: 2 }, expected: 8, functionCall: 'leastInterval(["A","A","A","B","B","B"], 2)' },
      { input: { tasks: ["A","C","A","B","D","B"], n: 1 }, expected: 6, functionCall: 'leastInterval(["A","C","A","B","D","B"], 1)' },
      { input: { tasks: ["A","A","A","B","B","B"], n: 3 }, expected: 10, functionCall: 'leastInterval(["A","A","A","B","B","B"], 3)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
function leastInterval(tasks, n) {
    
}`,
      python: `def leastInterval(tasks, n):
    pass`,
      cpp: `int leastInterval(vector<char>& tasks, int n) {
    
}`,
      java: `public int leastInterval(char[] tasks, int n) {
    
}`
    },
    hints: ['Count the frequencies of each task.', 'The most frequent task determines the number of "blocks" of idles we might need.', 'You can use a Max-Heap to simulate the scheduling process or calculate it mathematically using the formula based on the most frequent tasks.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Meta',
    order: 176
  },
  {
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    category: 'Heap',
    description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

*   For example, for \`arr = [2,3,4]\`, the median is \`3\`.
*   For example, for \`arr = [2,3]\`, the median is \`(2 + 3) / 2 = 2.5\`.

Implement the \`MedianFinder\` class:
*   \`MedianFinder()\` initializes the \`MedianFinder\` object.
*   \`void addNum(int num)\` adds the integer \`num\` from the data stream to the data structure.
*   \`double findMedian()\` returns the median of all elements so far. Answers within \`10^-5\` of the actual answer will be accepted.`,
    examples: [
      { input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]', output: '[null, null, null, 1.5, null, 2.0]', explain: 'MedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0' }
    ],
    constraints: [
      '-10^5 <= num <= 10^5',
      'There will be at least one element in the data structure before calling findMedian.',
      'At most 5 * 10^4 calls will be made to addNum and findMedian.'
    ],
    testCases: [
      { input: { ops: ["addNum", "addNum", "findMedian", "addNum", "findMedian"], vals: [[1], [2], [], [3], []] }, expected: [null, null, 1.5, null, 2.0], functionCall: 'runMedianFinder(["addNum", "addNum", "findMedian", "addNum", "findMedian"], [[1], [2], [], [3], []])' }
    ],
    starterCode: {
      javascript: `class MedianFinder {
    constructor() {
        
    }

    /** 
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        
    }

    /**
     * @return {number}
     */
    findMedian() {
        
    }
}

function runMedianFinder(ops, vals) {
    const mf = new MedianFinder();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "addNum") {
            mf.addNum(vals[i][0]);
            result.push(null);
        } else if (ops[i] === "findMedian") {
            result.push(mf.findMedian());
        }
    }
    return result;
}`,
      python: `class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass`,
      cpp: `class MedianFinder {
public:
    MedianFinder() {
        
    }
    
    void addNum(int num) {
        
    }
    
    double findMedian() {
        
    }
};`,
      java: `class MedianFinder {

    public MedianFinder() {
        
    }
    
    public void addNum(int num) {
        
    }
    
    public double findMedian() {
        
    }
}`
    },
    hints: ['The basic idea is to maintain two heaps: a Max-Heap to store the smaller half of the numbers, and a Min-Heap to store the larger half.', 'When adding a number, insert it into the appropriate heap. Then balance the two heaps so that their sizes differ by at most 1.', 'The median can be easily found by either looking at the root of the larger heap, or the average of the roots of both heaps if they are of the same size.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 51,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 177
  },
  {
    slug: 'partition-equal-subset-sum',
    title: 'Partition Equal Subset Sum',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or \`false\` otherwise.`,
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'true', explain: 'The array can be partitioned as [1, 5, 5] and [11].' },
      { input: 'nums = [1,2,3,5]', output: 'false', explain: 'The array cannot be partitioned into equal sum subsets.' }
    ],
    constraints: [
      '1 <= nums.length <= 200',
      '1 <= nums[i] <= 100'
    ],
    testCases: [
      { input: { nums: [1,5,11,5] }, expected: true, functionCall: 'canPartition([1,5,11,5])' },
      { input: { nums: [1,2,3,5] }, expected: false, functionCall: 'canPartition([1,2,3,5])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
    
}`,
      python: `def canPartition(nums):
    pass`,
      cpp: `bool canPartition(vector<int>& nums) {
    
}`,
      java: `public boolean canPartition(int[] nums) {
    
}`
    },
    hints: ['If the sum of all elements in the array is odd, it\'s impossible to partition it into two equal sum subsets.', 'This problem reduces to finding if there exists a subset in the array that sums up to `total_sum / 2`.', 'This is a classic 0/1 Knapsack problem. You can solve it using Dynamic Programming with a 1D array.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 178
  },
  {
    slug: 'maximal-square',
    title: 'Maximal Square',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given an \`m x n\` binary \`matrix\` filled with \`0\`'s and \`1\`'s, find the largest square containing only \`1\`'s and return its area.`,
    examples: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '4', explain: 'The largest square of 1s has an area of 4.' },
      { input: 'matrix = [["0","1"],["1","0"]]', output: '1', explain: '' },
      { input: 'matrix = [["0"]]', output: '0', explain: '' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 300',
      'matrix[i][j] is \'0\' or \'1\'.'
    ],
    testCases: [
      { input: { matrix: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]] }, expected: 4, functionCall: 'maximalSquare([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])' },
      { input: { matrix: [["0","1"],["1","0"]] }, expected: 1, functionCall: 'maximalSquare([["0","1"],["1","0"]])' },
      { input: { matrix: [["0"]] }, expected: 0, functionCall: 'maximalSquare([["0"]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} matrix
 * @return {number}
 */
function maximalSquare(matrix) {
    
}`,
      python: `def maximalSquare(matrix):
    pass`,
      cpp: `int maximalSquare(vector<vector<char>>& matrix) {
    
}`,
      java: `public int maximalSquare(char[][] matrix) {
    
}`
    },
    hints: ['Define a DP table where `dp[i][j]` represents the side length of the maximum square whose bottom right corner is the cell with index (i, j) in the original matrix.', 'If `matrix[i][j] == "1"`, then `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`.', 'If `matrix[i][j] == "0"`, then `dp[i][j] = 0`. Keep track of the maximum side length found.'],
    companies: ['Amazon', 'Apple', 'Meta'],
    acceptance: 46,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 80,
    isFaang: true,
    topCompany: 'Amazon',
    order: 179
  },
  {
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to \`target\` is less than \`150\` combinations for the given input.`,
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]', explain: '2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations.' },
      { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]', explain: '' },
      { input: 'candidates = [2], target = 1', output: '[]', explain: '' }
    ],
    constraints: [
      '1 <= candidates.length <= 30',
      '2 <= candidates[i] <= 40',
      'All elements of candidates are distinct.',
      '1 <= target <= 40'
    ],
    testCases: [
      { input: { candidates: [2,3,6,7], target: 7 }, expected: [[2,2,3],[7]], functionCall: 'runCombinationSum([2,3,6,7], 7)' },
      { input: { candidates: [2,3,5], target: 8 }, expected: [[2,2,2,2],[2,3,3],[3,5]], functionCall: 'runCombinationSum([2,3,5], 8)' },
      { input: { candidates: [2], target: 1 }, expected: [], functionCall: 'runCombinationSum([2], 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    
}

function runCombinationSum(candidates, target) {
    let res = combinationSum(candidates, target);
    res.forEach(arr => arr.sort((a,b)=>a-b));
    return res.sort((a,b) => {
        if(a.length !== b.length) return a.length - b.length;
        for(let i=0; i<a.length; i++) {
            if(a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
    });
}`,
      python: `def combinationSum(candidates, target):
    pass`,
      cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    
}`,
      java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    
}`
    },
    hints: ['Use backtracking to explore all possible combinations.', 'At each step, you can either include the current candidate (and stay on the same index since it can be used multiple times) or move to the next candidate.', 'Stop exploring a branch when the current sum exceeds the target.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 71,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 95,
    isFaang: true,
    topCompany: 'Amazon',
    order: 180
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
