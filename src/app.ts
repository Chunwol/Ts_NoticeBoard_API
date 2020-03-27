import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import indexRouter from './routes/index'
import {sequelize} from '../database/index'
class App {
  public application : express.Application;
  constructor(){
    this.application = express();
  }
}
const app = new App().application;
app.listen(3000,()=>console.log("port 3000 server start"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

sequelize.sync();
export default app;