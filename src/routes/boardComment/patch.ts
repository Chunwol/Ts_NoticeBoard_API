import { verify } from 'jsonwebtoken';
import {Comment} from '../../../database/models/Comment';
import * as express from "express";
import 'dotenv/config'
const env = process.env;

export const patch_comment = (req : express.Request , res : express.Response) => {
  const { content } : any = req.body;
  const { token } : any = req.headers;
  const { pk } : any = req.params;
  if(content && token){
    verify(token, env.TOKEN_SECRET, async (err : string, decoded : string) => {
      if (err == null) {
          const comment : any = await Comment.findOne<Comment>({
            where: { pk }
          })
          .catch(err => {
              res.status(500).json({ success: false });
          });
          if(comment){
            const { user_pk } : any = comment;
            const { pk : decoded_pk } : any = decoded;
            if (decoded_pk == user_pk) {
              await comment.update(
                {
                  content
                },
                {
                  where: { pk }
                }
              )
              .catch(err => {
                res.status(500).json({ success: false });
              });
              res.status(200).json({ success: true });
            } else {
              res.status(412).json({ success: false });
            }
          }else {
            res.status(412).json({ success: false });
          }
      } else {
        res.status(412).json({ success: false });
      }
    });
  } else{
    res.status(412).json({success: false});
  }
};