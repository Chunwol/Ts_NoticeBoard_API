import User from '../../../database/models/User';
import { Request, Response } from "express-serve-static-core";

export const register = async (req : Request , res : Response) => {
  const id : string = req.body.id;
  const password : string = req.body.password;
  const name : string = req.body.name;
  
  if(id && password && name){
    const user : void | User = await User.create<User>({
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