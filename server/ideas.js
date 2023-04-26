const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js')

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id)
    if(idea) {
        req.idea = idea
        next();
    } else {
        res.status(404).send();
    }
})

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdeas = addToDatabase('ideas', req.body);
    res.status(201).send(newIdeas);
})

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updateIdeasInstance = updateInstanceInDatabase('ideas', req.body);
    res.status(201).send(updateIdeasInstance)
})

ideasRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.id)
    if(deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})