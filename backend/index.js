const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Problem = require('./models/Problem');

const session = require('express-session');
const passport = require('passport');

dotenv.config();

require('./config/passport')(passport);

const { ensureAuth } = require('./middleware/auth');

const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Set EJS and views directory
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // make this true in production with HTTPS
      sameSite: 'lax', // or 'none' if frontend/backend are on different domains and HTTPS is used
    }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./routes/auth'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));


  
// EJS Routes
// app.get('/', (req,res)=>{
//   res.redirect('http://localhost:3000')
// })
// app.get('/home', ensureAuth, async (req, res) => {
//   const problems = await Problem.find();

//   const userProgressMap = {};
//   req.user.progress.forEach(p => {
//     userProgressMap[p.problemId.toString()] = p.status;
//   });

//   res.render('home', { problems, user: req.user, userProgress: userProgressMap });
// });

// app.get('/problems/:id', ensureAuth, async (req, res) => {
//   const problem = await Problem.findById(req.params.id);
//   if (!problem) return res.status(404).send('Problem not found');
//   res.render('problem', { problem, user: req.user });
// });

// const motivationalMessages = [
//     "Great job! Keep up the awesome work!",
//     "You're crushing it!",
//     "Nice work — you're getting stronger every day!",
//     "Correct! You're a problem-solving machine!",
//     "Boom! You nailed it!"
//   ];
  
// app.post('/problems/:id/submit', ensureAuth, async (req, res) => {
// const { answer } = req.body;
// const problem = await Problem.findById(req.params.id);
// const user = req.user;

// const isCorrect = answer === problem.correctAnswer;
// if (isCorrect) {
//     const hasProgress = user.progress.find(p =>
//       p.problemId.toString() === problem._id.toString()
//     );

//     if (!hasProgress) {
//       user.progress.push({ problemId: problem._id, status: 'Completed' });
//     } else if (hasProgress.status !== 'Completed') {
//       hasProgress.status = 'Completed';
//     }

//     await user.save();
//   }

//   const result = isCorrect
//     ? {
//         correct: true,
//         message: motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
//       }
//     : {
//         correct: false,
//         explanation: problem.explanation
//       };
// res.render('problem', { problem, result, user: req.user });
// });

// React Routes

// Redirect base URL to frontend
app.get('/', (req, res) => {
  res.redirect('http://localhost:3000');
});

// Get all problems
app.get('/api/problems', ensureAuth, async (req, res) => {
  const problems = await Problem.find();
  const userProgressMap = {};
  req.user.progress.forEach(p => {
    userProgressMap[p.problemId.toString()] = p.status;
  });
  // console.log("req.user:", req.user);
  res.json({ problems, user: req.user, userProgress: userProgressMap });
});

// Get a single problem by ID
app.get('/api/problems/:id', ensureAuth, async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) return res.status(404).json({ message: 'Problem not found' });

  res.json({ problem, user: req.user });
});

// Submit an answer to a problem
const motivationalMessages = [
  "Great job! Keep up the awesome work!",
  "You're crushing it!",
  "Nice work — you're getting stronger every day!",
  "Correct! You're a problem-solving machine!",
  "Boom! You nailed it!"
];

app.post('/api/problems/:id/submit', ensureAuth, async (req, res) => {
  const { answer } = req.body;
  const problem = await Problem.findById(req.params.id);
  const user = req.user;

  const isCorrect = answer === problem.correctAnswer;

  if (isCorrect) {
    const hasProgress = user.progress.find(p =>
      p.problemId.toString() === problem._id.toString()
    );

    if (!hasProgress) {
      user.progress.push({ problemId: problem._id, status: 'Completed' });
    } else if (hasProgress.status !== 'Completed') {
      hasProgress.status = 'Completed';
    }

    await user.save();
  }

  const result = isCorrect
    ? {
        correct: true,
        message: motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)],
        explanation: problem.explanation
        
      }
    : {
        correct: false,
        explanation: problem.explanation
      };

  res.json({ problem, result });
});


app.listen(3001, () => {
  console.log('Server running at http://localhost:3000');
});

// const seed = async () => {
//     const count = await Problem.countDocuments();
//     if (count === 0) {
//       await Problem.create({
//         title: "Algebra - Solving for x",
//         question: "What is the value of x in the equation 2x + 3 = 11?",
//         options: ["3", "4", "5", "6"],
//         correctAnswer: "4",
//         explanation: "Subtract 3 from both sides (2x = 8), then divide by 2 (x = 4)."
//       });
//       console.log("Sample problem inserted");
//     }
//   };
//   seed();

// const seedProblems = async () => {
//     const count = await Problem.countDocuments();
//     if (count === 1) {
//       await Problem.insertMany([
//         {
//           title: "Geometry - Triangle Angles",
//           question: "What is the value of x in a triangle with angles 50°, 60°, and x°?",
//           options: ["60", "70", "80", "90"],
//           correctAnswer: "70",
//           explanation: "Sum of angles in a triangle is 180°. x = 180 - 110 = 70°."
//         },
//         {
//           title: "Algebra - Linear Equations",
//           question: "Solve for x: 5x - 2 = 3x + 10",
//           options: ["5", "6", "7", "8"],
//           correctAnswer: "6",
//           explanation: "2x = 12 → x = 6."
//         },
//         {
//           title: "Reading - Inference",
//           question: "If a character gives up their dream job to care for a family member, what can we infer?",
//           options: [
//             "They were fired from their job",
//             "They value family responsibilities",
//             "They are afraid of hard work",
//             "They regret their decision"
//           ],
//           correctAnswer: "They value family responsibilities",
//           explanation: "Their choice suggests a prioritization of family over career."
//         },
//         {
//           title: "Math - Exponents",
//           question: "What is the value of 2^3 × 2^2?",
//           options: ["16", "32", "8", "4"],
//           correctAnswer: "32",
//           explanation: "Add exponents: 2^(3+2) = 2^5 = 32."
//         }
//       ]);
//       console.log("4 sample problems inserted.");
//     }
//   };
//   seedProblems();