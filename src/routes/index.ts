import * as express from "express";
import { login } from "./user/login";
import { register } from "./user/register";
import { patch_board } from "./board/patch";
import { get_board } from "./board/get";
import { delete_board } from "./board/delete";
import { post_board } from "./board/post";
import { post_comment } from "./boardcomment/post";
import { delete_comment } from "./boardcomment/delete";
import { patch_comment } from "./boardcomment/patch";

const router = express.Router();

router.post('/board', post_board);
router.delete('/board/:pk', delete_board);
router.patch('/board/:pk', patch_board);
router.get('/board', get_board);
router.get('/board/:pk', get_board);

router.post('/comment/:pk', post_comment);
router.delete('/comment/:pk', delete_comment);
router.patch('/comment/:pk', patch_comment);

router.post('/register', register);
router.post('/login', login);

export default router;