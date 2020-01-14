import { HttpClient } from '../utils/HttpClient';
import { IUser, IPost } from '../typings';

const ENDPOINTS = {
    'GET_USERS': 'https://jsonplaceholder.typicode.com/users',
    'GET_USER_POSTS': 'https://jsonplaceholder.typicode.com/posts?userId=',
}

export class UserService {
    static getUsers(): Promise<IUser[]> {
        return HttpClient.get(ENDPOINTS.GET_USERS);
    }

    static getUserPosts(userId: number): Promise<IPost[]> {
        return HttpClient.get(`${ENDPOINTS.GET_USER_POSTS}${userId}`)
    }
}