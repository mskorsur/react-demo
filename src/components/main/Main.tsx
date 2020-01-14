import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import '../../styles/user-info.css';
import { IUser, IPost } from '../../typings';
import { UserService } from '../../services/UserService';

interface Props {
    classes: string;
    user?: IUser;
}

interface State {
    isEditingUser: boolean;
    userPosts: IPost[];
}

export class Main extends React.Component<Props, State> {
    state = {
        isEditingUser: false,
        userPosts: [] as IPost[],
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
        if (this.props.user === undefined) {
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
                    {!this.state.isEditingUser && (
                        <IconButton aria-label="delete" onClick={this.toggleEditingUser}>
                            <EditIcon fontSize="large" />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
        );
    }

    renderUserBody = () => {
        if (this.state.isEditingUser) {
            return this.renderUserForm();
        }
        else {
            return this.renderUserPosts();
        }
    }

    renderUserForm = () => {
        return (
            <Card className={'user-form__wrapper'}>
                <CardContent className="user-form">
                    <Typography variant="h5" component="h2">
                            Edit agent information
                    </Typography>
                    <form className="user-form">
                        <TextField margin={'normal'} fullWidth id="name" label="Name" variant="outlined" />
                        <TextField margin={'normal'} fullWidth id="email" label="Email" variant="outlined" />
                        <TextField margin={'normal'} fullWidth id="phone" label="Phone" variant="outlined" />
                        <TextField margin={'normal'} fullWidth id="website" label="Website" variant="outlined" />
                        <div className="user-form__buttons">
                            <Button className="user-form__buttons__button" variant="contained" color="primary">
                                Save
                            </Button>
                            <Button className="user-form__buttons__button" variant="contained" onClick={this.toggleEditingUser}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }

    renderUserPosts = () => {
        const numOfPosts = this.state.userPosts.length;
        return (
            <Card className={'user-posts__wrapper'}>
                <CardContent className="user-posts">
                    <List>
                        {this.state.userPosts.map((post, index) => {
                            return (
                                <React.Fragment key={post.id}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <MessageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={post.title} secondary={post.body} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {this.renderPostDivider(numOfPosts, index)}
                                </React.Fragment>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }

    renderPostDivider = (numOfPosts: number, postIndex: number) => {
        if ((numOfPosts - 1) === postIndex) {
            return null;
        }

        return <Divider />;
    }

    toggleEditingUser = () => {
        this.setState((prevState: State) => ({
            isEditingUser: !prevState.isEditingUser,
        }));
    }

    getUserPosts = async () => {
        const posts = await UserService.getUserPosts(this.props.user!.id);
        this.setState({ userPosts: posts });
    }
}