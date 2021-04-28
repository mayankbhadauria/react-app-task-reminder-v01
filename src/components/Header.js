//rafce
import React from 'react'
import propTypes from 'prop-types'
import Button from './AddButton'
import { Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

const Header = (props) => {
    return (
        <Container className='fixed-top card-header'>
            <Row className="mt-2">
                <Col><h1>{props.title}</h1></Col>
                <Col><Button className='float-right justify-content-md-center' 
                    variant='outline-primary' 
                    onAdd={props.onAdd} buttonName='Add'/>
                </Col>
            </Row>
        </Container>
    )
}

Header.defaultProps = {
    title: 'Task List'
}

Header.propTypes = {
    title: propTypes.string.isRequired
}

export default Header


