import { HttpClient } from '../utils/HttpClient';
import { IUser, IPost } from '../typings';

const ENDPOINTS = {
    'GET_USERS': 'https://jsonplaceholder.typicode.com/users',
    'GET_USER_POSTS': 'https://jsonplaceholder.typicode.com/posts?userId=',
    'DELETE_USER_POST': 'https://jsonplaceholder.typicode.com/posts/'
}

export class UserService {
    static getUsers(): Promise<IUser[]> {
        return HttpClient.get(ENDPOINTS.GET_USERS);
    }

    static getUserPosts(userId: number): Promise<IPost[]> {
        return HttpClient.get(`${ENDPOINTS.GET_USER_POSTS}${userId}`)
    }

    static deleteUserPost(postId: number): Promise<IPost[]> {
        return HttpClient.delete(`${ENDPOINTS.DELETE_USER_POST}${postId}`);
    }

    static updateUser(userId: number, obj: any): Promise<Response> {
        return HttpClient.put(`${ENDPOINTS.GET_USERS}/${userId}`, obj);
    }

}