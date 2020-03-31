import { sign } from 'jsonwebtoken';
import User from '../../../database/models/User';
import { Request, Response } from "express-serve-static-core";
import 'dotenv/config'
const env = process.env;

export const login = async (req : Request , res : Response) => {
  const id : string = req.body.id;
  const password : string = req.body.password;

  if(id && password){
    const user : void | User = await User.findOne<User>({
      where: {
        id,
        password
      }
    }).catch(err => {
      res.status(500).json({ success: false });
    });
    if (user) {
      const token : string = sign({pk : user.pk}, env.TOKEN_SECRET);
      res.status(200).json({
        success: true,
        user,
        token
      });
    } else{
      res.status(412).json({
        success: false,
        message: 'wrong data'
      })
    }
  } else{
    res.status(412).json({success: false});
  }
};