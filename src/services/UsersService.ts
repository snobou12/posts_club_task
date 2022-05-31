
import $api from "../api";
import { AxiosResponse } from "axios";
export default class UsersService {
	static async getAllUsers(): Promise<AxiosResponse> {
		return $api.get("/users");
	}
}
