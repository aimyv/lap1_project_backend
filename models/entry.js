// const data = require('../data.json');
const fs = require("fs");

let entryData

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }

    entryData = JSON.parse(jsonString)
    // console.log("File data:", entryData);
})
// var entryData = JSON.parse(edata);

class Entry {
    constructor(data) {
        this.postId = data.postId;
        this.author = data.author;
        this.title = data.title;
        this.content = data.content;
        this.comments = data.comments;
        this.gifUrl = data.gifUrl;
        this.e1 = data.e1;
        this.e2 = data.e2;
        this.e3 = data.e3;
    }

    static get all() {
        const entries = entryData.map((entry) => new Entry(entry));
        return entries;
    }

    static findById(postId) {
        const entry = entryData.filter((entry) => entry.postId == postId)[0];
        if (!entry){
            return;
        }
        // const entry = ;
        return new Entry(entry);
    }

    static create(entry) {
        const newEntryId = entryData.length + 1;
        const newEntry = new Entry({ postId: newEntryId, ...entry});
        entryData.push(newEntry);
        var newData = JSON.stringify(entryData);
        fs.writeFile('./data.json', newData, err => {
            if(err) throw err;
            
            console.log("New data added");
        }); 
    }

    update(id, key, value) {
        if (key === "comments") {
            entryData[id - 1].comments.push(value);
        }

        if ((key === "e1" || key === "e2" || key === "e3")
            && value === "inc") {
            entryData[id - 1][key]++;
        }

        if ((key === "e1" || key === "e2" || key === "e3")
            && value === "dec"
            && entryData[id - 1][key] > 0) {
            entryData[id - 1][key]--;
        }

        const newData = JSON.stringify(entryData);
        
        fs.writeFile('./data.json', newData, err => {
            if (err) throw err;
            console.log("Entry data updated");
        });
    }

}

module.exports = Entry;
