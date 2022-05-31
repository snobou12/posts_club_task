
import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatchSelector";
import { handleChangeVisualImpaired } from "../redux/reducers/UIReducer/UIReducer";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { Main, User, UserPost, UserPosts } from "../pages";

const App: FC = () => {
	const dispatch = useAppDispatch();
	const { visuallyImpaired } = useAppSelector(state => state.UIReducer);
	React.useEffect(() => {
		let localStorageVisuallyImpaired =
			localStorage.getItem("visually_impaired");
		if (localStorageVisuallyImpaired) {
			if (localStorageVisuallyImpaired === "false") {
				dispatch(handleChangeVisualImpaired(false));
			} else {
				dispatch(handleChangeVisualImpaired(true));
			}
		}
	}, []);

	return (
		<div className="app">
			<Header />
			<div className="app__content">
				<Routes>
					<Route
						path="/"
						element={<Main visuallyImpaired={visuallyImpaired} />}
					/>
					<Route
						path="/user/:userId"
						element={<User visuallyImpaired={visuallyImpaired} />}
					/>

					<Route
						path="/user/:userId/posts"
						element={<UserPosts visuallyImpaired={visuallyImpaired} />}
					/>
					<Route
						path="/post/:userId/:postId"
						element={<UserPost visuallyImpaired={visuallyImpaired} />}
					/>
				</Routes>
				<ToastContainer />
			</div>
		</div>
	);
};

export default App;
