const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  const titles = ['Two Sum', 'Valid Anagram', 'Contains Duplicate', 'Group Anagrams', 'Product of Array Except Self'];
  const res = await db.collection('problems').find({title: { $in: titles }}).toArray();
  console.log(res.map(r => r.slug + ' -> ' + r.title + ' (Faang: ' + r.isFaang + ', Premium: ' + r.isPremium + ')'));
  process.exit(0);
});
