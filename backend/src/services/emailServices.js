const nodemailer = require('nodemailer');
require('dotenv').config();
console.log('>>> GMAIL đang dùng là:', process.env.EMAIL_APP);

const sendEmailService = async (data, redirectLink) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Vanphu" ', // sender address
        to: data.email, // list of receivers
        subject:
            data.language === 'vi'
                ? 'Xác nhận thông tin dặt lịch khám bệnh'
                : 'Confirm medical appointment booking information', // Subject line
        html: changLanguageEmail(data, data.language, redirectLink),
    });
};

const changLanguageEmail = (data, language, redirectLink) => {
    let result = '';
    if (language === 'vi') {
        result = `
        <h2>Xin chào ${data.namePatient},</h2>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trực tuyến trên hệ thống <strong>BookingCare</strong>.</p>
        <p><strong>Thông tin chi tiết lịch khám:</strong></p>
        <ul>
            <li><b>Thời gian:</b> ${data.exactTime}</li>
            <li><b>Bác sĩ:</b> ${data.nameDoctor}</li>
        </ul>
        <p>Vui lòng nhấn vào đường dẫn bên dưới để xác nhận và hoàn tất thủ tục đặt lịch:</p>
        <a href="${redirectLink}" target="_blank">Xác nhận lịch khám</a>
        <p>Xin chân thành cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
        `;
    } else if (language === 'en') {
        result = `
        <h2>Dear ${data.namePatient},</h2>
        <p>You received this email because you made an online medical appointment via <strong>BookingCare</strong>.</p>
        <p><strong>Appointment details:</strong></p>
        <ul>
            <li><b>Time:</b> ${data.exactTime}</li>
            <li><b>Doctor:</b> ${data.nameDoctor}</li>
        </ul>
        <p>Please click the link below to confirm and complete your appointment:</p>
        <a href="${redirectLink}" target="_blank">Confirm Appointment</a>
        <p>Thank you for trusting and using our services!</p>
        `;
    }
    return result;
};


const sendEmailRemedyService = async (data, redirectLink) => {
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Booking care 👻" ', // sender address
        to: data.email, // list of receivers
        subject: data.language === 'vi' ? 'Kết quả khám bệnh' : 'Examination results', // Subject line
        html: changLanguageEmailRemedy(data, data.language, redirectLink),
        attachments: [
            {
                filename: 'image.jpg',
                content: data.image.split('base64,')[1],
                encoding: 'base64',
            },
        ],
    });
};

const changLanguageEmailRemedy = (data, language) => {
    let result = '';
    if (language === 'vi') {
        result = `
        <h2>Xin chào ${data?.namePatient},</h2>
        <p>Cảm ơn bạn đã lựa chọn dịch vụ khám bệnh tại <strong>BookingCare</strong>.</p>
        <p><strong>Thông tin cuộc hẹn:</strong></p>
        <ul>
            <li><b>Thời gian:</b> ${data.exactTime.valueVi}</li>
            <li><b>Bác sĩ:</b> ${data?.dataAccDoctor?.firstName} ${data?.dataAccDoctor?.lastName}</li>
        </ul>
        <p><strong>Lưu ý từ bác sĩ:</strong></p>
        <p>${data.note}</p>
        <p>Vui lòng xem file đính kèm để biết thêm chi tiết về đơn thuốc và kết quả khám bệnh.</p>
        <p>Chúc bạn mau khỏe!</p>
        `;
    } else if (language === 'en') {
        result = `
        <h2>Dear ${data.namePatient},</h2>
        <p>Thank you for using our service at <strong>BookingCare</strong>.</p>
        <p><strong>Appointment information:</strong></p>
        <ul>
            <li><b>Time:</b> ${data.exactTime.valueEn}</li>
            <li><b>Doctor:</b> ${data?.dataAccDoctor?.lastName} ${data?.dataAccDoctor?.firstName}</li>
        </ul>
        <p><strong>Doctor's Note:</strong></p>
        <p>${data.note}</p>
        <p>Please check the attached file for details of your prescription and examination result.</p>
        <p>We wish you a speedy recovery!</p>
        `;
    }
    return result;
};


const sendEmailCancelAppointmentService = async (data, redirectLink) => {
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Booking care 👻" ', // sender address
        to: data.email, // list of receivers
        subject: data.language === 'vi' ? `${data.title} ` : '...', // Subject line
        html: `
            <h2>${data.language === 'vi' ? 'Thông báo hủy lịch khám' : 'Appointment Cancellation Notice'}</h2>
            <p>${data.reason}</p>
            <p>${data.language === 'vi'
                ? 'Chúng tôi rất tiếc về sự bất tiện này. Vui lòng liên hệ lại nếu cần đặt lịch mới.'
                : 'We apologize for any inconvenience. Please contact us if you wish to reschedule.'}
            </p>
        `,

    });
};

module.exports = {
    sendEmailService,
    sendEmailRemedyService,
    sendEmailCancelAppointmentService,
};
