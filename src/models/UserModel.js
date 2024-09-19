const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:  [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
   
  },
  
  role: {
    type: String,
    enum: ['user', 'host', 'admin'],
    default: 'user'
  },

  houseAddress: {
    type: String,
    trim:true
  },

  hostVansIds: [{
    type: mongoose.Schema.ObjectId,
    ref: 'van',
    default: []
  }],

  phoneNumber: {
    type: String,
    trim: true
  },

  dateJoined: {
    type: Date,
    default: Date.now
  },

  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,

});

// Method to check if user is a host
userSchema.methods.isHost = function() {
  return this.role === 'host';
};


module.exports = mongoose.model("User", userSchema);