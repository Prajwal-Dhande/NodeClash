const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  
  // Find all problems injected by the recent script
  // and ensure they have isFaang explicitly set to false and isActive to true
  const res1 = await db.collection('problems').updateMany(
    { isFaang: { $exists: false } },
    { $set: { isFaang: false } }
  );
  console.log(`Updated isFaang false on ${res1.modifiedCount} problems`);

  const res2 = await db.collection('problems').updateMany(
    { isActive: { $exists: false } },
    { $set: { isActive: true } }
  );
  console.log(`Updated isActive true on ${res2.modifiedCount} problems`);
  
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
