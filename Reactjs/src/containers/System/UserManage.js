import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    // Constructor to initialize state and bind methods
    constructor(props) {
        super(props);
        this.state = {
            // Initialize state variables here
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            //luu response vao state
            this.setState({
                arrUsers: response.users
            }, () => {
                console.log('check state', this.state.arrUsers);
            }); //callback function after setState
        }
    }

    /*
    * Lifecycle components
    * Run component
    * 1 Run contructor -> initialize state(variables)
    * 2 Did mount -> call API(communication with BE)
    * 3 Render -> show UI to var Did mount
    */

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <div className="title text-center">Manage users with Thanhdc</div>
                <div className="user-talbe mt-3 mx-1">

                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {// Loop through the array of users and display each user's information
                            arrUsers && arrUsers.map((item, index) => {
                                console.log('check item', item, index);
                                return (
                                    //fragment <> is used to group multiple elements without adding extra nodes to the DOM
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
