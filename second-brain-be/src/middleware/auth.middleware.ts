import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import type { Request, Response , NextFunction } from "express";


export async function authMiddleware(req: Request , res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if(!token){
        res.status(401).json({
            message : " login first plzz!"
        })
        return
    }
    try{
        const decodedInfo = jwt.verify(token , SECRET_KEY as string) as { id: string}
        (req as any).id = decodedInfo.id 
        next()
    }
    catch(err){
        return res.status(403).json({
            message : "Invalid token or expired token"
        })
    }
}


// import { SECRET_KEY } from "../config/config"; // removed .js extension if using standard node resolution
// import type { Request, Response, NextFunction } from "express"; // Fixed: Added 'type' and Capitalized

// // 1. Define a custom Request type so we can attach 'id' to it
// interface AuthRequest extends Request {
//     id?: string;
// }

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//     // 2. Fixed: Use 'req.cookies' (plural) and match the name 'accesstoken' from your login route
//     const token = req.cookies?.accesstoken;

//     if (!token) {
//         // Return 401 if no token found
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     try {
//         // 3. Fixed: Removed 'await'. jwt.verify is synchronous!
//         const decoded = jwt.verify(token, SECRET_KEY as string) as { id: string };

//         // 4. Now we can assign the ID because we use 'AuthRequest'
//         req.id = decoded.id;
        
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: "Invalid or expired token" });
//     }
// };