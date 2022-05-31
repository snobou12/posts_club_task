
import $api from "../api";
import { AxiosResponse } from "axios";
export default class PostService {
	static async getUserPost(
		userId: number,
		postId: number
	): Promise<AxiosResponse> {
		return $api.get(`/posts/?userId=${userId}&id=${postId}`);
	}

	static async getCommentsOfPost(postId: number): Promise<AxiosResponse> {
		return $api.get(`/comments/?postId=${postId}`);
	}

	static async sendComment(
		postId: number,
		id: string,
		name: string,
		email: string,
		body: string
	): Promise<AxiosResponse> {
		return $api.post(`/comments`, { postId, id, name, email, body });
	}
}
