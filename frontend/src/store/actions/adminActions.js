import actionTypes from './actionTypes';
import { 
    getAllCodeService, createNewUserService,getAllUsers, deleteUserService, editUserService

} from '../../services/userService';

import {toast} from "react-toastify";

// Action to fetch all users
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({ type : actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }
            else{
                dispatch(fetchGenderFailed());
            }
        }
        catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e);
        }
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }
            else{
                dispatch(fetchPositionFailed());
            }
        } catch(e){
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailded error', e)
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }
            else{
                dispatch(fetchRoleFailed());
            }
        } catch(e){
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailded error', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) =>{
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else{
                dispatch(saveUserFailed());
            }
        } catch(e){
            dispatch(saveUserFailed());
            console.log('saveUserFailded error', e)
        }
    }
}
// export const saveUserFailded = () => {
//     type: 'CREATE_USER_FAILED'
// }
// export const saveUserSuccess = () => {
//     type: 'CREATE_USER_SUCCESS'
// }

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllUsers("All");
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }
            else{
                toast.error("fetch all users error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch(e){
            toast.error("fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("delete the user succeed!");
                dispatch(fetchAllUsersSuccess())
                dispatch(fetchAllUsersStart());
            }
            else{
                toast.error("delete users error!");
                dispatch(deleteUserFailed());
            }
        } catch(e){
            toast.error("delete the users error!");
            dispatch(deleteUserFailed());
            console.log('saveFailed error', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("update the user succeed!");
                dispatch(editUsersSuccess())
                dispatch(fetchAllUsersStart());
            }
            else{
                toast.error("update users error!");
                dispatch(editUserFailed());
            }
        } catch(e){
            toast.error("update the users error!");
            dispatch(editUserFailed());
            console.log('editUserFailed error', e)
        }
    }
}
export const editUsersSuccess = () => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})