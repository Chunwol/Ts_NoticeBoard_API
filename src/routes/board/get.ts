import userPk from '../decoded/decoded';
import Board from '../../../database/models/Board';
import Comment from '../../../database/models/Comment';
import { Request, Response } from "express";

export const get_board = async (req : Request , res : Response) => {
    const type : string = req.body.type;
    const token : string | string[] = req.headers.token;
    const user_pk : string = await userPk(token);
    
    if(user_pk != null){
        switch(type){
            case "post":
                const pk : string = req.params.pk;
                if(pk){
                    const board : void | Board = await Board.findOne<Board>({
                        include: [ {model:Comment} ],
                        where: { pk }
                    })
                    .catch(err => {
                        res.status(500).json({ success: false,err });
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
                const board : void | Board[] = await Board.findAll<Board>()
                .catch(err => {
                    res.status(500).json({ success: false });
                });
                res.status(200).json({ success: true, board });
                break;
                
            default:
                res.status(412).json({ success: false });
        }
    }else{
        res.status(412).json({ success: false });
    }
};