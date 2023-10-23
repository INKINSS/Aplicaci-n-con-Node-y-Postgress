import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskList from './components/taskList'
import TaskForm from './components/taskForm'
import {Container} from '@mui/material'
import NavBar from './components/navBar'

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task/new' element={<TaskForm />} />
          <Route path='/task/:id/edit' element={ <TaskForm /> } />
        </Routes>
    </Container>
  
    </BrowserRouter>
  )
}

export default App
