const express = require('express');
const Entry = require('../models/entry')
const router = express.Router();


router.get('/', (req, res) => {
    const allEntries = Entry.all
    res.send(allEntries)
})

router.get('/:id', (req, res) => {
    console.log(req);
    console.log(req.params.id);
    try {
        const entryId = parseInt(req.params.id);
        const selectedEntry = Entry.findById(entryId)
        if (!selectedEntry) {
            throw new Error('This entry does not exist!')
        }
        res.send(selectedEntry);
    } catch (err) {
        console.log(err);
        res.status(404).send({message: err.message})
    }
})

router.post('/', (req, res) => {
    const data = req.body;
    const newEntry = Entry.create(data);
    res.status(201).send(newEntry);
})

router.delete('/:id', (req, res) => {
    const actId = parseInt(req.params.id);
    const actressToDestroy = Actress.findById(actId);
    actressToDestroy.destroy();
    res.status(204).send();
})

module.exports = router;
