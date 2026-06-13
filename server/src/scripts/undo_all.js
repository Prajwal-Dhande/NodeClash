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

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;

  // 1. Delete the injected standard problems
  const slugs = standardProblems.map(generateSlug);
  const delRes = await db.collection('problems').deleteMany({ slug: { $in: slugs } });
  console.log(`Deleted ${delRes.deletedCount} injected standard problems.`);

  // 2. Revert the converted Elite FAANG problems back to premium
  const revertRes = await db.collection('problems').updateMany(
    { isFaang: true, isPremium: false },
    { $set: { isPremium: true, tier: 'premium' } }
  );
  console.log(`Reverted ${revertRes.modifiedCount} Elite problems back to premium.`);

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
