import userPk from '../decoded/decoded';
import Board from '../../../database/models/Board';
import Comment from '../../../database/models/Comment';
import { Request, Response } from "express";

export const post_comment = async (req : Request , res : Response) => {
    const board_pk : string = req.params.pk;
    const content : string = req.body.content;
    const token : string | string[] = req.headers.token;
    
    if(content){
        const user_pk : string = await userPk(token);
        if(user_pk != null){
            const board : number | void = await Board.count({ 
                where: {
                    'pk' : board_pk
                }
            }).catch(err => {
                res.status(500).json({ success: false });
            });

            if(board){
                const comment : void | Comment = await Comment.create<Comment>({
                    board_pk,
                    user_pk,
                    content
                })
                .catch(err => {
                    res.status(500).json({ success: false });
                });
                res.status(200).json({ success: true, comment });
            } else{
                res.status(412).json({ success: false });
            }
        } else{
            res.status(412).json({ success: false });
        }
    } else{
        res.status(412).json({success: false});
    }
};