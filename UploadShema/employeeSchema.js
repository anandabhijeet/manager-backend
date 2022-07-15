const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Employee_schema = new schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "email is already available"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  address: {
    type: String,
    required: true,
    minlength: 20,
  },

  isActive: {
    type: Boolean,
    required: true,
  },

  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employees", Employee_schema);
