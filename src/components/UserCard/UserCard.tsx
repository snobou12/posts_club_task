
import classNames from "classnames";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../ui";
import { buttonTypes } from "../../ui/CustomButton/CustomButton";
import "./UserCard.scss";
interface Props {
	fullname: string;
	city: string;
	id: number;
	visuallyImpaired: boolean;
}
const UserCard: FC<Props> = ({ fullname, city, id, visuallyImpaired }) => {
	const navigate = useNavigate();
	const handleViewProfile = (userId: number) => {
		navigate(`/user/${userId}`);
	};
	return (
		<div
			className={classNames("user_card", {
				"user_card--glasses": visuallyImpaired,
			})}
		>
			<div className="user_card__username">
				<div className="user_card_name">{fullname.split(" ")[0]}</div>
				<div className="user_card__surname">{fullname.split(" ")[1]}</div>
			</div>
			<div className="user_card__city">{city}</div>
			<div className="user_card__view">
				<CustomButton
					type={buttonTypes.SECONDARY}
					onClick={() => handleViewProfile(id)}
				>
					Смотреть Профиль
				</CustomButton>
			</div>
		</div>
	);
};

export default UserCard;
