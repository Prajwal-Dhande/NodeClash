const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'backspace-string-compare',
    title: 'Backspace String Compare',
    difficulty: 'Easy',
    category: 'Stack',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if they are equal when both are typed into empty text editors. \`'#'\` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.`,
    examples: [
      { input: 's = "ab#c", t = "ad#c"', output: 'true', explain: 'Both s and t become "ac".' },
      { input: 's = "ab##", t = "c#d#"', output: 'true', explain: 'Both s and t become "".' },
      { input: 's = "a#c", t = "b"', output: 'false', explain: 's becomes "c" while t becomes "b".' }
    ],
    constraints: [
      '1 <= s.length, t.length <= 200',
      's and t only contain lowercase letters and \'#\' characters.'
    ],
    testCases: [
      { input: { s: "ab#c", t: "ad#c" }, expected: true, functionCall: 'backspaceCompare("ab#c", "ad#c")' },
      { input: { s: "ab##", t: "c#d#" }, expected: true, functionCall: 'backspaceCompare("ab##", "c#d#")' },
      { input: { s: "a#c", t: "b" }, expected: false, functionCall: 'backspaceCompare("a#c", "b")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function backspaceCompare(s, t) {
    
}`,
      python: `def backspaceCompare(s, t):
    pass`,
      cpp: `bool backspaceCompare(string s, string t) {
    
}`,
      java: `public boolean backspaceCompare(String s, String t) {
    
}`
    },
    hints: ['The easiest way is to use a Stack. Push characters and pop when you see a \'#\'.', 'Can you do it in O(n) time and O(1) space? Use two pointers starting from the end of the strings to simulate the backspaces.'],
    companies: ['Google', 'Amazon', 'Meta'],
    acceptance: 48,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Google',
    order: 81
  },
  {
    slug: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    category: 'Stack',
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

**Note** that:
- The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.
- The answer and all the intermediate calculations can be represented in a **32-bit** integer.`,
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9', explain: '((2 + 1) * 3) = 9' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6', explain: '(4 + (13 / 5)) = 6' }
    ],
    constraints: [
      '1 <= tokens.length <= 10^4',
      'tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].'
    ],
    testCases: [
      { input: { tokens: ["2","1","+","3","*"] }, expected: 9, functionCall: 'evalRPN(["2","1","+","3","*"])' },
      { input: { tokens: ["4","13","5","/","+"] }, expected: 6, functionCall: 'evalRPN(["4","13","5","/","+"])' },
      { input: { tokens: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"] }, expected: 22, functionCall: 'evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
    
}`,
      python: `def evalRPN(tokens):
    pass`,
      cpp: `int evalRPN(vector<string>& tokens) {
    
}`,
      java: `public int evalRPN(String[] tokens) {
    
}`
    },
    hints: ['Use a Stack. Push numbers onto the stack.', 'When you encounter an operator, pop the last two numbers off the stack, perform the operation, and push the result back onto the stack.'],
    companies: ['Amazon', 'LinkedIn', 'Microsoft'],
    acceptance: 50,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 82
  },
  {
    slug: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element \`val\` onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.`,
    examples: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]', explain: 'MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2' }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'Methods pop, top and getMin operations will always be called on non-empty stacks.',
      'At most 3 * 10^4 calls will be made to push, pop, top, and getMin.'
    ],
    testCases: [
      { input: { ops: ["push", "push", "push", "getMin", "pop", "top", "getMin"], vals: [[-2], [0], [-3], [], [], [], []] }, expected: [null, null, null, -3, null, 0, -2], functionCall: 'runMinStack(["push", "push", "push", "getMin", "pop", "top", "getMin"], [[-2], [0], [-3], [], [], [], []])' }
    ],
    starterCode: {
      javascript: `class MinStack {
    constructor() {
        
    }

    /** 
     * @param {number} val
     * @return {void}
     */
    push(val) {
        
    }

    /**
     * @return {void}
     */
    pop() {
        
    }

    /**
     * @return {number}
     */
    top() {
        
    }

    /**
     * @return {number}
     */
    getMin() {
        
    }
}

function runMinStack(ops, vals) {
    const s = new MinStack();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "push") result.push(s.push(vals[i][0]) ?? null);
        else if (ops[i] === "pop") result.push(s.pop() ?? null);
        else if (ops[i] === "top") result.push(s.top());
        else if (ops[i] === "getMin") result.push(s.getMin());
    }
    return result;
}`,
      python: `class MinStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass`,
      cpp: `class MinStack {
public:
    MinStack() {
        
    }
    
    void push(int val) {
        
    }
    
    void pop() {
        
    }
    
    int top() {
        
    }
    
    int getMin() {
        
    }
};`,
      java: `class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        
    }
    
    public int getMin() {
        
    }
}`
    },
    hints: ['Consider each node in the stack having a minimum value. Push a tuple (val, current_min) instead of just the value.', 'Alternatively, use an auxiliary stack to keep track of the minimums.'],
    companies: ['Amazon', 'Microsoft', 'Bloomberg'],
    acceptance: 53,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 89,
    isFaang: true,
    topCompany: 'Amazon',
    order: 83
  },
  {
    slug: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    category: 'Monotonic Stack',
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i^{th}\` day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]', explain: '' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]', explain: '' },
      { input: 'temperatures = [30,60,90]', output: '[1,1,0]', explain: '' }
    ],
    constraints: [
      '1 <= temperatures.length <= 10^5',
      '30 <= temperatures[i] <= 100'
    ],
    testCases: [
      { input: { temperatures: [73,74,75,71,69,72,76,73] }, expected: [1,1,4,2,1,1,0,0], functionCall: 'dailyTemperatures([73,74,75,71,69,72,76,73])' },
      { input: { temperatures: [30,40,50,60] }, expected: [1,1,1,0], functionCall: 'dailyTemperatures([30,40,50,60])' },
      { input: { temperatures: [30,60,90] }, expected: [1,1,0], functionCall: 'dailyTemperatures([30,60,90])' }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
    
}`,
      python: `def dailyTemperatures(temperatures):
    pass`,
      cpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {
    
}`,
      java: `public int[] dailyTemperatures(int[] temperatures) {
    
}`
    },
    hints: ['If the temperature is say, 70 today, then in the future a warmer temperature must be either 71, 72, 73, ..., 100.', 'We could process the temperatures backwards. Alternatively, we can process them forward and keep a monotonic stack of indices.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 66,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 84
  },
  {
    slug: 'decode-string',
    title: 'Decode String',
    difficulty: 'Medium',
    category: 'Stack',
    description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, \`k\`. For example, there will not be input like \`3a\` or \`2[4]\`.

The test cases are generated so that the length of the output will never exceed \`10^5\`.`,
    examples: [
      { input: 's = "3[a]2[bc]"', output: '"aaabcbc"', explain: '' },
      { input: 's = "3[a2[c]]"', output: '"accaccacc"', explain: '' },
      { input: 's = "2[abc]3[cd]ef"', output: '"abcabccdcdcdef"', explain: '' }
    ],
    constraints: [
      '1 <= s.length <= 30',
      's consists of lowercase English letters, digits, and square brackets \'[]\'.',
      's is guaranteed to be a valid input.',
      'All the integers in s are in the range [1, 300].'
    ],
    testCases: [
      { input: { s: "3[a]2[bc]" }, expected: "aaabcbc", functionCall: 'decodeString("3[a]2[bc]")' },
      { input: { s: "3[a2[c]]" }, expected: "accaccacc", functionCall: 'decodeString("3[a2[c]]")' },
      { input: { s: "2[abc]3[cd]ef" }, expected: "abcabccdcdcdef", functionCall: 'decodeString("2[abc]3[cd]ef")' }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
    
}`,
      python: `def decodeString(s):
    pass`,
      cpp: `string decodeString(string s) {
    
}`,
      java: `public String decodeString(String s) {
    
}`
    },
    hints: ['Use two stacks: one for the numbers and one for the strings.', 'When you encounter a \'[\', push the current number and current string to their respective stacks and reset them.', 'When you encounter a \']\', pop the string and number and append.'],
    companies: ['Google', 'Amazon', 'Bloomberg'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Google',
    order: 85
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
