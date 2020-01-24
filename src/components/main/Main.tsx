import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../styles/user-info.css';
import { IUser, IPost } from '../../typings';
import { UserService } from '../../services/UserService';
import { UserPost } from '../user/index'; 
import { UserForm } from '../user/index';
import { DEFAULT_DISPLAY_TYPE, EDIT_DISPLAY_TYPE, NEW_DISPLAY_TYPE } from '../../constants/FormDisplayType';

interface Props {
    classes: string;
    user?: IUser;
    switchMessagePopup: (shouldDisplay: boolean) => void
    toggleUserForm: (type: string) => void;
    formDisplayType: string;
}

interface State {
    userPosts: IPost[];
    postsToDelete: IPost[];
}

export class Main extends React.Component<Props, State> {
    state = {
        userPosts: [] as IPost[],
        postsToDelete: [] as IPost[]
    };

    async componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.user && this.props.user !== prevProps.user) {
            await this.getUserPosts();
        }
    }

    render() {
        return (
            <Grid item xs={12} md={9} className="user">
                {this.renderUserInformation()}
                {this.renderUserBody()}
            </Grid>
        );
    }

    renderUserInformation = () => {
        if (this.props.user === undefined || this.props.formDisplayType === NEW_DISPLAY_TYPE) {
            return null;
        }

        return (
            <Card className={'user-info__wrapper'}>
                <CardContent className="user-info">
                    <div className="user-info__avatar"> 
                        <Avatar className="user-info__avatar-icon">
                            <PersonIcon className="user-info__avatar-icon"/>
                        </Avatar>
                    </div>
                    <div className="user-info__contact">
                        <Typography variant="h5" component="h2">
                            {this.props.user.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.user.email}  
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.user.phone}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.user.website}
                        </Typography>
                    </div>
                    {this.props.formDisplayType === DEFAULT_DISPLAY_TYPE && (
                        <IconButton aria-label="delete" onClick={() => {this.props.toggleUserForm(EDIT_DISPLAY_TYPE)}}>
                            <EditIcon fontSize="large" />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
        );
    }

    renderUserBody = () => {
        switch(this.props.formDisplayType) {
            case EDIT_DISPLAY_TYPE:
                return this.renderUserForm();
            case NEW_DISPLAY_TYPE:
                return this.renderCreateUserForm();
            case DEFAULT_DISPLAY_TYPE:
                return this.renderUserPosts();
        }
    }

    renderUserForm = () => {
        return (
           <UserForm 
                toggleEditingUser = {this.props.toggleUserForm}
                user = {this.props.user}
                switchMessagePopup = {this.props.switchMessagePopup}
                isNew = {this.props.formDisplayType === NEW_DISPLAY_TYPE ? true : false}
           />
        );
    }

    renderUserPosts = () => {
        const numOfPosts = this.state.userPosts.length;
        return (
            <Card className={'user-posts__wrapper'}>
                <CardContent className="user-posts">
                    <List>
                    {this.renderTrashCan(numOfPosts)}
                        {this.state.userPosts.map((post, index) => {
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

    renderCreateUserForm = () => {
        return (
            <UserForm 
                 toggleEditingUser = {this.props.toggleUserForm}
                 user = {undefined}
                 switchMessagePopup = {this.props.switchMessagePopup}
                 isNew = {this.props.formDisplayType === NEW_DISPLAY_TYPE ? true : false}
            />
         );
    }

    renderPostDivider = (numOfPosts: number, postIndex: number) => {
        if ((numOfPosts - 1) === postIndex) {
            return null;
        }

        return <Divider />;
    }

    renderTrashCan = (numOfPosts: number) => {
        if(numOfPosts > 0){
            return (<IconButton onClick={this.deleteCheckedPosts} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>);
        }
    }

    getUserPosts = async () => {
        try{
            const posts = await UserService.getUserPosts(this.props.user!.id);
            this.setState({ userPosts: posts });
        }
        catch (error) {
            this.props.switchMessagePopup(true);
        }
    }


    removeUserPost = (postId: number) => {
        let userPosts = this.state.userPosts.filter((post) => post.id !== postId);
        this.setState({userPosts});
    }

    changePostsForDelete = (post : IPost, toDelete: boolean) => {
        let newPostsForDelete = new Array<IPost>();
        if(toDelete) {
            newPostsForDelete = [...this.state.postsToDelete, post];
        }
        else {
            newPostsForDelete = [...this.state.postsToDelete.filter((currentPost) => currentPost.id !== post.id)]
        }
        this.setState({
            postsToDelete: [...newPostsForDelete]
        });
    }

     deleteCheckedPosts = async () => {
        let deleteActions = new Array<Promise<IPost[]>>();
        this.state.postsToDelete.forEach((post) => {
            deleteActions.push(UserService.deleteUserPost(post.id));
        });

        try {
            await Promise.all(deleteActions); 
            let newUserPosts = [...this.state.userPosts];
            this.state.postsToDelete.forEach((postToDelete) => {
                newUserPosts = newUserPosts.filter((post) => post.id !== postToDelete.id);
            })
            this.setState({
                userPosts: [...newUserPosts]
            })
        }
        catch(error) {
            this.props.switchMessagePopup(true);
            setTimeout(() => {            
                window.location.reload();
            }, 1500);
        }
    }
}