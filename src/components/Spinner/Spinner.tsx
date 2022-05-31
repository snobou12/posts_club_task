
import React, { FC } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import "./Spinner.scss";
const Spinner: FC = () => {
	return (
		<div className="spinner-wrapper">
			<div className="spinner-app">
				<RiseLoader color="#F6916A" size={80} margin={5} />
			</div>
		</div>
	);
};
export default Spinner;
