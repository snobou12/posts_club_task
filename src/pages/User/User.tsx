
import classNames from "classnames";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, UserPostCard } from "../../components";
import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import {
	getUser,
	getUserPostsPreview,
} from "../../redux/reducers/UserReducer/ActionUserCreator";
import { CustomButton } from "../../ui";
import { buttonTypes } from "../../ui/CustomButton/CustomButton";
import "./User.scss";
type paramsType = {
	userId: string;
};
type Props = {
	visuallyImpaired: boolean;
};
const User: FC<Props> = ({ visuallyImpaired }) => {
	const navigate = useNavigate();
	const { userId } = useParams() as paramsType;
	const dispatch = useAppDispatch();
	const { isLoading, user, posts, error } = useAppSelector(
		state => state.UserReducer
	);
	const [showMoreClicked, setShowMoreClicked] = React.useState<boolean>(false);
	React.useEffect(() => {
		dispatch(getUser(Number(userId)));
		dispatch(getUserPostsPreview([Number(userId), 3]));
	}, [userId]);

	const handleShowMorePosts = () => {
		dispatch(getUserPostsPreview([Number(userId), null]));
		setShowMoreClicked(true);
	};

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div
					className={classNames("user", {
						"user--glasses": visuallyImpaired,
					})}
				>
					<div className="user__container">
						<div className="user__top">
							<div className="empty"></div>

							<div className="user__username">{user?.username}</div>

							<div className="empty"></div>
						</div>
						<div className="user__info">
							<div className="empty"></div>
							<div className="user__full_info">
								<div className="user__name user__info_item">{user?.name}</div>
								<div className="user__email user__info_item">{user?.email}</div>
								<div className="user__phone user__info_item">
									{user?.phone.split(" ")[0]}
								</div>
								<div className="user__website user__info_item">
									{user?.website}
								</div>
								<div className="user__company user__info_item">
									<div className="user__company_name ">
										{user?.company.name}
									</div>
									<div className="user__company_bs ">{user?.company.bs}</div>
								</div>

								<div className="empty"></div>
							</div>
						</div>
					</div>
					<div className="user__container">
						<div className="user__posts">
							<div className="user__posts_title">Посты</div>
							<div className="user__posts_cards">
								{posts &&
									posts.map((post, idx) => (
										<UserPostCard
											visuallyImpaired={visuallyImpaired}
											justPreview
											userId={post.userId}
											id={post.id}
											title={post.title}
											body={post.body}
											key={`${post.id}:${idx}`}
										/>
									))}
							</div>
							<div className="user__posts_features">
								{!showMoreClicked && (
									<div className="user__posts_more">
										<CustomButton
											onClick={handleShowMorePosts}
											width="100%"
											height="30px"
											type={buttonTypes.SECONDARY}
										>
											Показать все
										</CustomButton>
									</div>
								)}

								<div className="user__posts_all">
									<CustomButton
										onClick={() => navigate(`/user/${user?.id}/posts`)}
										width="100%"
										height="30px"
										type={buttonTypes.SECONDARY}
									>
										Посмотреть все
									</CustomButton>
								</div>
							</div>
						</div>
					</div>
					{error && <div className="error__msg">{error} </div>}
				</div>
			)}
		</>
	);
};

export default User;
