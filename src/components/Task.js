import React from 'react'
import { FaTimes } from "react-icons/fa";

const Task = (props) => {
    return (
        <div class='card'>
            <div class="card-body">
                <div onDoubleClick= { () => props.onToggle(props.task.id) }>
                    <h5 className='card-title'>
                        { props.task.text } 
                        <FaTimes 
                        className="cursor-pointer delete-icon ml-5" 
                        onClick={ () => props.onDelete(props.task.id) } />
                    </h5>
                    <p className='card-text'>{ props.task.day }</p>    
                </div>
            </div>
        </div>
    )
}

export default Task
