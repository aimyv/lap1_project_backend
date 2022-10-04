const express = require('express');
const Entry = require('../models/entry')
const router = express.Router();


router.get('/', (req, res) => {
    const allEntries = Entry.all
    // res.send(allEntries)
    res.send(allEntries)
})

router.get('/:id', (req, res) => {
    // console.log(req);
    // console.log(req.params.id);
    try {
        const entryId = parseInt(req.params.id);
        const selectedEntry = Entry.findById(entryId)
        if (!selectedEntry) {
            throw new Error('This entry does not exist!')
        }
        // res.send(selectedEntry);
        res.send(selectedEntry);
    } catch (err) {
        // console.log(err);
        res.status(404).send({ message: err.message })
    }
})

router.post('/', (req, res) => {
    const data = req.body;
    const newEntry = Entry.create(data);
    // res.status(201).send(newEntry);
    res.status(201).send(newEntry);
})

router.put('/:id', (req, res) => {
    
    const entryId = parseInt(req.params.id);
    
    const selectedEntry = Entry.findById(entryId)

    if(req.body.comment) {
        selectedEntry.update(entryId, "comments", req.body.comment)
    } 
    if(req.body.e1) {
        selectedEntry.update(entryId, "e1", req.body.e1)
    } 
    if(req.body.e2) {
        selectedEntry.update(entryId, "e2", req.body.e2)
    } 
    if(req.body.e3) {
        selectedEntry.update(entryId, "e3", req.body.e3)
    }
    
    // if(req.body.react)
    //     selectedEntry.update("reactions", req.body.react)

    //const data = req.body;
    //const newEntry = Entry.create(data);
    res.status(201).send(selectedEntry);
})
/*
router.delete('/:id', (req, res) => {
    const actId = parseInt(req.params.id);
    const actressToDestroy = Actress.findById(actId);
    actressToDestroy.destroy();
    res.status(204).send();
})
*/

module.exports = router;
