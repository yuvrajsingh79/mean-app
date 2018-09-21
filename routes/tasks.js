var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://yuvi:Passw0rd@ds163842.mlab.com:63842/mytasklist_yuvi',['tasks']);

//Get All Tasks
router.get('/tasks', (req, res, next) => {
    //res.send('tasks api ');
    db.tasks.find((err, tasks) =>{
        if(err){
            res.send(err);
        }
        res.send(tasks);
    });
});

//Get a single task
router.get('/task/:id', (req, res, next) =>{
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) =>{
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Create a new task in the list
router.post('/task', (req, res, next) =>{
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data supplied !"
        });
    } else {
        db.tasks.save(task, (err, task) =>{
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
})

//Remove a task from the list
router.delete('/task:id', (req,res,next) =>{
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) =>{
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Update a task from the list
router.put('/task:id', (req,res, next) =>{
    var task = req.body;
    var updTask = {};
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Invalid  input supplied !"
        });
    } else {
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask, {}, (err, task)=>{
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;