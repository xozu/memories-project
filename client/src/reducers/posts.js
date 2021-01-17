import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            // 변경된 상태를 리턴하면 되는거지. 새로 포스트 목록을 가져왔으니까. 그것을 그대로 던지면 된다.
            return action.payload;

        case CREATE:
            // 현재 포스트 목록에 페이로드에 넘어온 포스트를 추가해서 등록한다.
            return [...posts, action.payload ];

        case UPDATE:
            // 업데이트는 포스트 목록 갯수는 그대로이고, 페이로드로 넘어온 아이디와 동일한 포스트만 페이로드로 바꿔주면 될 것이다.
            return posts.map((post) => ( post._id === action.payload._id ) ? (action.payload) : (post));

        case DELETE:
            // 지웠다. 페이로드로 넘어온 id 만 빼버리고 다시 목록을 구성하면 된다. 그러려면, 필터..
            return posts.filter((post) => ( post._id !== action.payload));

        default:
            return posts;
    }
};