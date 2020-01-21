import React from 'react';
import { IPost } from '../../typings';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import { UserService } from '../../services/UserService';

interface Props {
    post: IPost,
    numOfPosts: number,
    index: number,
    removeUserPost: (postId: number) => void 
    changePostsForDelete: (postId: IPost, toDelete: boolean) => void
    switchMessagePopup: (shouldDisplay: boolean) => void
}

interface State {
}

export class UserPost extends React.Component<Props, State> {
    state = {}

    render() {
        return (
            <React.Fragment key={this.props.post.id}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MessageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.post.title} secondary={this.props.post.body} />
                    <ListItemSecondaryAction>
                        <Checkbox 
                            onChange = {this.markPostToDelete}
                        />
                        <IconButton onClick={this.deleteCard} edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {this.renderPostDivider(this.props.numOfPosts, this.props.index)}
            </React.Fragment>
        );
    }

    renderPostDivider = (numOfPosts: number, postIndex: number) => {
        if ((numOfPosts - 1) === postIndex) {
            return null;
        }

        return <Divider />;
    }

    deleteCard = async () => {
        try {
            await UserService.deleteUserPost(this.props.post.id);
            this.props.removeUserPost(this.props.post.id);
        }
        catch(error) {
            this.props.switchMessagePopup(true)
        }
    }

    markPostToDelete = (event: Object): void => {
        let evt = event as Event;
        let target = evt.target! as HTMLInputElement;
        this.props.changePostsForDelete(this.props.post, target.checked);
    }

}