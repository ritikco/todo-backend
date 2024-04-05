const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Check if required fields are present in the request body
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required fields",
            });
        }

        // Update the todo entry in the database
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description, updatedAt: Date.now() },
            { new: true } // Return the updated document
        );

        // Check if todo entry with the given id exists
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `Todo entry not found with id ${id}`,
            });
        }

        // Return success response with the updated todo entry
        res.status(200).json({
            success: true,
            data: todo,
            message: "Todo entry updated successfully",
        });
    } catch (err) {
        console.error("Error updating todo entry:", err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error",
        });
    }
};
