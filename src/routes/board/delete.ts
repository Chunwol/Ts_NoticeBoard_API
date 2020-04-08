import userPk from '../decoded/decoded';
import Board from '../../../database/models/Board';
import { Request, Response } from "express";

export const delete_board = async (req : Request , res : Response) => {
  const token : string | string[] = req.headers.token;
  const pk : string = req.params.pk;
  const decoded_pk : string = await userPk(token);
  
  if (decoded_pk != null) {
    const board : void | Board = await Board.findOne<Board>({
      where: { pk }
    }).catch(err => {
        res.status(500).json({ success: false });
    });
    if(board){
      const user_pk : string = board.user_pk;
      if (decoded_pk == user_pk) {
          await Board.destroy({
              where: { pk }
          })
          .catch(err => {
              res.status(500).json({ success: false });
          });
          res.status(200).json({ success: true });
      } else{
          res.status(412).json({ success: false });
      }
    }else {
      res.status(412).json({ success: false });
    }
  } else{
    res.status(412).json({ success: false });
  }
};