
import classNames from "classnames";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import { handleChangeVisualImpaired } from "../../redux/reducers/UIReducer/UIReducer";
import { CustomButton } from "../../ui";
import { buttonTypes } from "../../ui/CustomButton/CustomButton";
import "./Header.scss";

const Header: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { visuallyImpaired } = useAppSelector(state => state.UIReducer);
	const navigationItems = [
		{
			id: 0,
			title:
				localStorage.getItem("visually_impaired") !== "true"
					? "Версия для слабовидящих"
					: "Версия для зрячих",
			onClickFunc: handleChangeVersionUI,
		},
		{ id: 1, title: "Мой профиль", onClickFunc: handleNavigateToProfile },
	];
	function handleChangeVersionUI() {
		localStorage.setItem(
			"visually_impaired",
			visuallyImpaired ? "false" : "true"
		);
		dispatch(handleChangeVisualImpaired(!visuallyImpaired));
	}

	function handleNavigateToProfile() {
		navigate(`/user/1`);
	}
	return (
		<div
			className={classNames("header", {
				"header--glasses": visuallyImpaired,
			})}
		>
			<div onClick={() => navigate("/")} className="header__logo">
				posts club
			</div>
			<div className="header__navigation">
				{navigationItems.map((nav, idx) => (
					<div key={`${nav.id}:${idx}`} className="header__navigation_item">
						<CustomButton type={buttonTypes.PRIMARY} onClick={nav.onClickFunc}>
							{nav.title}
						</CustomButton>
					</div>
				))}
			</div>
		</div>
	);
};

export default Header;
