import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position='static' color='transparent' >
                <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{ flexGrow: 1 }} >
                            <Link style={{textDecoration:'none', color: 'white'}} to={'/'}>
                                menu
                            </Link>
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={() => { navigate('/task/new') }} >
                            nueva tarea
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default NavBar