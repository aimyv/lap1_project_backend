const express = require('express');
const Entry = require('../models/entry')
const router = express.Router();


router.get('/', (req, res) => {
    const allEntries = Entry.all
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
        res.send(selectedEntry);
    } catch (err) {
        // console.log(err);
        res.status(404).send({ message: err.message })
    }
})

// pagination with 4 items displayed
// rootURL + entries/posts/query?p=[[page number]]
router.get('/posts/query', (req, res) => {
    const posts = Entry.all

    // console.log("total entries: ", posts.length)

    const pageCount = Math.ceil(posts.length / 4);
    // console.log("total pages // 4: ", pageCount)
    let page = parseInt(req.query.p);
    if (!page) { page = 1; }
    if (page > pageCount) {
        page = pageCount
    }
    res.status(200).json({
        "page": page,
        "pageCount": pageCount,
        "posts": posts.slice(page * 4 - 4, page * 4)
    });
});

router.post('/', (req, res) => {
    const data = req.body;
    const newEntry = Entry.create(data);
    res.status(201).send(newEntry);
})

router.put('/:id', (req, res) => {

    const entryId = parseInt(req.params.id);

    const selectedEntry = Entry.findById(entryId)

    if (req.body.comment) {
        selectedEntry.update(entryId, "comments", req.body.comment)
    }
    if (req.body.del) {
        selectedEntry.update(entryId, "deleteAddedComment", req.body.del)
    }
    if (req.body.e1) {
        selectedEntry.update(entryId, "e1", req.body.e1)
    }
    if (req.body.e2) {
        selectedEntry.update(entryId, "e2", req.body.e2)
    }
    if (req.body.e3) {
        selectedEntry.update(entryId, "e3", req.body.e3)
    }

    res.status(201).send(selectedEntry);
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entryToDestroy = Entry.findById(id);
    entryToDestroy.destroy();
    res.status(204).send();
})


module.exports = router;
