
import React, { FC } from "react";
import { UserCard } from "../../components";
import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import { getAllUsers } from "../../redux/reducers/UsersReducer/ActionUsersCreator";
import Loader from "../../components/UserCard/Loader/index";
import "./Main.scss";
import classNames from "classnames";
type Props = {
	visuallyImpaired: boolean;
};
const Main: FC<Props> = ({ visuallyImpaired }) => {
	const dispatch = useAppDispatch();
	const { users, isLoading, error } = useAppSelector(
		state => state.UsersReducer
	);
	React.useEffect(() => {
		dispatch(getAllUsers());
	}, []);
	return (
		<div
			className={classNames("main", {
				"main--glasses": visuallyImpaired,
			})}
		>
			<div className="main__user_cards">
				{isLoading
					? Array(10)
							.fill(0)
							.map((_, idx) => <Loader key={idx} />)
					: users
							.slice(1, users.length)
							.map((user, index) => (
								<UserCard
									visuallyImpaired={visuallyImpaired}
									key={`${user.id}:${index}`}
									id={user.id}
									city={user.address.city}
									fullname={user.name}
								/>
							))}
			</div>
			{error && <div className="error__msg">{error}</div>}
		</div>
	);
};

export default Main;
