import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { Alert } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    // Constructor to initialize state and bind methods
    constructor(props) {
        super(props);
        this.state = {
            // Initialize state variables here
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    handleAddNewUser = () => {
        // Handle button click event
        this.setState({
            isOpenModalUser: true
        });
    }

    getAllUsersFromReact = async () => {
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

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                });

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log('error', error);
        }
        console.log('check data from modal', data);
    }

    handleDeleteUser = async (user) => {
        // Handle delete user action
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
            }
            else {
                alert(res.errMessage);
            }
        }catch(error) {
            console.log('error', error);
        } 

    }
    /*
    * Lifecycle components
    * Run component
    * 1 Run contructor -> initialize state(variables)
    * 2 Did mount -> call API(communication with BE)
    * 3 Render(re-render) -> show UI to var Did mount
    */

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    //cái này khi truyền không đưa input tại nó hiểu là bạn chỉ gửi tới con bạn một function thuần thêm () sẽ gây lỗilỗi
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center">Manage users with Thanhdc</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className="user-talbe mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {// Loop through the array of users and display each user's information
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        //fragment <> is used to group multiple elements without adding extra nodes to the DOM
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    <i class="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
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
