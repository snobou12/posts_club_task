
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../../models/IPost";
import { getUserPosts } from "./ActionPostsCreator";

interface AuthState {
	posts: IPost[] | [];
	userId: number | null;
	isLoading: boolean;
	error: string;
}

const initialState: AuthState = {
	posts: [],
	userId: null,
	isLoading: false,
	error: "",
};

export const PostsReducer = createSlice({
	name: "user/posts",
	initialState,
	reducers: {
		handleChangeUserIdPosts(state, action: PayloadAction<number>) {
			state.userId = action.payload;
		},
	},
	extraReducers: {
		[getUserPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
			state.isLoading = false;
			state.error = "";

			state.posts = action.payload;
		},
		[getUserPosts.pending.type]: state => {
			state.isLoading = true;
		},
		[getUserPosts.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
			state.posts = [];
		},
	},
});

export const { handleChangeUserIdPosts } = PostsReducer.actions;
export default PostsReducer.reducer;
