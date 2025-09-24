import 'express-async-error';
import express,{ErrorRequestHandler} from 'express'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth'
import "@/db/connect"
import { errorHandler } from './middlewares/error'
import { fileParser } from './middlewares/file';

const app = express()
const port = process.env.PORT || 8989

// app.use(
//   (req,res,next)=>{
//     console.log('Request received at /auth');
//     req.on("data",(chunk)=>{
//       //console.log(JSON.parse(chunk))
//       req.body = JSON.parse(chunk)
//       next();
//     });
    
//     //console.log(req.body);
//   });
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use("/auth", authRouter);
app.post("/test", fileParser, (req, res) => {
  res.send("Test endpoint");
});
app.use(errorHandler );

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
