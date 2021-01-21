import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
    // 만약 현재 로그인 유지중이라면, 요청의 헤더에 Authorization 속성을 붙여서 넘긴다.
    // 여기는 api 로서, 프런트가 백엔드로 요청을 하는 중간이다.
    // 아무튼, 프런트가 자신의 로컬스토리지에 있는 프로파일 정보를 백엔드 요청의 헤더에
    // 붙여서 넘기고 있는 것이다.
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});


// const url = "http://localhost:5000/posts";

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);