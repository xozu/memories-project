import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

// 모든 포스트를 가져오기
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// 하나의 포스트를 포스트하기
export const createPost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// 지정된 id의 포스트를 업데이트하기
export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
};

// 지정된 id의 포스트를 지워라
export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

        await PostMessage.findByIdAndRemove(_id);
        res.json({message: "deleted"});
    } catch (error) {
        res.json({message:error.message});
    }
};

// 지정된 id의 포스트 속성 중 likeCount를 1 증가시킨다.
export const likePost = async (req, res) => {
    try {
        const {id: _id } = req.params;

        if (!req.userId) return res.json({ message: "Unauthenticated" });

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

        const post = await PostMessage.findById(_id);

        const index = post.likes.findIndex((id) => (id === String(req.userId)));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => (id !== String(req.userId)));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
};