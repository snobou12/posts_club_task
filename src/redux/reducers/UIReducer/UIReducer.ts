
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	visuallyImpaired: boolean;
}

const initialState: AuthState = {
	visuallyImpaired: false,
};

export const UIReducer = createSlice({
	name: "ui",
	initialState,
	reducers: {
		handleChangeVisualImpaired(state, action: PayloadAction<boolean>) {
			state.visuallyImpaired = action.payload;
		},
	},
});

export const { handleChangeVisualImpaired } = UIReducer.actions;
export default UIReducer.reducer;
