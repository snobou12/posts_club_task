
type userAddressType = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: {
		lat: string;
		lng: string;
	};
};

type userCompanyType = {
	name: string;
	catchPhrase: string;
	bs: string;
};
export interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: userAddressType;
	phone: string;
	website: string;
	company: userCompanyType;
}
