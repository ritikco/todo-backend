const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({});

        res.status(200).json({
            success: true,
            data: todos,
            message: "Todo entries fetched successfully",
        });
    } catch (err) {
        console.error("Error fetching todo entries:", err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error",
        });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `Todo entry not found with id ${id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo entry with id ${id} fetched successfully`,
        });
    } catch (err) {
        console.error("Error fetching todo entry by id:", err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error",
        });
    }
};
