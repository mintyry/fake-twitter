const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

//these are used for POST or PUT
app.use(express.json()); //has express understand that we're dealing with json
app.use(express.urlencoded({ extended :true})); //parses out that info to be string or array
//making paths out of file names, no need for route handlers for files in this folder
app.use(express.static('public'));

// homepage, index.html is not in public folder, so we use route handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'))
})

// 
app.get('/api/tweets', (req, res) => {
    const tweets = require('./db/tweets.json'); //read
    res.json(tweets); //and then immediately send/display json response to client
})

app.post('/api/tweets', (req, res) => {
    const tweets = require('./db/tweets.json');//does the same thing as fs.readFile

    const newTweet = req.body; //i understand that we're taking the user's request and putting it in newTweet, but not totally clear on what body is. Is it that a user's entry will be placed in "body"?

    tweets.push(newTweet); // add new tweet to existing object of tweets

    //we took the tweet.json content, we add a new tweet to it, and we write tweets to tweets.json file; why do we need to stringify if we used app...encoded?
    fs.writeFile('./db/tweets.json', JSON.stringify(tweets, null, 2), err => {
        if(err) throw err;
        res.json({
            message: 'Tweet success',
        })
    })
})

app.listen (PORT, () => {console.log(`app running at http://localhost:${PORT}`)})