const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const existingSlugsToFree = [
  'contains-duplicate',
  'group-anagrams',
  'two-sum-faang',
  'product-of-array-except-self-faang'
];

const newProblem = {
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
};

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;

  // Make the existing 4 problems free
  const resUpdate = await db.collection('problems').updateMany(
    { slug: { $in: existingSlugsToFree } },
    { $set: { isPremium: false, tier: 'free' } }
  );
  console.log(`Updated ${resUpdate.modifiedCount} existing problems to be free.`);

  // Insert Valid Anagram if it doesn't exist
  const existingAnagram = await db.collection('problems').findOne({ slug: 'valid-anagram' });
  if (!existingAnagram) {
    await db.collection('problems').insertOne(newProblem);
    console.log(`Inserted Valid Anagram.`);
  } else {
    await db.collection('problems').updateOne(
      { slug: 'valid-anagram' },
      { $set: { isPremium: false, tier: 'free', isFaang: true, isActive: true } }
    );
    console.log(`Updated existing Valid Anagram.`);
  }

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
