
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../../models/IPost";
import { IUser } from "../../../models/IUser";
import { getUser, getUserPostsPreview } from "./ActionUserCreator";

interface AuthState {
	user: IUser | null;
	posts: IPost[] | [];
	isLoading: boolean;
	error: string;
}

const initialState: AuthState = {
	user: null,
	posts: [],
	isLoading: false,
	error: "",
};

export const userReducer = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
			state.isLoading = false;
			state.error = "";
			state.user = action.payload;
		},
		[getUser.pending.type]: state => {
			state.isLoading = true;
		},
		[getUser.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
			state.user = null;
		},

		[getUserPostsPreview.fulfilled.type]: (
			state,
			action: PayloadAction<IPost[]>
		) => {
			state.isLoading = false;
			state.error = "";

			state.posts = action.payload;
		},
		[getUserPostsPreview.pending.type]: state => {
			state.isLoading = true;
		},
		[getUserPostsPreview.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false;
			state.error = action.payload;
			state.posts = [];
		},
	},
});

export const {} = userReducer.actions;
export default userReducer.reducer;
