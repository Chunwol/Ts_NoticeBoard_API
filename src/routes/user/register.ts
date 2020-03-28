import {User} from '../../../database/models/User';
import * as express from "express";

export const register = async (req : express.Request , res : express.Response) => {
  const { id, password, name } : any = req.body;
  if(id && password && name){
    const user : any = await User.create<User>({
      id,
      password,
      name
    }).catch(err => {
      res.status(500).json({ success: false });
    });
  
    if (user) {
      res.status(200).json({
        success: true,
        message: 'register success'
       });
    } else{
      res.status(412).json({ success: false });
    }
  } else{
    res.status(412).json({success: false});
  }
};