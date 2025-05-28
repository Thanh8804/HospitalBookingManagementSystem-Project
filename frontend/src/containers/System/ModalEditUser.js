import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './UserManage.scss';
import _ from 'lodash'; // dung chuc lodash de check object giong json

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Initialize state variables here
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser; // Get user data from props
        if (user && !_.isEmpty(user)) { // Check if user data is not empty
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent(); // Call the function passed from parent component

    }

    handleOnChangeInput(event, id) {
        // Handle input change event
        //good code 
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); //callback function after setState
    }

    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state); // Call the function passed from parent componen
        }

    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"modal-user-container"}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new user</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>FirstName</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>LastName</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />

                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        className='px-3'
                        onClick={() => { this.handleSaveUser() }}>Saves Changes</Button>{' '}
                    <Button color="secondary"
                        className='px-3'
                        onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
