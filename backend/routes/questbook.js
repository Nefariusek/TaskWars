const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { validateTask } = require('../models/task');
const { validateQuestbook } = require('../models/questbook');

router.post('/', async (req, res) => {
  const Questbook = res.locals.models.questbook;

  const { error } = validateQuestbook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let questbook = new Questbook(req.body);
  await questbook.save();
  res.send(questbook);
});

router.get('/:id/completed', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const tasks = _.filter(questbook.tasks, task => {
    return task.status == 'completed';
  });

  res.send(tasks);
});

router.get('/:id/uncompleted', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const tasks = _.filter(questbook.tasks, task => {
    return task.status == 'in_progress';
  });

  res.send(tasks);
});

router.get('/:id/failed', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const tasks = _.filter(questbook.tasks, task => {
    return task.status == 'failed';
  });

  res.send(tasks);
});

router.put('/:id/task', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const Task = res.locals.models.task;
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const questbookHandel = await Questbook.findById(req.params.id, 'tasks', { lean: true });
  questbookHandel.tasks.push(req.body);

  const questbook = await Questbook.findByIdAndUpdate(
    req.params.id,
    {
      tasks: questbookHandel.tasks,
    },
    { new: true },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});


//get all tasks
router.get('/:id/tasks', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const tasks = _.filter(questbook.tasks);

  res.send(tasks);
});


router.post('/:id/task', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const Task = res.locals.models.task;
  let task = new Task(req.body);
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  
  await task.save();
  console.log(task);
  const questbookHandel = await Questbook.findById(req.params.id, 'tasks', { lean: true });
  questbookHandel.tasks.push(task);

  const questbook = await Questbook.findByIdAndUpdate(
    req.params.id,
    {
      tasks: questbookHandel.tasks,
    },
    { new: true },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});
module.exports = router;
