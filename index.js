import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let postTitle = [];
let postText = [];
let postDate = [];
let postPosition = -1;
let position = [];
const today = new Date().toISOString().split('T')[0];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON bodies

app.get("/", (req, res) => {
    const data = {
        title: postTitle,
        body: postText,
        date: postDate,
        position: position
    };
    res.render("index.ejs", data);
});

app.post("/submit", (req, res) => {
    postTitle.push(req.body["title"]);
    postText.push(req.body["body"]);
    postDate.push(today);
    postPosition += 1;
    position.push(postPosition);
    const data = {
        title: postTitle,
        body: postText,
        date: postDate,
        position: position
    };
    res.render("index.ejs", data);
});

app.post("/editPost", (req, res) => {
    const { index, title, body } = req.body;
    postTitle[index] = title;
    postText[index] = body;
    const data = {
        title: postTitle,
        body: postText,
        date: postDate,
        position: position
    };
    res.render("index.ejs", data);
});

app.post("/deletePost", (req, res) => {
    const { index } = req.body;
    postTitle.splice(index, 1);
    postText.splice(index, 1);
    postDate.splice(index, 1);
    position.splice(index, 1);
    postPosition -= 1;
    res.status(200).send({ message: 'Post deleted successfully' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
