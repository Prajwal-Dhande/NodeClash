const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  status:      { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
  tier:        { type: String, enum: ['pro', 'pro-plus', 'open'], default: 'pro' },
  prizePool:   { type: String, default: '🏆 Premium Badge + 500 ELO Boost' },
  maxSlots:    { type: Number, default: 16 },
  duration:    { type: Number, enum: [10, 15, 20, 30], default: 30 }, // in minutes
  startsAt:    { type: Date, required: true },
  endsAt:      { type: Date },
  problem:     { type: String, default: 'Random MAANG Problem' },
  problemSlug: { type: String, default: 'two-sum-faang' },
  difficulty:  { type: String, default: 'Hard' },
  participants: [{
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username:  String,
    rank:      String,
    elo:       Number,
    score:     { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 },
    joinedAt:  { type: Date, default: Date.now }
  }],
  leaderboard: [{
    position: Number, username: String, score: Number,
    timeTaken: Number, elo: Number, rank: String
  }],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.models.Tournament || mongoose.model('Tournament', tournamentSchema)
