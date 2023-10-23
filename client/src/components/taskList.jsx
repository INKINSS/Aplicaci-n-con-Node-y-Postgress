import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/task/${id}`,{
        method: 'DELETE',
        })
        setTask(task.filter(task => task.id !== id))

    }

    const [task, setTask] = useState([])

    const loadTask = async () => {
        const response = await fetch('http://localhost:3000/task')
        const data = await response.json()
        setTask(data)
    }

    useEffect(() => {
        loadTask()
    }, [])

    return (
        <>
            <h1 style={{fontWeight: '500', color: 'white'}}>Listado de Tareas</h1>
            {task.map(task => (
                <Card key={task.id} style={{ marginBottom: '1.7rem', backgroundColor: '#1F262C' }} >
                    <CardContent style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <div style={{color: 'white'}}>
                            <Typography> {task.tittle} </Typography>
                            <Typography> {task.description} </Typography>
                        </div>
                        <div>
                            <Button variant='contained' 
                            color='error' 
                            style={{marginRight: '.5rem'}}
                            onClick={() => handleDelete(task.id)} 
                            >
                                eliminar
                            </Button>
                            <Button variant='contained'
                            onClick={() => {
                                navigate(`/task/${task.id}/edit`)
                            }}
                            >
                                editar
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default TaskList