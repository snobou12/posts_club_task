
import classNames from "classnames";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Spinner, UserPostCard } from "../../components";
import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import { getUserPosts } from "../../redux/reducers/PostsReducer/ActionPostsCreator";
import { handleChangeUserIdPosts } from "../../redux/reducers/PostsReducer/PostsReducer";
import "./UserPosts.scss";

type paramsType = {
	userId: string;
};
type Props = {
	visuallyImpaired: boolean;
};
const UserPosts: FC<Props> = ({ visuallyImpaired }) => {
	const dispatch = useAppDispatch();
	const { posts, isLoading, error } = useAppSelector(
		state => state.PostsReducer
	);
	const { userId } = useParams() as paramsType;

	React.useEffect(() => {
		dispatch(handleChangeUserIdPosts(Number(userId)));
		dispatch(getUserPosts([Number(userId), null]));
	}, [userId]);
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div
					className={classNames("user_posts", {
						"user_posts--glasses": visuallyImpaired,
					})}
				>
					<div className="user_posts__posts">
						{posts &&
							posts.map((post, idx) => (
								<UserPostCard
									visuallyImpaired={visuallyImpaired}
									justPreview={false}
									userId={post.userId}
									id={post.id}
									title={post.title}
									body={post.body}
									key={idx}
								/>
							))}
					</div>
					{error && <div className="error__msg">{error}</div>}
				</div>
			)}
		</>
	);
};

export default UserPosts;
