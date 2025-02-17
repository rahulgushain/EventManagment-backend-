const SignUp = require("../Models/SignUp");
// const Login = require("../Models/Login");
const bcrypt = require("bcrypt");
const Event = require('../Models/AddEvent')
require('dotenv').config()
const jwt = require('jsonwebtoken')


exports.SignUp = async (req, res) => {
  try {
    const { email, name, password ,DOB} = req.body;
    const vaild = await SignUp.findOne({ email });
    if (vaild) {
      return res.status(400).json({
        success: false,
        message: "the email is already exist",
      });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const signUp = await SignUp.create({
      name,
      password: HashPassword,
      email,
      DOB
    });
    console.log(signUp);

    res.status(200).json({
      success: true,
      data: signUp,
      message: "New USer Register",
    });
  } catch (error) {
    console.log("SignUp Error", error);
  }
};



exports.Login = async (req, res) => {
  try {
    console.log("Start Login");

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Email and password required");
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const Secret_key = process.env.Secret_key;
    const user = await SignUp.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const PayLoad = {
      email: user.email,
      name: user.name,
    };

    const Token = jwt.sign(PayLoad, Secret_key, { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      token: Token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login error",
      error: error.message,
    });
  }
};



exports.AddEvent = async (req, res) => {
  try {
  console.log("I am in add event");

      const { date, task } = req.body;

      if (!date || !task) {
          return res.status(400).json({
              success: false,
              message: "Task and date are required",
          });
      }

      const tasks = await Event.create({ date, task });

      res.status(200).json({ 
          success: true,
          data: tasks, 
      });

  } catch (error) {
      res.status(400).json({ 
          success: false,
          message: error.message, 
      });
  }
};


exports.Events = async(req,res)=>{
  try {
    
    const events = await Event.find();
    res.status(200).json({
      events
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
