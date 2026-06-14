const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const batch = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.`,
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explain: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1], functionCall: 'twoSum([2,7,11,15], 9)' }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n    \n}`,
      python: `def twoSum(nums, target):\n    pass`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    \n}`,
      java: `public int[] twoSum(int[] nums, int target) {\n    \n}`
    },
    hints: ['A really brute force way would be to search for all possible pairs of numbers but that would be too slow.', 'Try to use a hash map.'],
    companies: ['Amazon', 'Google', 'Apple'],
    acceptance: 49,
    isActive: true,
    isPremium: false,
    isFaang: true,
    faangFrequency: 99,
    tier: 'free',
    order: 1
  },
  {
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true', explain: '' }],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    testCases: [
      { input: { s: 'anagram', t: 'nagaram' }, expected: true, functionCall: 'isAnagram("anagram", "nagaram")' }
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n    \n}`,
      python: `def isAnagram(s, t):\n    pass`,
      cpp: `bool isAnagram(string s, string t) {\n    \n}`,
      java: `public boolean isAnagram(String s, String t) {\n    \n}`
    },
    hints: ['Can you sort both strings?', 'Can you count the frequency of each character?'],
    companies: ['Bloomberg', 'Amazon'],
    acceptance: 63,
    isActive: true,
    isPremium: false,
    isFaang: true,
    faangFrequency: 75,
    tier: 'free',
    order: 2
  },
  {
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true', explain: '' }],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    testCases: [
      { input: { nums: [1,2,3,1] }, expected: true, functionCall: 'containsDuplicate([1,2,3,1])' }
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n    \n}`,
      python: `def containsDuplicate(nums):\n    pass`,
      cpp: `bool containsDuplicate(vector<int>& nums) {\n    \n}`,
      java: `public boolean containsDuplicate(int[] nums) {\n    \n}`
    },
    hints: ['Use a hash set.'],
    companies: ['Apple', 'Amazon'],
    acceptance: 61,
    isActive: true,
    isPremium: false,
    isFaang: true,
    faangFrequency: 60,
    tier: 'free',
    order: 3
  },
  {
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.`,
    examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explain: '' }],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
    testCases: [
      { input: { strs: ["eat","tea","tan","ate","nat","bat"] }, expected: [["bat"],["nat","tan"],["ate","eat","tea"]], functionCall: 'groupAnagrams(["eat","tea","tan","ate","nat","bat"])' }
    ],
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n    \n}`,
      python: `def groupAnagrams(strs):\n    pass`,
      cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    \n}`,
      java: `public List<List<String>> groupAnagrams(String[] strs) {\n    \n}`
    },
    hints: ['Sort each string and use it as a key.'],
    companies: ['Amazon', 'Microsoft'],
    acceptance: 66,
    isActive: true,
    isPremium: false,
    isFaang: true,
    faangFrequency: 85,
    tier: 'free',
    order: 4
  },
  {
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.\n\nThe product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explain: '' }],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    testCases: [
      { input: { nums: [1,2,3,4] }, expected: [24,12,8,6], functionCall: 'productExceptSelf([1,2,3,4])' }
    ],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n    \n}`,
      python: `def productExceptSelf(nums):\n    pass`,
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {\n    \n}`,
      java: `public int[] productExceptSelf(int[] nums) {\n    \n}`
    },
    hints: ['Think about using prefix and suffix products.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 64,
    isActive: true,
    isPremium: false,
    isFaang: true,
    faangFrequency: 88,
    tier: 'free',
    order: 5
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  
  for (const p of batch) {
    const existing = await db.collection('problems').findOne({ slug: p.slug });
    if (existing) {
      await db.collection('problems').updateOne(
        { slug: p.slug },
        { $set: { isPremium: false, tier: 'free', isActive: true, isFaang: true } }
      );
      console.log('Updated existing problem: ' + p.slug);
    } else {
      await db.collection('problems').insertOne(p);
      console.log('Inserted new problem: ' + p.slug);
    }
  }

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
