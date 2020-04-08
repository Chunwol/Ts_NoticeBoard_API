import userPk from '../decoded/decoded';
import Comment from '../../../database/models/Comment';
import { Request, Response } from "express";

export const delete_comment = async (req : Request , res : Response) => {
  const token : string | string[] = req.headers.token;
  const pk : string = req.params.pk;
  const decoded_pk : string = await userPk(token);
  
  if (decoded_pk != null){
    const comment : void | Comment = await Comment.findOne<Comment>({
      where: { pk }
    })
    .catch(err => {
      res.status(500).json({ success: false });
    });
    if(comment){
      const user_pk : string = comment.user_pk;
      if (decoded_pk == user_pk){
          await Comment.destroy({
              where: { pk }
          })
          .catch(err => {
              res.status(500).json({ success: false });
          });
          res.status(200).json({ success: true });
      } else{
          res.status(412).json({ success: false });
      }
    } else{
      res.status(412).json({ success: false });
    }
  } else{
    res.status(412).json({ success: false });
  }

};