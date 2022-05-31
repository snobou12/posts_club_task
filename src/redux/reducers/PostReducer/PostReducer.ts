
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../models/IComment";
import { IPost } from "../../../models/IPost";
import {
	getCommentsOfPost,
	getUserPost,
	sendComment,
} from "./ActionPostCreator";
type formDataType = {
	name: string;
	email: string;
	body: string;
};

type changeFormDataType = {
	value: string;
	type: string;
};

interface AuthState {
	post: IPost | null;
	userId: number | null;
	postId: number | null;
	comments: IComment[] | [];
	isLoading: boolean;
	error: string;
	formData: formDataType;
}

type changeInfoPostActionType = {
	userId: number;
	postId: number;
};

const initialState: AuthState = {
	post: null,
	userId: null,
	postId: null,
	comments: [],
	isLoading: false,
	error: "",
	formData: {
		name: "",
		email: "",
		body: "",
	},
};

export const PostReducer = createSlice({
	name: "user/post",
	initialState,
	reducers: {
		handleChangeInfoPost(
			state,
			action: PayloadAction<changeInfoPostActionType>
		) {
			const { userId, postId } = action.payload;
			state.userId = userId;
			state.postId = postId;
		},
		handleChangeFormData(state, action: PayloadAction<changeFormDataType>) {
			const { value, type } = action.payload;
			switch (type) {
				case "name":
					state.formData.name = value;
					break;

				case "email":
					state.formData.email = value;

					break;

				case "body":
					state.formData.body = value;

					break;

				default:
					break;
			}
		},
		handleClearFormData(state) {
			state.formData = { name: "", email: "", body: "" };
		},
	},
	extraReducers: {
		[getUserPost.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
			state.isLoading = false;
			state.error = "";
			state.post = action.payload;
		},
		[getUserPost.pending.type]: state => {
			state.isLoading = true;
		},
		[getUserPost.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
			state.post = null;
		},
		[getCommentsOfPost.fulfilled.type]: (
			state,
			action: PayloadAction<IComment[]>
		) => {
			state.isLoading = false;
			state.error = "";
			state.comments = action.payload;
		},
		[getCommentsOfPost.pending.type]: state => {
			state.isLoading = true;
		},
		[getCommentsOfPost.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false;
			state.error = action.payload;
			state.comments = [];
		},

		[sendComment.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
			state.isLoading = false;
			state.error = "";
			let prevComments = [...state.comments];
			let newComments = [...prevComments, action.payload];
			state.comments = newComments;
		},
		[sendComment.pending.type]: state => {
			state.isLoading = true;
		},
		[sendComment.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	handleChangeInfoPost,
	handleChangeFormData,
	handleClearFormData,
} = PostReducer.actions;
export default PostReducer.reducer;
