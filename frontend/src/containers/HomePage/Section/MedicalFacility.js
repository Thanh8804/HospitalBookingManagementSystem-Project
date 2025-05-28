import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import './MedicalFacility.scss';

class MedicalFacility extends Component {
    
    render() {
        // let settings = {
        //     dots: false,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 4,
        //     slidesToScroll: 1
        //   };
        return (
            <div className="section-share section-facility">
                <div className="section-container">
                    
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">

                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-medical-facility"/>
                                <div>Hệ thống y tế Thu Cúc 1</div>
                            </div>
                        
                            <div className="section-customize ">
                                <div className="bg-image section-medical-facility"/>
                                <div>Hệ thống y tế Thu Cúc 2</div>
                            </div>
                            <div className="section-customize ">
                                <div className="bg-image section-medical-facility"/>
                                <div>Hệ thống y tế Thu Cúc 3</div>
                            </div>
                            <div className="section-customize ">
                                <div className="bg-image section-medical-facility"/>
                                <div>Hệ thống y tế Thu Cúc 4</div>
                            </div>
                            <div className="section-customize ">
                                <div className="bg-image section-medical-facility"/>
                                <div>Hệ thống y tế Thu Cúc 5</div>
                            </div>
                            <div className="section-customize ">
                                <div className="bg-image section-medical-facility"/>
                                <div>Hệ thống y tế Thu Cúc 6</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
