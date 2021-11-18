import { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyToken = (token) => {
	const decodedToken = decode(token);
   return decodedToken;
};
export default verifyToken;