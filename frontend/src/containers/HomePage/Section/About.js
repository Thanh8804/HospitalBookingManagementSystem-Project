import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



class About extends Component {
    
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Chúng tôi
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen>
                        </iframe>
                        {/* <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/e42hIYkvxoQ" 
                            title="Real Time DevOps Project | Deploy to Kubernetes Using Jenkins | End to End DevOps Project | CICD" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                        </iframe> */}
                    </div>
                    <div className="content-right">
                        <p></p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
