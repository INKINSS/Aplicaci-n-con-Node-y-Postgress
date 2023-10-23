const pool = require('../db')

const getAllTask = async (req, res, next) => {
    
    try {
        const allTask = await pool.query('SELECT * FROM task')
        res.json(allTask.rows)
    } catch (error) {
        next(error)
    }
};

const getTask = async (req, res, next) => {

    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM task WHERE id=$1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                "message": "tarea no encontrada"
            })
        }

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const { tittle, description } = req.body

    try {

        console.log(tittle, description)
        const result = await pool.query(
            'INSERT INTO task (tittle, description) VALUES ($1,$2) RETURNING *',
            [tittle, description,]
        )

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    const { id } = req.params

    try {
        console.log(id)
        const result = await pool.query('DELETE FROM task WHERE id= $1 RETURNING *', [id])

        if (result.rowCount === 0) {
            return res.status(404).json({
                "message": "tarea no encontrada para eliminar"
            })
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { tittle, description } = req.body;

        const result = await pool.query(
            'UPDATE task SET tittle = $1, description = $2 WHERE id = $3 RETURNING *',
            [tittle, description, id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                "message": "tarea no encontrada para actualizar"
            })
        }

        console.log(result)

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTask: getAllTask,
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    updateTask: updateTask
}