//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


  let posts = [];   // suggestion to use let , insnted of var



app.get("/" , function(req,res){
  res.render("home" , {title : "Home" , posts : posts , startingcontent : homeStartingContent});
})

app.get("/about" , function(req,res){
  res.render("about" , {title : "About" , startingcontent : aboutContent});
})

app.get("/contact" , function(req,res){
  res.render("contact" , {title : "Contact" , startingcontent : contactContent});
})



app.get("/compose" , function(req,res){
  res.render("compose" , {title : "Compose" });
})





// concept of parameters 

    // instead of creating route for each different topic , there a concept of params    with : 

// /news/science       // see the below written app.get 
// /news/math           // see the below written app.get 
// /news/politics         // see the below written app.get 
 
// eg : 

app.get("/news/:topic" , function(req,res){          
  console.log(req.params.topic);     // note - its req , not res  //  http://localhost:3000/news/sciecne   ans- science       http://localhost:3000/news/math   ans- math     
})




app.get("/posts/:postName" , function(req,res){
  
  // https://lodash.com/docs/#lowerCase  // if any of caps , or - within words it removes ans lowercase the letters   // if  "Another post" -->  ans : another post      , 2) another-Post  -> another post
  let reqtitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    let storetitle = _.lowerCase(post.title);

    if(reqtitle == storetitle){
      console.log("Math Found");
      res.render("post" , {title : storetitle , startingcontent : post.content});

      // res.redirect(`/${reqtitle}`);


    }
    else{
      console.log("Not Found");
    }
  })

})




app.post("/compose" , function(req,res){
  
  // let postTitle = req.body.postTitle;
  // let postbody = req.body.postbody;

  const post = {
    title : req.body.postTitle,
    content : req.body.postbody
  }

  posts.push(post);

  res.redirect('/');
  
})




const PORT = process.env.PORT || 3030;

app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
