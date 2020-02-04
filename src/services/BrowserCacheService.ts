import {IPost, IUser} from "../typings";
import UserService from "./UserService";
import {fetch, store} from "../utils/BrowserCache";

export default class BrowserCacheService {
    static async getUsers(): Promise<IUser[]> {
        let users = fetch<IUser>("users");

        if (users && users.length === 0) {
            users = await UserService.getUsers();
            if (!users) {
                users = BrowserCacheService.getDummyUsers();
            }

            store<IUser>("users", users);
        }

        users.forEach(user => user.shouldBeDisplayed = true);

        return users;
    };

    static storeUsers(users: IUser[]): void {
        return store<IUser>("users", users);
    };

    static async getPosts(userId: number): Promise<IPost[]> {
        const key: string = `posts_${userId}`;
        let posts = fetch<IPost>(key);
        if (posts.length === 0) {
            posts = await UserService.getUserPosts(userId);
            store<IPost>(key, posts);
        }

        return posts;
    };

    static storePosts(userId: number, posts: IPost[]): void {
        const key: string = `posts_${userId}`;
        return store<IPost>(key, posts);
    };

    static getDummyUsers(): IUser[] {
        return [{
            name: 'Marin', username: 'S', phone: '123-546-789', email: 'info@skorsurapartments.com',
            shouldBeDisplayed: true, id: 1, website: 'jewelofdurbrovnik.com'
        }, {
            name: 'Ante', username: 'P', phone: '000-111-222', email: 'info@skorsurapartments.com',
            shouldBeDisplayed: true, id: 2, website: 'apcorp.com'
        }]
    };

}
