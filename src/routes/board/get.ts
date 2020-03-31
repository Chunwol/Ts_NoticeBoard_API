import Board from '../../../database/models/Board';
import { Request, Response } from "express-serve-static-core";

export const get_board = async (req : Request , res : Response) => {
    const type : string = req.body.type;
    
    switch(type){
        case "post":
            const pk : string = req.params.pk;
            if(pk){
                const board : void | Board = await Board.findOne<Board>({
                    include: [ Board.associations.comments ],
                    where: { pk }
                })
                .catch(err => {
                    res.status(500).json({ success: false });
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
};