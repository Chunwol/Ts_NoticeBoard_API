import Board from '../../../database/models/Board';
import Comment from '../../../database/models/Comment';
import * as express from "express";

export const get_board = async (req : express.Request , res : express.Response) => {
    const { type } : any = req.body
    
    switch(type){
        case "post":
            const { pk } : any = req.params;
            if(pk){
                const board : any = await Board.findOne<Board>({
                    include: [ Board.associations.comments ],
                    where: { pk }
                })
                .catch(err => {
                    res.status(500).json({ success: false, err });
                });
                if(board){
                    res.status(200).json({ success: true, board });
                } else{
                    res.status(412).json({ success: false });
                }
            } else{
                res.status(412).json({ success: false });
            }
            break;

        case "list":
            const board : any = await Board.findAll<Board>()
            .catch(err => {
                res.status(500).json({ success: false });
            });
            res.status(200).json({ success: true, board });
            break;
            
        default:
            res.status(412).json({ success: false });
    }
};