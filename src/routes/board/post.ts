import { verify } from 'jsonwebtoken';
import {Board} from '../../../database/models/Board';
import * as express from "express";
import 'dotenv/config'
const env = process.env;
export const post_board = (req : express.Request , res : express.Response) => {
  const { title, content } = req.body;
  const { token } = req.headers;
  if(title && content && token){
    verify(token, env.TOKEN_SECRET, async (err, decoded) => {
      if (err == null) {
        const { pk : user_pk } = decoded;
        const board : any = await Board.create<Board>({
          user_pk,
          title,
          content
        }).catch(err => {
          res.status(500).json({ success: false });
        });
        const { pk : board_pk } = board;
        res.status(200).json({ success: true, pk : board_pk });
      } else{
        res.status(412).json({ success: false });
      }
    });
  } else{
    res.status(412).json({success: false});
  }
};
