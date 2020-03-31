import { verify } from 'jsonwebtoken';
import Comment from '../../../database/models/Comment';
import Decoded from '../decoded/decoded';
import { Request, Response } from "express-serve-static-core";
import 'dotenv/config'
const env = process.env;

export const patch_comment = (req : Request , res : Response) => {
  const content : string = req.body.content;
  const token : string | string[] = req.headers.token;
  const pk : string = req.params.pk;

  if(content && token){
    verify(token, env.TOKEN_SECRET, async (err : string, decoded : Decoded) => {
      if (err == null) {
          const comment : void | Comment = await Comment.findOne<Comment>({
            where: { pk }
          })
          .catch(err => {
              res.status(500).json({ success: false });
          });
          if(comment){
            const user_pk : string = comment.user_pk;
            const decoded_pk : string = decoded.pk;
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