import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { UserPost } from '../user/index'; 
import { IPost, IUser } from '../../typings';
import { UserService } from '../../services/UserService';

interface Props {
    switchMessagePopup : (display: boolean) => void;
    user?: IUser 
}

interface State {
    userPosts: IPost[];
    postsToDelete: IPost[];
}

export class UserPostsContainer extends React.Component<Props, State> {
    state = {
        userPosts: [],
        postsToDelete: []
    }

    async componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.user && this.props.user !== prevProps.user) {
            await this.getUserPosts();
        }
    }

    async componentDidMount() {
        if (this.props.user)
            await this.getUserPosts(); 
    }


    render() {
        const numOfPosts = this.state.userPosts.length;
        return (
            <Card className={'user-posts__wrapper'}>
                <CardContent className="user-posts">
                    <List>
                    {this.renderTrashCan(numOfPosts)}
                        {this.state.userPosts.map((post: IPost, index) => {
                            return (
                                <UserPost 
                                    key = {post.id}
                                    post={post}
                                    index={index}
                                    numOfPosts = {numOfPosts}
                                    removeUserPost = {this.removeUserPost}
                                    changePostsForDelete = {this.changePostsForDelete}
                                    switchMessagePopup = {this.props.switchMessagePopup}
                                />
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }

    renderTrashCan = (numOfPosts: number) => {
        if(numOfPosts > 0){
            return (<IconButton onClick={this.deleteCheckedPosts} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>);
        }
    }

    getUserPosts = async () => {
        try {
            const posts = await UserService.getUserPosts(this.props.user!.id);
            this.setState({ userPosts: posts });
        }
        catch (error) {
            this.props.switchMessagePopup(true);
        }
    }

    removeUserPost = (postId: number) => {
        let userPosts = this.state.userPosts.filter((post: IPost) => post.id !== postId);
        this.setState({userPosts});
    }

    changePostsForDelete = (post : IPost, toDelete: boolean) => {
        let newPostsForDelete = new Array<IPost>();
        if(toDelete) {
            newPostsForDelete = [...this.state.postsToDelete, post];
        }
        else {
            newPostsForDelete = [...this.state.postsToDelete.filter((currentPost: IPost) => currentPost.id !== post.id)]
        }
        this.setState({
            postsToDelete: [...newPostsForDelete]
        });
    }

    deleteCheckedPosts = async () => {
        let deleteActions = new Array<Promise<IPost[]>>();
        this.state.postsToDelete.forEach((post: IPost) => {
            deleteActions.push(UserService.deleteUserPost(post.id));
        });

        try {
            await Promise.all(deleteActions);
            await this.getUserPosts();
        }
        catch(error) {
            this.props.switchMessagePopup(true);
            setTimeout(() => {            
                window.location.reload();
            }, 1500);
        }
    }
}