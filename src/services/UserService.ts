
import $api from "../api";
import { AxiosResponse } from "axios";
export default class UserService {
	static async getUser(userId: number): Promise<AxiosResponse> {
		return $api.get(`/users/${userId}`);
	}

	static async getUserPosts(
		userId: number,
		limit: number | null
	): Promise<AxiosResponse> {
		if (limit !== null) {
			return $api.get(`posts/?userId=${userId}&_start=0&_limit=${limit}`);
		} else {
			return $api.get(`posts/?userId=${userId}`);
		}
	}
}
