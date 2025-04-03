import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    // ở đây dùng là email chứ không phải username vì phía server nhận 2 object là email và password
    return axios.post('/api/login', { email : userEmail, password: userPassword });
}

export {
    handleLoginApi,
}

