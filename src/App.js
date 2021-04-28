import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

function App() {

  const [ toggleAddTask, setToggleTask ] = useState(false)

  const [ taskCollection, setTasks ] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromAPI = await fetchTasks()
        setTasks(taskFromAPI)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const deleteTaskEvent = async (id) => {
    console.log('delete ', id)
    await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: 'DELETE' 
    })
    setTasks(taskCollection.filter( (task) => task.id !== id ))
  }

  const toggleEvent = async(id) => {

    const taskToToggle = await fetchTask(id)
    const updatedToggleTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updatedToggleTask)
      })
    const data = await res.json()
    
    console.log('toggle', id)

    setTasks(
      taskCollection.map((task) => 
        task.id === id? 
        {...task, reminder: data.reminder } : task
      )
    )
  }

  const addNewTask = async(task) => {

      const res = await fetch(`http://localhost:5000/tasks`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      setTasks([...taskCollection, data])

      // const id = Math.floor(Math.random() * 1000) + 1
      // const newTask = {id , ...task}
      // setTasks([...taskCollection, newTask])
  }

  const toggleTask = () => {
    setToggleTask(!toggleAddTask)
  }

  return (
    <div className='App'>
      <Container fluid>
        <Row>
          <Col>
            <Header className='App-header' title='Reminder ' onAdd={ toggleTask }/>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="container mt-5 pt-5">
            { toggleAddTask && <AddTask addNewTask={ addNewTask }/> } 
            <div>
              {
                taskCollection.length > 0 ?
                <Tasks 
                  taskCollection={ taskCollection }  
                  onDelete={ deleteTaskEvent } 
                  onToggle={ toggleEvent }/> : 'No task to show'
              }
              </div>
            </div>
          </Col>
          </Row>
          <Row>
            <Col>
              <Footer FooterNote='Footer note'/>
            </Col>
          </Row>
      </Container>
    </div>
  );
}

export default App;
