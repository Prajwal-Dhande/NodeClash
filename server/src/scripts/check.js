const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const db = mongoose.connection.db;
  
  const all = await db.collection('problems').countDocuments();
  console.log('Total Problems:', all);
  
  const active = await db.collection('problems').countDocuments({isActive: true});
  console.log('Active Problems:', active);
  
  const free = await db.collection('problems').countDocuments({isFaang: {$ne: true}});
  console.log('Free Problems (isFaang !== true):', free);
  
  const premium = await db.collection('problems').countDocuments({isPremium: true});
  console.log('Premium Problems:', premium);
  
  process.exit(0);
});
