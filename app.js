//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;


const homeStartingContent ="Welcome to my personal blog, a digital haven where I share my passions, experiences, and insights. Join me as I embark on a coding journey, navigating the exciting world of programming and technology. From learning new languages and frameworks to tackling complex coding challenges, I'll document my triumphs, frustrations, and lessons learned along the way. Together, we'll explore the ever-evolving landscape of software development, delve into coding best practices, and unravel the mysteries of building innovative digital solutions.Whether you re a fellow coder seeking inspiration, a student navigating the challenges of college life, or simply a curious soul looking for engaging stories and valuable insights, I invite you to join me on this adventure. Together, well embrace the joys and trials of coding, celebrate the triumphs and tribulations of college life, and forge a community of learners and dreamers. Welcome to my world of coding, college, and everything in between.In addition to my coding adventures, Ill also take you on a tour of my college life. As a student, Im constantly immersed in a vibrant ecosystem of knowledge and growth. From the highs and lows of exams and projects to the friendships forged and memories made, I ll share anecdotes, tips, and reflections on navigating the college experience. We ll explore strategies for time management, effective study techniques, and maintaining a healthy work-life balance amidst the demanding academic environment.Beyond the classroom, I ll dive into the realm of extracurricular activities, from joining clubs and organizations to participating in events and competitions. I ll share the excitement of exploring new interests, honing leadership skills, and making a positive impact on campus and in the community. Together, we ll uncover the transformative power of higher education, the invaluable life lessons learned outside of textbooks, and the personal growth that comes from embracing the college journey."
const aboutContent = "Hello, everyone! My name is Lakshya Singh, and I'm from Delhi. I am a graduate of IIT Bombay, where I pursued my passion for coding and web development. I have always been fascinated by the world of technology and the endless possibilities it offers. I enjoy diving into the intricacies of programming languages and building innovative web applications.Throughout my academic journey, I gained valuable knowledge and practical experience in various aspects of software development, including front-end and back-end technologies.I am constantly seeking new challenges to expand my skills and stay up-to-date with the latest industry trends.Outside of coding, I love exploring new places, capturing moments through photography, and indulging in outdoor activities.I'm excited to connect with like-minded individuals and collaborate on projects that push the boundaries of innovation.Let's build something incredible together!"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-Singh:test1234@cluster0.owyma5m.mongodb.net/blogDB");

const blogSchema = new mongoose.Schema({
  title : String,
  blog : String
})
const Blog = mongoose.model("blog",blogSchema);

const posts = [];

app.get("/",function(req,res){
  Blog.find().then(function(blogs){
    res.render("home",{homeContent : homeStartingContent , posts : blogs});
  })
  
})
app.get("/about",function(req,res){
  
  res.render("about",{aboutContent : aboutContent});
})
app.get("/contact",function(req,res){
  res.render("contact");
})
app.get("/compose",function(req,res){
  
  res.render("compose");
})
app.post("/compose",function(req,res){

  const post = new Blog({
    title : req.body.postTitle,
    blog : req.body.postBody
  });
  post.save();
  res.redirect("/");

  
})
app.get("/posts/:heading",function(req,res){
  var blogtitle =  _.lowerCase(req.params.heading);
  Blog.find().then(function(posts){
    posts.forEach(function(element){
      var Actual_title =  _.lowerCase(element.title);
      if( blogtitle == Actual_title){
        res.render("post",{BlogTitle : element.title , BlogContent : element.blog});
      }
    })
  })
  
  
})


app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
