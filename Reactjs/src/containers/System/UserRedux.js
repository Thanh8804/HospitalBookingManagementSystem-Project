import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


class UserRedux extends Component {

    // Constructor to initialize state and bind methods
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {

    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux with Vp
                </div>
                <div className="user-redux-body">
                    <div>Thêm người dùng mới</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
