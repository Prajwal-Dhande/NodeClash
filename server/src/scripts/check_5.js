const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  const slugs = ['two-sum', 'valid-anagram', 'contains-duplicate', 'group-anagrams', 'product-of-array-except-self'];
  const res = await db.collection('problems').find({slug: { $in: slugs }}).toArray();
  console.log(res.map(r => r.slug + ' -> ' + r.title + ' (Faang: ' + r.isFaang + ', Premium: ' + r.isPremium + ')'));
  process.exit(0);
});
