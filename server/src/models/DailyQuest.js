const mongoose = require('mongoose')

const dailyQuestSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // 'YYYY-MM-DD' format
  problemSlug: { type: String, required: true },
  problemTitle: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, default: '' },
  solvers: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    timeTaken: { type: Number, default: 0 }, // seconds
    solvedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('DailyQuest', dailyQuestSchema)
