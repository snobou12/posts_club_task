
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { getAllUsers } from "./ActionUsersCreator";

interface AuthState {
	users: IUser[] | [];
	isLoading: boolean;
	error: string;
}

const initialState: AuthState = {
	users: [],
	isLoading: false,
	error: "",
};

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
			state.isLoading = false;
			state.error = "";
			state.users = action.payload;
		},
		[getAllUsers.pending.type]: state => {
			state.isLoading = true;
		},
		[getAllUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
			state.users = [];
		},
	},
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
