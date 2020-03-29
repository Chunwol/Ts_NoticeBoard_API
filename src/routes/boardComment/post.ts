import { verify } from 'jsonwebtoken';
import Comment from '../../../database/models/Comment';
import * as express from "express";
import 'dotenv/config'
const env = process.env;

export const post_comment = (req : express.Request , res : express.Response) => {
    const { pk : board_pk } : any = req.params;
    const { token } : any = req.headers;
    const { content } : any = req.body;
    if(content && token){
        verify(token, env.TOKEN_SECRET, async (err : string, decoded : string) => {
            if (err == null) {
                const { pk : user_pk } : any = decoded;
                const comment : any = await Comment.create<Comment>({
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