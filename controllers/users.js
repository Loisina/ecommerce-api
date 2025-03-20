import { UserModel } from "../models/user.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
  // Validate User
  const {error, value} = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // check if user does not exist already
  const user = await UserModel.findOne({
    $or: [
      {username: value.username},
      {email: value.email}
    ]
  });
  if (user) {
    return res.status(409).json('User already exists');
  }
  // hash plaintext password
  const hashedPassword = bcrypt.hashSync (value.password, 10);
  // create user record in database
  await UserModel.create({
    ...value,
    password : hashedPassword
  });
  // send registrstion email to user
  // (optionally) Generate access token for user
  // return respose
  res.status(201).json('User registered')
}


export const loginUser = async (req, res, next) => {
  // Validate user information
  const {error, value} = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // Find matching user record in database
  const user = await UserModel.findOne({
    $or: [
      {username: value.username},
      {email: value.email}
    ]
  });
  if (!user) {
    return res.status(409).json('User does not exist');
  }
  // compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    res.status(401).json('invalid credentials!')
  }
  // generate access token for user
  const accessToken = jwt.sign(
    {id: user.id}, 
    process.env.JWT_SECRET_KEY,
    {expiresIn : "24h"}
  );
  // return response
  res.status(200).json({accessToken});
}


export const updateUser = async (req, res, next) => {
  const {error, value} = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error)
  }
  // update user in db
  const result = await UserModel.findByIdAndUpdate(req.params.id,
    value,
  {new: true});
  return res.status(200).json("user updated successfully")
}