import { verify } from 'jsonwebtoken';
import {Board} from '../../../database/models/Board';
import * as express from "express";
import 'dotenv/config'
const env = process.env;
export const delete_board = (req : express.Request , res : express.Response) => {
  const { token } : any = req.headers;
  const { pk } : any = req.params;
  if(token){
    verify(token, env.TOKEN_SECRET, async (err : string, decoded : string) => {
      if (err == null) {
          const board : any = await Board.findOne<Board>({
            where: { pk }
          }).catch(err => {
              res.status(500).json({ success: false });
          });
          if(board){
            const { user_pk } : any = board;
            const { pk : decoded_pk } : any = decoded;
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