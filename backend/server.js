const app  = require("./src/app");
const dbConnect = require("./src/config/db");


const PORT = 3000;

dbConnect()
app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
    
})