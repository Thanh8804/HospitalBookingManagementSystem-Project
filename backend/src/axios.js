import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // sửa đúng port backend đang chạy
    withCredentials: true,            // nếu có sử dụng cookie/session
});

export default instance;
