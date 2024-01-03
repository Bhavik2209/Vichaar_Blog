const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("home", {
        posts: posts
    });

});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/compose", (req, res) => {
    res.render("compose");
});
app.post("/compose", (req, res) => {

    const post = {
        title: req.body.inputBlog,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});
app.post("/",(req,res)=>{
    res.redirect("/compose");
});

app.get("/posts/:postName", (req, res) => {
    const requestedtitle = _.lowerCase(req.params.postName);
    posts.forEach((post) => {
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle == requestedtitle) {
            res.render("post", {
                title: post.title,
                content: post.content

            });
        }
    });

});

app.listen(port, () => {
    console.log(`server is running on port${port}`);
})