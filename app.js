const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const port = 3000;
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("home", {
        para: homeStartingContent,
        posts: posts
    });

});
app.get("/about", (req, res) => {
    res.render("about", {
        aboutC: aboutContent
    });
});
app.get("/contact", (req, res) => {
    res.render("contact", {
        contactC: contactContent
    });
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