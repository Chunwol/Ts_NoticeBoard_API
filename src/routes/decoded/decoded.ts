import User from "../../../database/models/User";
import { verify } from 'jsonwebtoken';
import 'dotenv/config'
const env = process.env;

interface Decoded {
    pk: string;
    iat: number;
}

const userPk = async (token : string | string[]) => {
    if(token){
        return await verify(token, env.TOKEN_SECRET, async (err : string, decoded : Decoded) => {
            if (err == null) {
                const pk : string = decoded.pk;
                const user : number = await User.count({ 
                    where: {
                        pk
                    }
                }).catch(err => {
                    return null;
                });
                if(user){
                    return pk;
                } else{
                    return null;
                }
            } else{
                return null;
            }
        })
    } else{
        return null;
    }
}
export default userPk;