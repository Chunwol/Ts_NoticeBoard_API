import { verify } from 'jsonwebtoken';
import Board from '../../../database/models/Board';
import Decoded from '../decoded/decoded';
import { Request, Response } from "express-serve-static-core";
import 'dotenv/config'
const env = process.env;

export const post_board = (req : Request , res : Response) => {
  const title : string = req.body.title;
  const content : string = req.body.content;
  const token : string | string[] = req.headers.token;

  if(title && content && token){
    verify(token, env.TOKEN_SECRET, async (err : string, decoded : Decoded) => {
      if (err == null) {
        const user_pk : string = decoded.pk;
        const board : void | Board = await Board.create<Board>({
          user_pk,
          title,
          content
        }).catch(err => {
          res.status(500).json({ success: false });
        });
        res.status(200).json({ success: true, board });
      } else{
        res.status(412).json({ success: false });
      }
    });
  } else{
    res.status(412).json({success: false});
  }
};
