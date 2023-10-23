import { Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const [task, setTask] = useState({
        tittle: '',
        description: '',

    })

    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value })

    }

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:3000/task/${id}`)
        const data = await res.json()
        setTask({ tittle: data.tittle, description: data.description })
        setEditing(true)
    }

    useEffect(() => {
        if (params.id) {
            loadTask(params.id)
        }
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (editing) {
            await fetch(`http://localhost:3000/task/${params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify(task)
            })
        } else {
            await fetch('http://localhost:3000/task', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    "Content-type": 'application/json'
                }

            })
        }
        setLoading(false)
        navigate('/')
    }



    return (
        <Grid container alignItems={'center'} justifyContent={'center'} direction={'column'} >
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e' }}>
                    <Typography textAlign={'center'} color={'#eee'} padding={'1rem'} marginTop={'1rem'} >
                        Ingresa una nueva Tarea
                    </Typography>
                    <CardContent display='flex' >
                        <form onSubmit={handleSubmit} >
                            <TextField sx={{ display: 'block', margin: '.5rem 0' }}
                                variant='filled'
                                label='nombre de la tarea'
                                inputProps={{ style: { color: '#eee' } }}
                                InputLabelProps={{ style: { color: '#eee' } }}
                                onChange={handleChange}
                                name='tittle'
                                value={task.tittle}
                            />
                            <TextField
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                variant='filled'
                                label='nota de tarea'
                                inputProps={{ style: { color: '#eee' } }}
                                InputLabelProps={{ style: { color: '#eee' } }}
                                onChange={handleChange}
                                name='description'
                                value={task.description}
                            />



                            <Box display='flex' justifyContent={'center'} marginTop={'1rem'}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    disabled={!task.tittle || !task.description}
                                >
                                    {loading ? <CircularProgress 
                                    color='inherit' 
                                    size={24} 
                                    style={{ color: 'white' }} /> : editing ? 'Actualizar tarea' : 'Crear tarea'}
                                </Button>
                            </Box>

                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TaskForm