const fs = require("fs");

let edata, entryData

let react = [false, false, false]

class Entry {
    constructor(data,) {
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
        edata = fs.readFileSync('./data.json');
        entryData = JSON.parse(edata);

        const entries = entryData.map((entry) => new Entry(entry));
        return entries;
    }

    static findById(postId) {
        edata = fs.readFileSync('./data.json');
        entryData = JSON.parse(edata);
        const entry = entryData.filter((entry) => entry.postId == postId)[0];
        if (!entry){
            return;
        }
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

        if (( (key === "e1" && !react[0]) || (key === "e2" && !react[1]) || (key === "e3" && !react[2]) )
            && value === "inc") {
            entryData[id - 1][key]++;
            react[parseInt(key[1])-1] = true;
        }

        if (( (key === "e1" && react[0]) || (key === "e2" && react[1]) || (key === "e3" && react[2]) )
            && value === "dec"
            && entryData[id - 1][key] > 0) {
            entryData[id - 1][key]--;
            react[parseInt(key[1])-1] = false;
        }

        const newData = JSON.stringify(entryData);
        
        fs.writeFile('./data.json', newData, err => {
            if (err) throw err;
            console.log("Entry data updated");
        });
    }

    destroy() {
        const entry = entryData.filter((entry) => entry.postId === this.postId)[0];
        entryData.splice(entryData.indexOf(entry), 1)
        const newData = JSON.stringify(entryData);
        
        fs.writeFile('./data.json', newData, err => {
            if (err) throw err;
            console.log("Entry data updated");
        });
    }

}

module.exports = Entry;
