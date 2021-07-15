/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();

// Question Data
const Questions = require('../../models/questions-data.json')
// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');


/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
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
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  res.send('10');
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
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
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
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
