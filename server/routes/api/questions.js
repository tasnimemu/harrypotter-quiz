const express = require('express');
const router = express.Router();

// Question Data
const Questions = require('../../models/questions-data.json')

/**
 * api GET /api/questions
 * Description: Get all questions in the database (leave answers out)
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */
router.get('/', (req, res) => {
  let newQuestions = [];
  for(let i = 0; i < Questions.length; i++){
    let current = { question: Questions[i].question, 
                    options: Questions[i].options,
                    id: Questions[i].id };
    newQuestions.push(current);
  }
  
  res.send(newQuestions)
})

/**
 * api GET /api/questions/count
 * Description: Gets the count of the questions
 * from the database and returns it 
 * 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  res.send('10');
})

/**
 * api GET /api/questions/:qId
 * Description: Get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {
  let entry;
  for(let i = 0; i < Questions.length; i++){
    if(req.params.qId == Questions[i].id){
      entry = { question: Questions[i].question, 
                options: Questions[i].options,
                id: Questions[i].id};
    }
  }

  res.send(entry)
})


/**
 * api POST /api/questions/result
 * Description: Receives a body with user
 * entered answers and returns the results. 
 * Calculation of the result will happens here
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
router.post('/result', (req, res) => {
  client_ans = req.body;
  let score = 0;
  let total = 0; 
  for(let i = 1; i <= Questions.length; i++){
    if(client_ans[i] === Questions[i - 1].answer){
      score++;
    }
    total++;
  }
  
  let pass_or_fail = "passed!";
  if(score < 7){
    pass_or_fail = "failed.";
  }

  const toReturn = { summary: pass_or_fail, 
                     score: score,
                     total: total };

  res.send(toReturn)
})


module.exports = router;
