import express from 'express'
import authRouter from './routes/auth'

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
app.use("/auth", authRouter);
app.post("/test", (req, res) => {
  console.log(req.body);
  res.send("Test endpoint");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
