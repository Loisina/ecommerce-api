// import jwt from "jsonwebtoken"
import { expressjwt } from "express-jwt";


export const isAuthenticated = expressjwt({
  secret : process.env.JWT_SECRET_KEY,
  algorithms : ["HS256"],
});

// export const isAuthenticated = (req, res, next) => {
  
//   // get the authorizatio header
//   const authorization = req.headers.authorization;
//   // check the presence of authorization
//   if (!authorization) {
//     return res.status(401).json('authorization Header does nor exist')
//   };
//   // then get accdess from authorizarion
//   const token = authorization.split(" ")[1]
//   // check if token exists
//   if (!token) {
//     return res.status(401).json('Access token not provided')
//   };
//   // verify and decide access token
//   const decoded = jwt.verify(
//     token,
//     process.env.JWT_SECRET_KEY,
//     (error,decoded) => {
//       // handle verify error
//       if (error) {
//         return res.status(401).json(error);
//       }
//       // add the decoded to request object
//       req.user = decoded
//       // proceed to next handly
//       next();
//           }
//   );
 
// }