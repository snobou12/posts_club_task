
import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const MyLoader: FC = props => {
	return (
		<ContentLoader
			speed={2}
			width={292}
			height={156}
			viewBox="0 0 292 156"
			backgroundColor="#dcd6d6"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect x="1" y="0" rx="0" ry="0" width="292" height="156" />
		</ContentLoader>
	);
};

export default MyLoader;
