import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtoNGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import axios from "axios";

export default class RouteModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            privacy: '1',
            title: '',
            description: '',
        }
    }

    radios = [
        { name: 'Private', value: '1' },
        { name: 'Public', value: '2' },
    ];

    handleSubmit = () => {
        console.log("entering!");
        if (this.props.startAddress !== undefined && this.props.endAddress !== undefined) {
            const body = {
                creator: localStorage.getItem("globobikes_username"),
                coordinates: [this.props.startCoords, this.props.endCoords],
                description: this.state.description,
                title: this.state.title,
                // private: this.state.privacy === '1' ? true : false
            }
            axios
            .post("/api/routes/", body)
            .then((res) => {
                this.props.handleClose();
                /* eslint-disable no-console */
                    console.log(res.data);
                /* eslint-enable no-console */
            })
            .catch(err => {
            // handle error
            // this.errors.push(err.response.data.error);
            
            /* eslint-disable no-console */
                console.log(err);
            /* eslint-enable no-console */
            });
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>New Route for @{localStorage.getItem("globobikes_username")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label><strong>From: {this.props.startAddress}</strong></Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label><strong>To: {this.props.endAddress}</strong></Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Title of Route</Form.Label>
                                <Form.Control type="text" onChange={(val) => this.setState({title: val.target.value})} placeholder="Morning Ride!" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={2} onChange={(val) => this.setState({description: val.target.value})} placeholder="i love my morning commute..."/>
                            </Form.Group>
                        </Form>
                        <ButtonGroup>
                            {this.radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={this.state.privacy === radio.value}
                                onChange={(e) => {
                                    this.setState({privacy: radio.value});
                                    console.log(this.state.privacy);
                                }}
                            >
                                {radio.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}