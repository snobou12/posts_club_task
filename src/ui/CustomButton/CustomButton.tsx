
import classNames from "classnames";
import React, { FC } from "react";
import "./CustomButton.scss";
export enum buttonTypes {
	PRIMARY = "primary",
	SECONDARY = "secondary",
}
interface Props {
	type: buttonTypes;
	border?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	height?: string;
	onClick?: () => void;
	radius?: string;
	width?: string;
}
const CustomButton: FC<Props> = ({
	disabled,
	border,
	children,
	height,
	onClick,
	radius,
	width,
	type,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={classNames("custom_button", {
				"custom_button--primary": type === "primary",
				"custom_button--secondary": type === "secondary",
			})}
			style={{
				border: border ? border : "none",
				borderRadius: radius ? radius : "0",
				height: height ? height : "40px",
				width: width ? width : "205px",
			}}
		>
			{children}
		</button>
	);
};

export default CustomButton;
