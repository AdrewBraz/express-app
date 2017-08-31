const mongoose = require('../libs/mongoose');
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
                                     
  favoriteTeam: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    unique: true,
    required: true,
  }
});

//authentication

// UserSchema.statics.authenticate = (email, password, callback) => {
//   User.findOne({email: email})
//       .exec((error, user) => {
//         if(error){
//           return callback(error);
//         } else if(!user){
//           let err = new Error("User not found!");
//           err.status = 401;
//           return callback(err);
//         }
//         bcrypt.compare(password, user.password, (error, result) => {
//           if(result === true){
//             return callback(null, user);
//           } else{
//             return callback();
//           }
//         })
//       })   
// }


// UserSchema.pre('save', (next) => {
//   let user = this;
//   bcrypt.hash(user.password, 10, (err, hash) =>{
//     if(err){
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// })

const User = mongoose.model('User', UserSchema);

module.exports = User;