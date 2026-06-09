const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    category: 'Hashing',
    description: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of continuous subarrays whose sum equals to \`k\`.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2', explain: 'The subarrays are [1, 1] (index 0 to 1) and [1, 1] (index 1 to 2).' },
      { input: 'nums = [1,2,3], k = 3', output: '2', explain: 'The subarrays are [1, 2] and [3].' }
    ],
    constraints: [
      '1 <= nums.length <= 2 * 10^4',
      '-1000 <= nums[i] <= 1000',
      '-10^7 <= k <= 10^7'
    ],
    testCases: [
      { input: { nums: [1,1,1], k: 2 }, expected: 2, functionCall: 'subarraySum([1,1,1], 2)' },
      { input: { nums: [1,2,3], k: 3 }, expected: 2, functionCall: 'subarraySum([1,2,3], 3)' },
      { input: { nums: [-1,-1,1], k: 0 }, expected: 1, functionCall: 'subarraySum([-1,-1,1], 0)' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
    
}`,
      python: `def subarraySum(nums, k):
    pass`,
      cpp: `int subarraySum(vector<int>& nums, int k) {
    
}`,
      java: `public int subarraySum(int[] nums, int k) {
    
}`
    },
    hints: ['Will a simple prefix sum array be enough to solve this in O(n) time?', 'Use a hash map to store the cumulative sum and its frequency. If `currentSum - k` exists in the map, add its frequency to the total count.'],
    companies: ['Google', 'Meta', 'Amazon'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Meta',
    order: 11
  },
  {
    slug: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    category: 'Intervals',
    description: `Given an array of meeting time \`intervals\` where \`intervals[i] = [start_i, end_i]\`, determine if a person could attend all meetings.`,
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explain: 'The meeting [5,10] overlaps with [0,30].' },
      { input: 'intervals = [[7,10],[2,4]]', output: 'true', explain: 'No meetings overlap.' }
    ],
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i < end_i <= 10^6'
    ],
    testCases: [
      { input: { intervals: [[0,30],[5,10],[15,20]] }, expected: false, functionCall: 'canAttendMeetings([[0,30],[5,10],[15,20]])' },
      { input: { intervals: [[7,10],[2,4]] }, expected: true, functionCall: 'canAttendMeetings([[7,10],[2,4]])' },
      { input: { intervals: [] }, expected: true, functionCall: 'canAttendMeetings([])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals) {
    
}`,
      python: `def canAttendMeetings(intervals):
    pass`,
      cpp: `bool canAttendMeetings(vector<vector<int>>& intervals) {
    
}`,
      java: `public boolean canAttendMeetings(int[][] intervals) {
    
}`
    },
    hints: ['Sort the intervals by their start time.', 'Iterate through the sorted intervals and check if the start time of the current interval is less than the end time of the previous interval.'],
    companies: ['Meta', 'Google', 'Microsoft'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 76,
    isFaang: true,
    topCompany: 'Microsoft',
    order: 12
  },
  {
    slug: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'Medium',
    category: 'Intervals',
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of conference rooms required.`,
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explain: 'We need one room for [0, 30] and another room for [5, 10] and [15, 20].' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1', explain: 'Both meetings can share the same room.' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i < end_i <= 10^6'
    ],
    testCases: [
      { input: { intervals: [[0,30],[5,10],[15,20]] }, expected: 2, functionCall: 'minMeetingRooms([[0,30],[5,10],[15,20]])' },
      { input: { intervals: [[7,10],[2,4]] }, expected: 1, functionCall: 'minMeetingRooms([[7,10],[2,4]])' },
      { input: { intervals: [[1,5],[8,9],[8,9]] }, expected: 2, functionCall: 'minMeetingRooms([[1,5],[8,9],[8,9]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
    
}`,
      python: `def minMeetingRooms(intervals):
    pass`,
      cpp: `int minMeetingRooms(vector<vector<int>>& intervals) {
    
}`,
      java: `public int minMeetingRooms(int[][] intervals) {
    
}`
    },
    hints: ['Can you separate the start and end times, sort them, and iterate through both with two pointers?', 'When a meeting starts, you need a room. When a meeting ends, a room is freed.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 50,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Google',
    order: 13
  },
  {
    slug: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    category: 'Intervals',
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.`,
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explain: '[1,3] can be removed and the rest of the intervals are non-overlapping.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2', explain: 'You need to remove two [1,2] to make the rest of the intervals non-overlapping.' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^5',
      'intervals[i].length == 2',
      '-5 * 10^4 <= start_i < end_i <= 5 * 10^4'
    ],
    testCases: [
      { input: { intervals: [[1,2],[2,3],[3,4],[1,3]] }, expected: 1, functionCall: 'eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])' },
      { input: { intervals: [[1,2],[1,2],[1,2]] }, expected: 2, functionCall: 'eraseOverlapIntervals([[1,2],[1,2],[1,2]])' },
      { input: { intervals: [[1,2],[2,3]] }, expected: 0, functionCall: 'eraseOverlapIntervals([[1,2],[2,3]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
    
}`,
      python: `def eraseOverlapIntervals(intervals):
    pass`,
      cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    
}`,
      java: `public int eraseOverlapIntervals(int[][] intervals) {
    
}`
    },
    hints: ['Sort the intervals by their end time.', 'Greedily keep the interval that ends earliest to leave as much room as possible for future intervals.'],
    companies: ['Google', 'Amazon', 'LinkedIn'],
    acceptance: 52,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 14
  },
  {
    slug: 'employee-free-time',
    title: 'Employee Free Time',
    difficulty: 'Hard',
    category: 'Intervals',
    description: `We are given a list \`schedule\` of employees, which represents the working time for each employee. Each employee has a list of non-overlapping intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

\`schedule\` is formatted as a 3D array: \`schedule[i]\` represents the list of intervals for the \`i^{th}\` employee.`,
    examples: [
      { input: 'schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]', output: '[[3,4]]', explain: 'Employee 1 works [1,2], [5,6]. Employee 2 works [1,3]. Employee 3 works [4,10]. Everyone is free between 3 and 4.' },
      { input: 'schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]', output: '[[5,6],[7,9]]', explain: 'All employees are free between [5,6] and [7,9].' }
    ],
    constraints: [
      '1 <= schedule.length <= 50',
      '1 <= schedule[i].length <= 50',
      '0 <= schedule[i][j][0] < schedule[i][j][1] <= 10^8',
      'schedule[i] is sorted by start time.'
    ],
    testCases: [
      { input: { schedule: [[[1,2],[5,6]],[[1,3]],[[4,10]]] }, expected: [[3,4]], functionCall: 'employeeFreeTime([[[1,2],[5,6]],[[1,3]],[[4,10]]])' },
      { input: { schedule: [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]] }, expected: [[5,6],[7,9]], functionCall: 'employeeFreeTime([[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][][]} schedule
 * @return {number[][]}
 */
function employeeFreeTime(schedule) {
    
}`,
      python: `def employeeFreeTime(schedule):
    pass`,
      cpp: `vector<vector<int>> employeeFreeTime(vector<vector<vector<int>>>& schedule) {
    
}`,
      java: `public int[][] employeeFreeTime(int[][][] schedule) {
    
}`
    },
    hints: ['Flatten all the intervals from all employees into a single list and sort them by start time.', 'Merge the overlapping intervals. Any gap between merged intervals represents common free time.'],
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptance: 71,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 90,
    isFaang: true,
    topCompany: 'Google',
    order: 15
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
