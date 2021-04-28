import AddButton from './AddButton'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const AddTask = ({addNewTask}) => {

    const [text, setTask] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const submitTask = (e) => {

        e.preventDefault()
        if(!text) {
            alert('Add task is required')
            return
        }
        addNewTask({text, day, reminder})

        setTask('')
        setDay('')
        setReminder(false)
    }

    return (
        <Form onSubmit={ submitTask } className='m-5'>
            <Form.Group controlId="formTask">
                <Form.Label>Task</Form.Label>
                <Form.Control type="text" placeholder="Add task" 
                    value={ text }
                    onChange={(e) => setTask(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDay">
                <Form.Label>Day</Form.Label>
                <Form.Control type='text' placeholder='Add day and time' 
                    value={ day }
                    onChange={(e) => setDay(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formReminder">
                <Form.Check label='Check me out' type='checkbox' checked={reminder}
                    value={ reminder }
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
            </Form.Group>
            <AddButton variant='primary' buttonName='Add task' type='submit' />
        </Form>
    )
}

export default AddTask
