import userPk from '../decoded/decoded';
import Board from '../../../database/models/Board';
import { Request, Response } from "express";

export const post_board = async (req : Request , res : Response) => {
  const title : string = req.body.title;
  const content : string = req.body.content;
  const token : string | string[] = req.headers.token;

  if(title && content){
    const user_pk : string = await userPk(token);
    if (user_pk != null) {
      const board : void | Board = await Board.create<Board>({
        user_pk,
        title,
        content
      }).catch(err => {
        res.status(500).json({ success: false });
      });
      res.status(200).json({ success: true, board });
    }else{
      res.status(412).json({ success: false });
    }
  } else{
    res.status(412).json({ success: false });
  }
};
