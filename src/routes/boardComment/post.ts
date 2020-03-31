import { verify } from 'jsonwebtoken';
import Comment from '../../../database/models/Comment';
import Decoded from '../decoded/decoded';
import { Request, Response } from "express-serve-static-core";
import 'dotenv/config'
const env = process.env;

export const post_comment = (req : Request , res : Response) => {
    const board_pk : string = req.params.pk;
    const content : string = req.body.content;
    const token : string | string[] = req.headers.token;
    
    if(content && token){
        verify(token, env.TOKEN_SECRET, async (err : string, decoded : Decoded) => {
            if (err == null) {
                const user_pk : string = decoded.pk;
                const comment : void | Comment = await Comment.create<Comment>({
                    board_pk,
                    user_pk,
                    content
                })
                .catch(err => {
                    res.status(500).json({ success: false });
                });
    
                if(comment){
                    res.status(200).json({ success: true });
                }else {
                    res.status(412).json({ success: false });
                }
            }else {
                res.status(412).json({ success: false });
            }
        });
    } else{
        res.status(412).json({success: false});
    }
};