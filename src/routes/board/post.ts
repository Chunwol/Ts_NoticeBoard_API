import { verify } from 'jsonwebtoken';
import {Board} from '../../../database/models/Board';
import * as express from "express";
import 'dotenv/config'
const env = process.env;
export const post_board = (req : express.Request , res : express.Response) => {
  const { title, content } : any = req.body;
  const { token } : any = req.headers;
  if(title && content && token){
    verify(token, env.TOKEN_SECRET, async (err : string, decoded : string) => {
      if (err == null) {
        const { pk : user_pk } : any = decoded;
        const board : any = await Board.create<Board>({
          user_pk,
          title,
          content
        }).catch(err => {
          res.status(500).json({ success: false });
        });
        const { pk : board_pk } : any = board;
        res.status(200).json({ success: true, pk : board_pk });
      } else{
        res.status(412).json({ success: false });
      }
    });
  } else{
    res.status(412).json({success: false});
  }
};
