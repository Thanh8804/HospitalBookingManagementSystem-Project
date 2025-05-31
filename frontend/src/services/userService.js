import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    // ở đây dùng là email chứ không phải username vì phía server nhận 2 object là email và password
    return axios.post('/api/login', { email : userEmail, password: userPassword });
}

const getAllUsers  = (inputId) => {
    //template string
    // nếu không dùng template string thì phải dùng dấu + để nối chuỗi lại với nhau
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService
}

