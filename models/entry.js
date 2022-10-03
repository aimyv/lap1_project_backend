const data = require('../data');

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
        data.push(newEntry);
        return newEntry;
    }

    update(key, value){
        if(key === "comments"){
            this.comments.push(value)
        } else if(key === "e1" && value === "inc"){
            this.e1++;
        } else if(key === "e2" && value === "inc"){
            this.e2++;
        } else if(key === "e3" && value === "inc"){
            this.e3++;
        }
    }

    destroy() {
        const entry = data.filter((entry) => entry.postId === this.postId)[0];
        data.splice(data.indexOf(entry), 1);
    }

}

module.exports = Entry;
