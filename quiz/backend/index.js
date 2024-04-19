
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Ingenius', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ isAdmin: user.isAdmin });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      await User.create({ email, password, isAdmin: false });
      res.json({ message: 'User registered successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const questionSchema = new mongoose.Schema({
  quizName: String,
  question: String,
  options: [String],
  correctOption: Number
});

const Question = mongoose.model('Question', questionSchema);

const Result = mongoose.model('Result', new mongoose.Schema({
  question: String,
  correctOption: Number,
  submittedOption: Number,
}));

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Question.distinct('quizName');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/questions/:quizName', async (req, res) => {
  const quizName = req.params.quizName;

  try {
    const questions = await Question.find({ quizName });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/submit-quiz', async (req, res) => {
  const submittedOptions = req.body;

  try {
    const questions = await Question.find({});
    const results = [];

    for (const [question, submittedOption] of Object.entries(submittedOptions)) {
      const correctOption = questions.find(q => q._id == question).correctOption;
      results.push({ question, correctOption, submittedOption });
    }

    await Result.insertMany(results);

    res.json({ message: 'Quiz submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find({});

    const populatedResults = await Promise.all(results.map(async (result) => {
      const question = await Question.findById(result.question);
      return {
        questionText: question.question,
        options: question.options,
        correctOption: question.options[result.correctOption - 1],
        submittedOption: question.options[result.submittedOption - 1]
      };
    }));

    res.json(populatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/clear-results', async (req, res) => {
  try {
    await Result.deleteMany({});
    res.json({ message: 'Previous results cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/add-question', async (req, res) => {
  const newQuestion = req.body;

  try {
    await Question.create(newQuestion);
    res.json({ message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/delete-question/:quizName', async (req, res) => {
  const quizName = req.params.quizName;

  try {
    const deletedCount = await Question.deleteMany({ quizName });
    if (deletedCount > 0) {
      res.json({ message: 'Question(s) deleted successfully' });
    } else {
      res.json({ message: 'No questions found with the provided quizName' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/all-quizzes', async (req, res) => {
  try {
    const quizzes = await Question.distinct('quizName');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
