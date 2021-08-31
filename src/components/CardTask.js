import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

class CardTask extends React.Component {

    colorgenerater = () => {
        let sympole = "123456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color = color + sympole[Math.floor(Math.random() * 16)]
        }
        return color;
    }
    render() {
        console.log(this.colorgenerater())
        return (

            <div className='cardlist' >
                {this.props.myTask.map((item, idx) => {
                    return (
                        <Card
                            key={idx}
                            style={{ width: '30rem' }}
                            className="mb-5"
                        >
                            <Card.Header style={{ color: `${this.colorgenerater()}` }}>To-DO Num: {idx + 1}</Card.Header>
                            <Card.Body>
                                <Card.Title> {item.title} </Card.Title>
                                <Card.Text>
                                    Description: {item.description}
                                    <hr />
                                    Clender Event : { item.holiday}
                                </Card.Text>
                                <hr />

                                <Button variant="danger" onClick={() => { this.props.deleteTask(item._id) }} > <MdDeleteForever /></Button>
                                <Button variant="primary" onClick={() => { this.props.getTask_ID(item._id) }}><FaEdit /></Button>
                            </Card.Body>
                        </Card>
                        // ))
                    )
                }
                )
                }
            </div>
        );
    }
}

export default CardTask;