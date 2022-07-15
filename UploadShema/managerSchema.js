"use strict";
var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  schema = mongoose.Schema;

const manager_schema = new schema({
  firstName: {
    type: String,
    require: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    require: true,
    minlength: 3,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'email is already available'],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  hash_password: {
    type: String,
  },

  address: {
    type: String,
    require: true,
    minlength: 10,
    maxlength: 200,
  },
  dateOfBirth: {
    type: Date,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true,
    minlength: 3,
  },
});



module.exports = mongoose.model("Managers", manager_schema);
