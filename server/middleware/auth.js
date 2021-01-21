import jwt from "jsonwebtoken";

// wants to like a post
// click the like button ==> auth middleware (next) => like controller...

// 이 auth 미들웨어는 express 라우팅 사이에 끼어들어가는 것 같다.
const auth = async (req, res, next) => {
    try {
        // 요청 패킷의 헤더의 auth 부분을 가져오고
        const token = req.headers.authorization.split(" ")[1];
        // 커스텀 로그인 상태인지, 구글 로그인 상태인지 판단
        const isCustomAuth = token.length < 500;

        let decodedData;

        // 프런트가 로그인 상태이고, 커스텀 로그인이면
        if (token && isCustomAuth) {
            // 캐시를 읽어와서
            decodedData = jwt.verify(token, "test");
            // 요청 패킷에 userId를 맞춰준다.
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        // 그리고, 다음 처리로 넘긴다.
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;