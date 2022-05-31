
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/UserService";
export const getUser = createAsyncThunk(
	"user/get",
	async (userId: number, thunkApi) => {
		try {
			const response = await UserService.getUser(userId);
			return response.data;
		} catch (e: any) {
			if (e.response?.data?.message) {
				return thunkApi.rejectWithValue(e.response.data.message);
			}
		}
	}
);

export const getUserPostsPreview = createAsyncThunk(
	"user/get/posts",
	async ([userId, limit]: [number, number | null], thunkApi) => {
		try {
			const response = await UserService.getUserPosts(userId, limit);
			return response.data;
		} catch (e: any) {
			if (e.response?.data?.message) {
				return thunkApi.rejectWithValue(e.response.data.message);
			}
		}
	}
);
