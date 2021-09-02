import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import countryData from "../Navbar/countryData.json";
class UpdateContry extends React.Component {
    updateCountry = (e) => {
        e.preventDefault();
        let newContry = {
            countryName: e.target.select1.value.split(',')[0],
            countryCode: e.target.select1.value.split(',')[1],
            userName: e.target.name.value,
            email:this.props.userInf.email ,
        }
        let id =this.props.userInf._id
        this.props.updateCountry(newContry, id);
        this.props.handelcontrymodal();
    }
    render() {
        return (
            <>
                <Modal show={this.props.showMupdateContry} onHide={this.props.handelcontrymodal} >
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.updateCountry}  >
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Email address (the sign in email by default)
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="enter your email"
                                    value={this.props.userInf.email}
                                    id="email"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>user name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="enter your name"
                                    defaultValue={this.props.userInf.userName}
                                    id="name"
                                    required

                                />
                            </Form.Group>
                            <Form.Label>select country</Form.Label>
                            <Form.Select id="select1" aria-label="Default select example" required>
                                <option value={`${this.props.userInf.countryName},${this.props.userInf.countryCode}`}>{this.props.userInf.countryName}, {this.props.userInf.countryCode}</option>
                                {countryData.map((item, i) => {

                                    return (
                                        <>
                                            <option key={i} value={`${item.name},${item.code}`} > {item.name}, {item.code}</option>
                                        </>
                                    )
                                })}
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.handelcontrymodal}>Discard </Button>
                            <Button type="submit" variant="primary">Update</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}
export default UpdateContry;