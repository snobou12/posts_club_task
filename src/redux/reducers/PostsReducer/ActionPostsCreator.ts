
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/UserService";

export const getUserPosts = createAsyncThunk(
	"user/posts/get",
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
