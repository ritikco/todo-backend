const todo = require("../models/todo");

exports.createTodo = async(req,res) => {
    try{
       const {title , description} = req.body;
       const response = await todo.create({title,description});
       res.status(200).json( {
        sucess : true,
        data :response,
        message:"entry created successfully"
       });

    }
    catch (err) {
         console.error(err);
         console.log(err);
         res.status(500)
         .json({
            sucess : false,
            data:"internal server error prr kyu",
            message:err.message,
         })
    }
}