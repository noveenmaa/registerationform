const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index:true
  },
  phonenumber: {
    type: Number,
  },
  age: {
    type: Number,
    required: false,
    default: null,
  },
});

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // const datapass = await bcrypt.hash(password, 10);

    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
    this.confirmpassword=undefined
  }
  next();
});

const Registerval = new mongoose.model("Register", employeeSchema);
module.exports = Registerval;
