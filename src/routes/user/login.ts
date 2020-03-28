import { sign } from 'jsonwebtoken';
import {User} from '../../../database/models/User';
import * as express from "express";
import 'dotenv/config'
const env = process.env;
export const login = async (req : express.Request , res : express.Response) => {
  const { id, password } : any = req.body;
  if(id && password){
    const user : any = await User.findOne<User>({
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