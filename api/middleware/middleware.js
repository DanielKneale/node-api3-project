const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(Date.now() , req.method , req.url);
  next()
}

const validateUserId = async (req, res, next) =>{
  // DO YOUR MAGIC
  const {id} = req.params; 
  try{
    const user = await Users.getById(id);
      if(!user){
        res.status(404).json({ message: "user not found" });
      }else{
        req.user = user ;
        next();
      }
  }catch(e){
    res.status(500).json({message: `Error: ${e.message}`});
  }
}

const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next()
  }
}

const validatePost = (req, res, next)=>{
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  }else{
    next()
  }
  
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}