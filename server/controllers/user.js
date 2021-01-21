import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import PostMessage from "../models/user.js";
import User from "../models/user.js";

// 프론트엔드로부터 /signin 포스트 요청이 들어왔고, 라우터에 의해 여기에 들어왔다.
export const signin = async (req, res) => {
    // 구조화분해 문법을 통해 포스트 바디 데이터를 꺼내와서 email 과 password 변수에 담고
    const { email, password } = req.body;

    // 구조적 예외처리
    try {
        // 프론트엔드가 전해준 email과 동일한 email이 DB에 있는가?
        const existingUser = await User.findOne({ email });

        // 없다면, 아이디가 존재하지 않는다고 프론트엔드에 회신한다.
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        // 이메일이 있다. 그 이메일에 딸린 패스워드가 일치하는가?
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        // 패스워드가 일치하지 않음을 프런트에 보고한다.
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        // JWT를 사용하여, JWT가 뭐하는 놈인가? 아무튼, 이메일과 아이디를 넣고.. 아.. 소멸 뭐시기 있는 것 보니까, 캐시를 다뤄주는 백엔드 라이브러리인 것 같은데?
        // 아무튼 캐시에 저장하고, 그 토큰을 받아둔다. JWT: JSON Web Token 인가? 아무튼 뭐 캐시를 다루는 것... 브라우저 캐시, 브라우저에 로컬에 저장하는 데이터..
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id,  }, "test", { expiresIn: "1h" });

        // 성공했음을 프런트에 알리고, 그 현존하는 사용자 정보와, 토큰 정보를 프런트에 넘겨준다.
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 프런트로부터 사용자 가입 요청이 들어왔다.
export const signup = async (req, res) => {
    // 프런트의 폼으로부터 들어온 변수들을 받아온다.
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // 현존하는 사용자를 찾는다.
        const existingUser = await User.findOne({ email });

        // 사용자가 이미 있다면, 신규가입 불가능하다.
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        // 두 번의 패스워드 입력이 일치하는지 확인
        if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        
        const token = jwt.sign({ email: result.email, id: result._id,  }, "test", { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}