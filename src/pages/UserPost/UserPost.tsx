
import classNames from "classnames";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { FormModal, Spinner } from "../../components";
import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import {
	getCommentsOfPost,
	getUserPost,
} from "../../redux/reducers/PostReducer/ActionPostCreator";
import { handleChangeInfoPost } from "../../redux/reducers/PostReducer/PostReducer";
import { CustomButton } from "../../ui";
import { buttonTypes } from "../../ui/CustomButton/CustomButton";
import "./UserPost.scss";

type paramsType = {
	userId: string;
	postId: string;
};

type Props = {
	visuallyImpaired: boolean;
};
const UserPost: FC<Props> = ({ visuallyImpaired }) => {
	const dispatch = useAppDispatch();
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const { userId, postId } = useParams() as paramsType;
	const { post, comments, isLoading, error } = useAppSelector(
		state => state.PostReducer
	);
	const fetchData = () => {
		dispatch(
			handleChangeInfoPost({ userId: Number(userId), postId: Number(postId) })
		);
		dispatch(getUserPost([Number(userId), Number(postId)])).then(() => {
			dispatch(getCommentsOfPost(Number(postId)));
		});
	};

	React.useEffect(() => {
		fetchData();
	}, [userId, postId]);
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div
					className={classNames("user_post", {
						"user_post--glasses": visuallyImpaired,
					})}
				>
					<div className="user_post__container">
						<div className="user_post__post">
							<div className="user_post_number user_post_item">
								Пост №{post?.id}
							</div>
							<div className="user_post_title user_post_item">
								{post?.title}
							</div>
							<div className="user_post_body user_post_item">{post?.body}</div>
						</div>
						<div className="user_post__comments">
							<div className="post_comments__title">Комментарии</div>
							<div className="post__comments">
								{comments &&
									comments.map((comment, idx) => (
										<div
											key={`${comment.id}:${idx}`}
											className="post__comments_item"
										>
											<div className="post__comments_item_row">
												<div className="post__comments_item_name b">
													{comment.name},
												</div>
												<div className="post__comments_item_email b">
													{comment.email}
												</div>
												<div>сказал:</div>
											</div>
											<div className="post__comments_item_body">
												{comment.body}
											</div>
										</div>
									))}
							</div>
							<div className="post__comments_add">
								<CustomButton
									onClick={() => setShowModal(true)}
									type={buttonTypes.SECONDARY}
								>
									Добавить комментарий
								</CustomButton>
							</div>
						</div>
					</div>
					{error && <div className="error__msg">{error}</div>}
				</div>
			)}
			<FormModal
				visuallyImpaired={visuallyImpaired}
				isLoading={isLoading}
				postId={Number(postId)}
				setShowModal={setShowModal}
				show={showModal}
			/>
		</>
	);
};

export default UserPost;
