const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    try {
        const token=req.cookies.token;
       // const authorization = req.headers["authorization"];
        //if (!authorization || !authorization.startsWith("Bearer ")) {
         //   return res.status(401).send({ message: "Token missing or invalid" });
       // }
        
       // const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).send({ message: "Invalid or expired token" });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error("Error while verifying token", error);
        res.status(401).send({ message: "Error while verifying token" });
    }
};

module.exports = verifyToken;
