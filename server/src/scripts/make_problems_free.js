const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  const cursor = await db.collection('problems').find({isPremium: true, difficulty: { $in: ['Easy', 'Medium'] }}).limit(60);
  const problems = await cursor.toArray();
  
  let count = 0;
  for(const p of problems) {
    await db.collection('problems').updateOne(
      { _id: p._id },
      { $set: { isPremium: false, tier: 'free' } }
    );
    count++;
  }
  
  console.log('Successfully converted ' + count + ' premium problems to free tier.');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
