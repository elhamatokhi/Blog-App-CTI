import express from "express";
import { getPosts, savePosts } from "../utils/fileHelpers.js";

const router = express.Router();

export default (upload) => {
    
  router.get("/", (req, res) => {
    const posts = getPosts();
    res.render("index", { posts });
  });

  // ADD
  router.get('/add',(req,res)=>{
     res.render('add')
  })

  router.post('/create',upload.single('image'), (req,res)=>{
    const posts = getPosts()
    posts.push({
        title: req.body.title,
        content:req.body.content,
        image: req.file ? '/uploads/'+req.file.filename : null
    })

    savePosts(posts)
    res.redirect('/')
})

// Edit
    router.get('/edit/:id',(req,res)=>{
        const posts = getPosts()
        const ID = req.params.id
        const post = posts[ID]
        
        res.render('edit',{id:ID,post})
    })

    router.post('/edit/:id',upload.single('image'),(req,res)=>{
         const posts = getPosts()
         const ID = req.params.id
         const post = posts[ID]
        
         post.title = req.body.title
         post.content = req.body.content
         if(req.file)
            post.image = `/uploads/${req.file.filename}`

         savePosts(posts)
         res.redirect('/')

    })

// Delete
    router.post('/delete/:id',(req,res)=>{
        const posts = getPosts()
        const ID = req.params.id
        posts.splice(ID,1)

        savePosts(posts)
        res.redirect('/')
    })

  return router;
};
