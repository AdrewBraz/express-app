const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: 'Please supply an email address',
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  
  name: {
    type: String,
    unique: true,
    required: 'Please supply a name',
    trim: true
  },
                                     
  favoriteTeam: {
    type: String,
    lowercase: true,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
userSchema.plugin(mongodbErrorHandler);

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

const User = mongoose.model('User', userSchema);

module.exports = User;