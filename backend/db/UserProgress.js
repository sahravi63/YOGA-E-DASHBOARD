const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedSteps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TutorialStep' }],
  });
  
  const UserProgress = mongoose.model('UserProgress', userProgressSchema);
  