
import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../../services/PostService";

export const getUserPost = createAsyncThunk(
	"user/post/get",
	async ([userId, postId]: [number, number], thunkApi) => {
		try {
			const response = await PostService.getUserPost(userId, postId);
			return response.data[0];
		} catch (e: any) {
			if (e.response?.data?.message) {
				return thunkApi.rejectWithValue(e.response.data.message);
			}
		}
	}
);

export const getCommentsOfPost = createAsyncThunk(
	"user/post/comments/get",
	async (postId: number, thunkApi) => {
		try {
			const response = await PostService.getCommentsOfPost(postId);
			return response.data;
		} catch (e: any) {
			if (e.response?.data?.message) {
				return thunkApi.rejectWithValue(e.response.data.message);
			}
		}
	}
);

export const sendComment = createAsyncThunk(
	"user/post/comments/send",
	async (
		[postId, id, name, email, body]: [number, string, string, string, string],
		thunkApi
	) => {
		try {
			const response = await PostService.sendComment(
				postId,
				id,
				name,
				email,
				body
			);
			return response.data;
		} catch (e: any) {
			if (e.response?.data?.message) {
				return thunkApi.rejectWithValue(e.response.data.message);
			}
		}
	}
);
