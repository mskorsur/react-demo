import React from 'react';
import Grid from '@material-ui/core/Grid';

import '../../styles/user-info.css';
import {IUser, IPost} from '../../typings';
import {UserPosts} from './UserPosts';
import {UserForm} from './UserForm';
import {UserBasicInfo} from './UserBasicInfo';
import BrowserCacheService from "../../services/BrowserCacheService";

interface Props {
    classes: string;
    user?: IUser;
    onUserInfoChange: (data: IUser) => void;
}

interface State {
    isEditingUser: boolean;
    //arePostsLoaded: boolean;
    userPosts: IPost[];
}

export class MainPage extends React.Component<Props, State> {
    state = {
        isEditingUser: false,
        userPosts: [] as IPost[],
    };

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.user && this.props.user !== prevProps.user) {
            this.getUserPosts();
        }
    }

    render() {
        return (
            <Grid item xs={12} md={9} className="user">
                {this.renderUserBasicInfo()}
                {this.renderUserBody()}
            </Grid>
        );
    }

    renderUserBasicInfo = () => {
        return <UserBasicInfo
            isEditingUser={this.state.isEditingUser}
            user={this.props.user}
            toggleEditingUser={this.toggleEditingUser}
        />
    };

    renderUserBody = () => {
        if (this.state.isEditingUser) {
            return this.renderUserForm();
        }

        return this.renderUserPosts();
    };

    renderUserForm = () => {
        return <UserForm
            toggleEditingUser={this.toggleEditingUser}
            onUserInfoChange={this.props.onUserInfoChange}
            defaultUserData={defaultFormDisplayData}
        />
    };

    renderUserPosts = () => {
        return <UserPosts
            userPosts={this.state.userPosts}
            handlePostDelete={this.handlePostDelete}
        />
    };

    toggleEditingUser = () => {
        this.setState((prevState: State) => ({
            isEditingUser: !prevState.isEditingUser,
        }));
    };

    handlePostDelete = (id: number) => {
        const filteredPosts: IPost[] = this.state.userPosts.filter(post => post.id !== id);

        BrowserCacheService.storePosts(this.props.user!.id, filteredPosts);
        this.setState({userPosts: filteredPosts});
    };


    getUserPosts = () => {
        BrowserCacheService.getPosts(this.props.user!.id)
            .then(posts => this.setState({userPosts: posts}))
            .catch(error => console.log("Error occurred while fetching user posts", error));
    };


}