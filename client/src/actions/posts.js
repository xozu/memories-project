import * as api from "../api";

import { CREATE, DELETE, UPDATE, FETCH_ALL } from "../constants/actionTypes";

// Action Creators are functions that return action
export const getPosts = () => async (dispatch) => {
    try {
        // 백엔드에 db 데이터 요청한다.
        const { data } = await api.fetchPosts();

        // 가져온 데이터를 스토어 상태에 반영한다.
        dispatch({type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        
        dispatch ({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch ({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch ({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};