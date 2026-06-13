const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const standardProblems = [
  "Valid Palindrome", "Climbing Stairs", "Merge Sorted Array", "Pascal's Triangle",
  "Valid Anagram", "Missing Number", "Reverse String", "First Unique Character",
  "Intersection of Two Arrays", "Fizz Buzz", "Power of Two", "Ugly Number",
  "Isomorphic Strings", "Word Pattern", "Move Zeroes", "Third Maximum Number",
  "Find All Numbers Disappeared", "Assign Cookies", "Island Perimeter", "Number Complement",
  "Keyboard Row", "Find Words That Can Be Formed", "Detect Capital", "Reverse Words in a String III",
  "Student Attendance Record I", "Reshape the Matrix", "Array Partition I", "Maximum Average Subarray I",
  "Set Mismatch", "Maximum Product of Three Numbers", "Average of Levels in Binary Tree", "Image Smoother",
  "Robot Return to Origin", "Judge Route Circle", "Valid Palindrome II", "Degree of an Array",
  "1-bit and 2-bit Characters", "Find Pivot Index", "Self Dividing Numbers", "Flood Fill",
  "Largest Number At Least Twice of Others", "Shortest Completing Word", "Prime Number of Set Bits",
  "Toeplitz Matrix", "Jewels and Stones", "Rotate String", "Unique Morse Code Words", "Number of Lines To Write String",
  "Max Consecutive Ones", "Teemo Attacking", "Base 7", "Relative Ranks", "Perfect Number",
  "Construct the Rectangle", "Next Greater Element I", "Find Mode in Binary Search Tree",
  "Minimum Absolute Difference in BST", "Reverse String II", "Diameter of Binary Tree", "Student Attendance Record II"
];

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const problemsToInsert = standardProblems.map((title, i) => {
  const slug = generateSlug(title);
  return {
    slug,
    title,
    difficulty: i % 3 === 0 ? 'Medium' : 'Easy',
    category: ['Arrays', 'Strings', 'Math', 'Two Pointers', 'Hash Table'][i % 5],
    description: `Given a standard problem **${title}**, write an optimal solution to solve it.\n\nThis is a standard practice problem. Please implement the required function.`,
    examples: [
      { input: 'n = 5', output: 'true', explain: 'Standard input example' }
    ],
    constraints: [
      '1 <= n <= 10^5'
    ],
    testCases: [
      { input: { n: 5 }, expected: true, functionCall: 'solve(5)' }
    ],
    starterCode: {
      javascript: `function solve(n) {\n    // Write your code here\n    \n}`,
      python: `def solve(n):\n    pass`,
      cpp: `bool solve(int n) {\n    // Write your code here\n}`,
      java: `public boolean solve(int n) {\n    // Write your code here\n}`
    },
    hints: ['Think about edge cases.', 'Can you optimize the time complexity?'],
    companies: ['Google', 'Microsoft', 'Amazon'],
    acceptance: Math.floor(Math.random() * 40) + 40, // 40-80%
    isPremium: false,
    tier: 'free',
    isFaang: false,
    order: 100 + i
  };
});

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  
  let count = 0;
  for (const p of problemsToInsert) {
    const existing = await db.collection('problems').findOne({ slug: p.slug });
    if (!existing) {
      await db.collection('problems').insertOne(p);
      count++;
    }
  }
  
  console.log(`Successfully injected ${count} new standard free problems.`);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
