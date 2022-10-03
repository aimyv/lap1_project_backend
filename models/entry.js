const data = require('../data.json');
const fs = require("fs");

var edata = fs.readFileSync('./data.json');
var entryData = JSON.parse(edata);

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
        const entries = data.map((entry) => new Entry(entry));
        return entries;
    }

    static findById(postId) {
        const entryData = data.filter((entry) => entry.postId == postId)[0];
        if (!entryData){
            return;
        }
        const entry = new Entry(entryData);
        return entry;
    }

    static create(entry) {
        const newEntryId = data.length + 1;
        const newEntry = new Entry({ postId: newEntryId, ...entry});
        entryData.push(newEntry);
        var newData = JSON.stringify(entryData);
        fs.writeFile('data.json', newData, err => {
            if(err) throw err;
            
            console.log("New data added");
        }); 
    }

    update(key, value){
        if(key === "comments"){
            this.comments.push(value)
        } 
        if(key === "e1"){
            this.e1 += value;
            return this.e1;
        } 
        // if(key === "e2" && value === "inc"){
        //     this.e2++;
        //     return this.e2;
        // } 
        // if(key === "e3" && value === "inc"){
        //     this.e3++;
        //     return this.e3;
        // } 
        // if(key === "e1" && value === "dec" && this.e1 > 0){
        //     this.e1--;
        // } 
        // if(key === "e2" && value === "dec" && this.e2 > 0){
        //     this.e2--;
        // } 
        // if(key === "e3" && value === "dec" && this.e3 > 0){
        //     this.e1--;
        // } 
    }

    destroy() {
        const entry = data.filter((entry) => entry.postId === this.postId)[0];
        data.splice(data.indexOf(entry), 1);
    }

}

module.exports = Entry;
