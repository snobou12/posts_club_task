
import classNames from "classnames";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../ui";
import { buttonTypes } from "../../ui/CustomButton/CustomButton";
import "./UserPostCard.scss";
type Props = {
	userId: number;
	id: number;
	title: string;
	body: string;
	visuallyImpaired: boolean;
	justPreview: boolean;
};
const UserPostCard: FC<Props> = ({
	userId,
	id,
	title,
	body,
	justPreview,
	visuallyImpaired,
}) => {
	const navigate = useNavigate();

	return (
		<div
			className={classNames("user_post_card", {
				"user_post_card--glasses": visuallyImpaired,
			})}
		>
			<div className="post_card__title">{title}</div>
			<div className="post_card__body">{body}</div>
			{!justPreview && (
				<div className="post_card__view">
					<CustomButton
						type={buttonTypes.SECONDARY}
						onClick={() => navigate(`/post/${userId}/${id}`)}
					>
						Смотреть Пост
					</CustomButton>
				</div>
			)}
		</div>
	);
};

export default UserPostCard;
