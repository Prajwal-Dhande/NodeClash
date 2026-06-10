const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'Medium',
    category: 'Stack',
    description: `We are given an array \`asteroids\` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.`,
    examples: [
      { input: 'asteroids = [5,10,-5]', output: '[5,10]', explain: 'The 10 and -5 collide resulting in 10. The 5 and 10 never collide.' },
      { input: 'asteroids = [8,-8]', output: '[]', explain: 'The 8 and -8 collide exploding each other.' },
      { input: 'asteroids = [10,2,-5]', output: '[10]', explain: 'The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.' }
    ],
    constraints: [
      '2 <= asteroids.length <= 10^4',
      '-1000 <= asteroids[i] <= 1000',
      'asteroids[i] != 0'
    ],
    testCases: [
      { input: { asteroids: [5,10,-5] }, expected: [5,10], functionCall: 'asteroidCollision([5,10,-5])' },
      { input: { asteroids: [8,-8] }, expected: [], functionCall: 'asteroidCollision([8,-8])' },
      { input: { asteroids: [10,2,-5] }, expected: [10], functionCall: 'asteroidCollision([10,2,-5])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
function asteroidCollision(asteroids) {
    
}`,
      python: `def asteroidCollision(asteroids):
    pass`,
      cpp: `vector<int> asteroidCollision(vector<int>& asteroids) {
    
}`,
      java: `public int[] asteroidCollision(int[] asteroids) {
    
}`
    },
    hints: ['Use a stack to simulate the collisions. Only a positive asteroid going right can collide with a negative asteroid going left.', 'When you see a negative asteroid, pop from the stack while the top is positive and smaller than the negative asteroid.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 45,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 86
  },
  {
    slug: 'basic-calculator-ii',
    title: 'Basic Calculator II',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Given a string \`s\` which represents an expression, evaluate this expression and return its value.

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of \`[-2^31, 2^31 - 1]\`.

**Note:** You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as \`eval()\`.`,
    examples: [
      { input: 's = "3+2*2"', output: '7', explain: '' },
      { input: 's = " 3/2 "', output: '1', explain: '' },
      { input: 's = " 3+5 / 2 "', output: '5', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 3 * 10^5',
      's consists of integers and operators (\'+\', \'-\', \'*\', \'/\') separated by some number of spaces.',
      's represents a valid expression.',
      'All the integers in the expression are non-negative integers in the range [0, 2^31 - 1].'
    ],
    testCases: [
      { input: { s: "3+2*2" }, expected: 7, functionCall: 'calculate("3+2*2")' },
      { input: { s: " 3/2 " }, expected: 1, functionCall: 'calculate(" 3/2 ")' },
      { input: { s: " 3+5 / 2 " }, expected: 5, functionCall: 'calculate(" 3+5 / 2 ")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
    
}`,
      python: `def calculate(s):
    pass`,
      cpp: `int calculate(string s) {
    
}`,
      java: `public int calculate(String s) {
    
}`
    },
    hints: ['If the current character is an operator or we reached the end of the string, process the previously accumulated number according to the previous operator.', 'Use a stack to keep the numbers to be added later. If the previous operator was * or /, pop the stack, perform the operation, and push the result back.'],
    companies: ['Amazon', 'Microsoft', 'LinkedIn'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Amazon',
    order: 87
  },
  {
    slug: 'basic-calculator',
    title: 'Basic Calculator',
    difficulty: 'Hard',
    category: 'Stack',
    description: `Given a string \`s\` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

**Note:** You are **not** allowed to use any built-in function which evaluates strings as mathematical expressions, such as \`eval()\`.`,
    examples: [
      { input: 's = "1 + 1"', output: '2', explain: '' },
      { input: 's = " 2-1 + 2 "', output: '3', explain: '' },
      { input: 's = "(1+(4+5+2)-3)+(6+8)"', output: '23', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 3 * 10^5',
      's consists of digits, \'+\', \'-\', \'(\', \')\', and \' \'.',
      's represents a valid expression.',
      'Every number and running calculation will fit in a signed 32-bit integer.'
    ],
    testCases: [
      { input: { s: "1 + 1" }, expected: 2, functionCall: 'calculate("1 + 1")' },
      { input: { s: " 2-1 + 2 " }, expected: 3, functionCall: 'calculate(" 2-1 + 2 ")' },
      { input: { s: "(1+(4+5+2)-3)+(6+8)" }, expected: 23, functionCall: 'calculate("(1+(4+5+2)-3)+(6+8)")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
    
}`,
      python: `def calculate(s):
    pass`,
      cpp: `int calculate(string s) {
    
}`,
      java: `public int calculate(String s) {
    
}`
    },
    hints: ['Keep track of a running sum and the current sign (1 for positive, -1 for negative).', 'When you encounter a \'(\', push the current sum and current sign onto the stack, and reset them to evaluate the expression inside the parenthesis.', 'When you encounter a \')\', pop the sign and the previous sum from the stack, and add the result of the evaluated parenthesis.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Google',
    order: 88
  },
  {
    slug: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    category: 'Monotonic Stack',
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.`,
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10', explain: 'The largest rectangle is shown in the shaded area, which has an area = 10 units.' },
      { input: 'heights = [2,4]', output: '4', explain: '' }
    ],
    constraints: [
      '1 <= heights.length <= 10^5',
      '0 <= heights[i] <= 10^4'
    ],
    testCases: [
      { input: { heights: [2,1,5,6,2,3] }, expected: 10, functionCall: 'largestRectangleArea([2,1,5,6,2,3])' },
      { input: { heights: [2,4] }, expected: 4, functionCall: 'largestRectangleArea([2,4])' },
      { input: { heights: [2,1,2] }, expected: 3, functionCall: 'largestRectangleArea([2,1,2])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    
}`,
      python: `def largestRectangleArea(heights):
    pass`,
      cpp: `int largestRectangleArea(vector<int>& heights) {
    
}`,
      java: `public int largestRectangleArea(int[] heights) {
    
}`
    },
    hints: ['We can use a Monotonic Stack to find the left and right boundaries for each bar.', 'The stack will maintain the indices of the bars in strictly increasing order of their heights.', 'When we encounter a bar smaller than the top of the stack, it means we found the right boundary for the bar at the top of the stack.'],
    companies: ['Amazon', 'Meta', 'Google'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 98,
    isFaang: true,
    topCompany: 'Amazon',
    order: 89
  },
  {
    slug: 'maximum-frequency-stack',
    title: 'Maximum Frequency Stack',
    difficulty: 'Hard',
    category: 'Stack',
    description: `Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the \`FreqStack\` class:
- \`FreqStack()\` constructs an empty frequency stack.
- \`void push(int val)\` pushes an integer \`val\` onto the top of the stack.
- \`int pop()\` removes and returns the most frequent element in the stack.
  - If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.`,
    examples: [
      { input: '["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]\n[[], [5], [7], [5], [7], [4], [5], [], [], [], []]', output: '[null, null, null, null, null, null, null, 5, 7, 5, 4]', explain: 'FreqStack freqStack = new FreqStack();\nfreqStack.push(5); // The stack is [5]\nfreqStack.push(7); // The stack is [5,7]\nfreqStack.push(5); // The stack is [5,7,5]\nfreqStack.push(7); // The stack is [5,7,5,7]\nfreqStack.push(4); // The stack is [5,7,5,7,4]\nfreqStack.push(5); // The stack is [5,7,5,7,4,5]\nfreqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].\nfreqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].\nfreqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].\nfreqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].' }
    ],
    constraints: [
      '0 <= val <= 10^9',
      'At most 2 * 10^4 calls will be made to push and pop.',
      'It is guaranteed that there will be at least one element in the stack before calling pop.'
    ],
    testCases: [
      { input: { ops: ["push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"], vals: [[5], [7], [5], [7], [4], [5], [], [], [], []] }, expected: [null, null, null, null, null, null, 5, 7, 5, 4], functionCall: 'runFreqStack(["push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"], [[5], [7], [5], [7], [4], [5], [], [], [], []])' }
    ],
    starterCode: {
      javascript: `class FreqStack {
    constructor() {
        
    }

    /** 
     * @param {number} val
     * @return {void}
     */
    push(val) {
        
    }

    /**
     * @return {number}
     */
    pop() {
        
    }
}

// Wrapper for testing
function runFreqStack(ops, vals) {
    const fs = new FreqStack();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "push") result.push(fs.push(vals[i][0]) ?? null);
        else if (ops[i] === "pop") result.push(fs.pop());
    }
    return result;
}`,
      python: `class FreqStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> int:
        pass`,
      cpp: `class FreqStack {
public:
    FreqStack() {
        
    }
    
    void push(int val) {
        
    }
    
    int pop() {
        
    }
};`,
      java: `class FreqStack {

    public FreqStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public int pop() {
        
    }
}`
    },
    hints: ['Evidently, we care about the frequency of an element. Let freq be a Map from x to the number of occurrences of x.', 'Also, we (probably) care about maxfreq, the current maximum frequency of any element in the stack.', 'The main question then becomes: among elements with the same (maximum) frequency, how do we know which is most recent? We can use a Map from frequency to a Stack of elements with that frequency.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 64,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Amazon',
    order: 90
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
