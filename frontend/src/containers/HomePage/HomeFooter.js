import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {
    
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };
        return (
            <div className="home-footer">
                <p>&copy; 2025 Phu&Thanh. More information, please visit my web. <a target="_blank" href="#"> &#8594; Click here &#8592;</a></p>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lanuage: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
