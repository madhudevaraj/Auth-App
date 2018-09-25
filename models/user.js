const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const UserSchema = mongoose.Schema({
    
    name:{
        type:String
    },
    
    email:{
        type:String,
        required:true
    },
    
    username:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    }
    
});

// mongoose.model -> creating user model from the schema; module.exports -> export the model to use it outside;
// Name of the model - User; name of the schema - UserSchema; 
const User = module.exports = mongoose.model('User', UserSchema);

// Function to get user by their ID
// Refer about callback and query in - http://mongoosejs.com/docs/queries.html
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

// Function to get user by their username; For query, callback, promise - Refer http://mongoosejs.com/docs/queries.html
/* A mongoose query can be executed in one of two ways. First, if you pass in a callback function the operation will be executed immediately with the results passed to the callback. -> IMPORTANT
A query also has a .then() function, and thus can be used as a promise.
When executing a query with a callback function, you specify your query as a JSON document. */

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser,callback){
    
    // Generate a salt - it is a random key that is used to hash the password
    bcrypt.genSalt(10,function(err,salt){
    
        // Hash the password
        bcrypt.hash(newUser.password, salt, function(err,hash){
            if (err) throw err;
            newUser.password = hash;
            // newUser is an object of User model. newUser is created in users.js file. newUser.save() -> newUser will get saved in mongoDB database in Users table since it is an object of User model. For every model (singular name) created, mongoDB creates a table and gives it plural name.
            newUser.save(callback);
        });
        
    });   
}

// explained in Notes book
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }