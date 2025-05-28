import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import './UserManage.scss';


class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Initialize state variables here
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })

        })
    }

    componentDidMount() {
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state); // Call the function passed from parent componen
        }

    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"modal-user-container"}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
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
                        onClick={() => { this.handleAddNewUser() }}>Add new user</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
