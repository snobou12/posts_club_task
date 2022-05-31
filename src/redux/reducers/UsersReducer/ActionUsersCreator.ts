
import { createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "../../../services/UsersService";
export const getAllUsers = createAsyncThunk(
	"users/get",
	async (_, thunkApi) => {
		try {
			const response = await UsersService.getAllUsers();
			return response.data;
		} catch (e: any) {
			if (e.response?.data?.message) {
				return thunkApi.rejectWithValue(e.response.data.message);
			}
		}
	}
);
