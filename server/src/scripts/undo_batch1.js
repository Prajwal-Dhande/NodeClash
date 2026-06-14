const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;

  // Delete the 3 new ones that were inserted
  const slugsToDelete = ['two-sum', 'valid-anagram', 'product-of-array-except-self'];
  const delRes = await db.collection('problems').deleteMany({ slug: { $in: slugsToDelete } });
  console.log(`Deleted ${delRes.deletedCount} injected problems.`);

  // Revert the 2 existing ones that were updated
  const slugsToRevert = ['contains-duplicate', 'group-anagrams'];
  const revRes = await db.collection('problems').updateMany(
    { slug: { $in: slugsToRevert } },
    { $set: { isPremium: true, tier: 'premium' } }
  );
  console.log(`Reverted ${revRes.modifiedCount} problems back to premium.`);

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
