import { verify } from 'jsonwebtoken';
import Board from '../../../database/models/Board';
import Decoded from '../decoded/decoded';
import { Request, Response } from "express-serve-static-core";
import 'dotenv/config'
const env = process.env;

export const delete_board = (req : Request , res : Response) => {
  const token : string | string[] = req.headers.token;
  const pk : string = req.params.pk;

  if(token){
    verify(token, env.TOKEN_SECRET, async (err : string, decoded : Decoded) => {
      if (err == null) {
          const board : void | Board = await Board.findOne<Board>({
            where: { pk }
          }).catch(err => {
              res.status(500).json({ success: false });
          });
          if(board){
            const user_pk : string = board.user_pk;
            const decoded_pk : string = decoded.pk;
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
    });
  } else{
    res.status(412).json({success: false});
  }
};