import pkg from "jsonwebtoken";
const { verify } = pkg;

export default async function auth(req, res, next) {
  try {
    console.log("Running Auth Middleware");
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token provided");
      return res.status(403).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verify(token, process.env.JWT_KEY);
    req.user = decoded.id;
    next();
  }
  
  catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(403).json({ message: "Unauthorized - Invalid token" });
  }
}










// import pkg from "jsonwebtoken";
// const { verify } = pkg;

// export default async function auth(req, res, next) {
//   try {
//     console.log("Auth middleware");

//     const key = req.headers.authorization;

//     if (!key || !key.startsWith("Bearer ")) {
//       console.log("no token");
//       return res.status(403).json({ message: "Token missing" });
//     }

//     const token = key.split(" ")[1];

//     const auth = await verify(token, process.env.JWT_KEY);

//     req.user = auth.id;

//     next();

//   } catch (err) {
//     console.error("JWT Error:", err.message);
//     return res.status(403).json({ message: "Unauthorized - Invalid token" });
//   }
// }
