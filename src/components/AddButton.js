import React from 'react'
import Button from "react-bootstrap/Button"

const AddButton = (props) => {
    return (
        <div>
            <Button 
                variant={ props.variant }
                type={ props.type }
                onClick={ props.onAdd }>
            { props.buttonName }
            </Button>
        </div>
    )
}

export default AddButton
