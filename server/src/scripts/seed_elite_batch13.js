const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'first-bad-version',
    title: 'First Bad Version',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have \`n\` versions \`[1, 2, ..., n]\` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API \`bool isBadVersion(version)\` which returns whether \`version\` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.`,
    examples: [
      { input: 'n = 5, bad = 4', output: '4', explain: 'call isBadVersion(3) -> false\ncall isBadVersion(5) -> true\ncall isBadVersion(4) -> true\nThen 4 is the first bad version.' },
      { input: 'n = 1, bad = 1', output: '1', explain: '' }
    ],
    constraints: [
      '1 <= bad <= n <= 2^31 - 1'
    ],
    testCases: [
      { input: { n: 5, bad: 4 }, expected: 4, functionCall: 'solution(isBadVersion)(5)' },
      { input: { n: 1, bad: 1 }, expected: 1, functionCall: 'solution(isBadVersion)(1)' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
function solution(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        
    };
}`,
      python: `def solution(isBadVersion):
    def firstBadVersion(n):
        pass
    return firstBadVersion`,
      cpp: `int firstBadVersion(int n) {
    
}`,
      java: `public int firstBadVersion(int n) {
    
}`
    },
    hints: ['The versions are sorted, meaning it is a sequence of F F F T T T. You need to find the first T.', 'Use binary search. If mid is a bad version, the first bad version is mid or before mid.'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Meta',
    order: 61
  },
  {
    slug: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` if \`target\` is in \`matrix\` or \`false\` otherwise.

You must write a solution in \`O(log(m * n))\` time complexity.`,
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true', explain: '' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false', explain: '' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 100',
      '-10^4 <= matrix[i][j], target <= 10^4'
    ],
    testCases: [
      { input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 }, expected: true, functionCall: 'searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)' },
      { input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13 }, expected: false, functionCall: 'searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)' },
      { input: { matrix: [[1]], target: 1 }, expected: true, functionCall: 'searchMatrix([[1]], 1)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    
}`,
      python: `def searchMatrix(matrix, target):
    pass`,
      cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    
}`,
      java: `public boolean searchMatrix(int[][] matrix, int target) {
    
}`
    },
    hints: ['Treat the 2D matrix as a 1D sorted array.', 'The element at matrix[row][col] is at the 1D index: row * n + col. The element at 1D index i is at matrix[i / n][i % n].'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 48,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 92,
    isFaang: true,
    topCompany: 'Amazon',
    order: 62
  },
  {
    slug: 'time-based-key-value-store',
    title: 'Time Based Key-Value Store',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: `Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the \`TimeMap\` class:
- \`TimeMap()\` Initializes the object of the data structure.
- \`void set(String key, String value, int timestamp)\` Stores the key \`key\` with the value \`value\` at the given time \`timestamp\`.
- \`String get(String key, int timestamp)\` Returns a value such that \`set\` was called previously, with \`timestamp_prev <= timestamp\`. If there are multiple such values, it returns the value associated with the largest \`timestamp_prev\`. If there are no values, it returns \`""\`.`,
    examples: [
      { input: '["TimeMap", "set", "get", "get", "set", "get", "get"]\n[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]', output: '[null, null, "bar", "bar", null, "bar2", "bar2"]', explain: 'timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.\ntimeMap.get("foo", 1);         // return "bar"\ntimeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".\ntimeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.\ntimeMap.get("foo", 4);         // return "bar2"\ntimeMap.get("foo", 5);         // return "bar2"' }
    ],
    constraints: [
      '1 <= key.length, value.length <= 100',
      'key and value consist of lowercase English letters and digits.',
      '1 <= timestamp <= 10^7',
      'All the timestamps timestamp of set are strictly increasing.',
      'At most 2 * 10^5 calls will be made to set and get.'
    ],
    testCases: [
      { input: { ops: ["set", "get", "get", "set", "get", "get"], vals: [["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]] }, expected: [null, "bar", "bar", null, "bar2", "bar2"], functionCall: 'runTimeMap(["set", "get", "get", "set", "get", "get"], [["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]])' }
    ],
    starterCode: {
      javascript: `class TimeMap {
    constructor() {
        
    }

    /** 
     * @param {string} key 
     * @param {string} value 
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        
    }

    /** 
     * @param {string} key 
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        
    }
}

// Wrapper for test cases
function runTimeMap(ops, vals) {
    const tm = new TimeMap();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "set") result.push(tm.set(vals[i][0], vals[i][1], vals[i][2]) ?? null);
        else if (ops[i] === "get") result.push(tm.get(vals[i][0], vals[i][1]));
    }
    return result;
}`,
      python: `class TimeMap:
    def __init__(self):
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        pass

    def get(self, key: str, timestamp: int) -> str:
        pass`,
      cpp: `class TimeMap {
public:
    TimeMap() {
    }
    
    void set(string key, string value, int timestamp) {
    }
    
    string get(string key, int timestamp) {
    }
};`,
      java: `class TimeMap {
    public TimeMap() {
    }
    
    public void set(String key, String value, int timestamp) {
    }
    
    public String get(String key, int timestamp) {
    }
}`
    },
    hints: ['Store the values in a Hash Map mapping keys to lists of (timestamp, value) pairs.', 'Since the set operations always provide strictly increasing timestamps, the list for each key will automatically be sorted by timestamp.', 'Use binary search (bisect_right or upper_bound) to find the largest timestamp <= the requested timestamp.'],
    companies: ['Google', 'Amazon', 'LinkedIn'],
    acceptance: 53,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Google',
    order: 63
  },
  {
    slug: 'maximum-profit-in-job-scheduling',
    title: 'Maximum Profit in Job Scheduling',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: `We have \`n\` jobs, where every job is scheduled to be done from \`startTime[i]\` to \`endTime[i]\`, obtaining a profit of \`profit[i]\`.

You're given the \`startTime\`, \`endTime\` and \`profit\` arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time \`X\` you will be able to start another job that starts at time \`X\`.`,
    examples: [
      { input: 'startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]', output: '120', explain: 'The subset chosen is the first and fourth job. Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.' },
      { input: 'startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]', output: '150', explain: 'The subset chosen is the first, fourth and fifth job. Profit obtained 150 = 20 + 70 + 60.' },
      { input: 'startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]', output: '6', explain: '' }
    ],
    constraints: [
      '1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4',
      '1 <= startTime[i] < endTime[i] <= 10^9',
      '1 <= profit[i] <= 10^4'
    ],
    testCases: [
      { input: { startTime: [1,2,3,3], endTime: [3,4,5,6], profit: [50,10,40,70] }, expected: 120, functionCall: 'jobScheduling([1,2,3,3], [3,4,5,6], [50,10,40,70])' },
      { input: { startTime: [1,2,3,4,6], endTime: [3,5,10,6,9], profit: [20,20,100,70,60] }, expected: 150, functionCall: 'jobScheduling([1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60])' },
      { input: { startTime: [1,1,1], endTime: [2,3,4], profit: [5,6,4] }, expected: 6, functionCall: 'jobScheduling([1,1,1], [2,3,4], [5,6,4])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
function jobScheduling(startTime, endTime, profit) {
    
}`,
      python: `def jobScheduling(startTime, endTime, profit):
    pass`,
      cpp: `int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
    
}`,
      java: `public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
    
}`
    },
    hints: ['Sort the jobs by their end time.', 'Use Dynamic Programming. Let dp[i] be the maximum profit taking elements from the first i jobs.', 'For each job, use binary search to find the latest job that ends before or at the current job\'s start time.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 54,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Google',
    order: 64
  },
  {
    slug: 'search-insert-position',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2', explain: '' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1', explain: '' },
      { input: 'nums = [1,3,5,6], target = 7', output: '4', explain: '' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums contains distinct values sorted in ascending order.',
      '-10^4 <= target <= 10^4'
    ],
    testCases: [
      { input: { nums: [1,3,5,6], target: 5 }, expected: 2, functionCall: 'searchInsert([1,3,5,6], 5)' },
      { input: { nums: [1,3,5,6], target: 2 }, expected: 1, functionCall: 'searchInsert([1,3,5,6], 2)' },
      { input: { nums: [1,3,5,6], target: 7 }, expected: 4, functionCall: 'searchInsert([1,3,5,6], 7)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    
}`,
      python: `def searchInsert(nums, target):
    pass`,
      cpp: `int searchInsert(vector<int>& nums, int target) {
    
}`,
      java: `public int searchInsert(int[] nums, int target) {
    
}`
    },
    hints: ['This is a classic binary search problem looking for the lower bound.', 'If the target is not found, the left pointer will end up at the exact position where the target should be inserted.'],
    companies: ['Amazon', 'Google', 'Apple'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 79,
    isFaang: true,
    topCompany: 'Amazon',
    order: 65
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
