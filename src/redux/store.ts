
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./reducers/UsersReducer/UsersReducer";
import UserReducer from "./reducers/UserReducer/UserReducer";
import PostsReducer from "./reducers/PostsReducer/PostsReducer";
import PostReducer from "./reducers/PostReducer/PostReducer";
import UIReducer from "./reducers/UIReducer/UIReducer";
const rootReducer = combineReducers({
	UsersReducer,
	UserReducer,
	PostsReducer,
	PostReducer,
	UIReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore["dispatch"];
