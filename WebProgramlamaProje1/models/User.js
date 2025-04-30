const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Kullanıcı şeması oluşturma
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Şifreyi kaydetmeden önce hashleme
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next(); // Şifre değiştirilmediyse devam et
  }

  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  });
});


// Kullanıcı modelini oluşturma
const User = mongoose.model('User', UserSchema);

module.exports = User;
