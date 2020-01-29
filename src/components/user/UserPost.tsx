import React, {ChangeEvent} from 'react';
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

interface Props {
    post: IPost,
    numOfPosts: number,
    index: number,
    removeUserPost: (postId: number) => void 
    changePostsForDelete: (postId: IPost) => void
    switchMessagePopup: (shouldDisplay: boolean) => void
}

export function UserPost (props: Props) {

    return (
            <React.Fragment key={props.post.id}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MessageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.post.title} secondary={props.post.body} />
                    <ListItemSecondaryAction>
                        <Checkbox 
                            onChange = {markPostToDelete}
                        />
                        <IconButton onClick={deleteCard} edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {renderPostDivider(props.numOfPosts, props.index)}
            </React.Fragment>
    );
    

    function renderPostDivider (numOfPosts: number, postIndex: number) {
        if ((numOfPosts - 1) === postIndex) {
            return null;
        }

        return <Divider />;
    }
 
    async function deleteCard () {
        props.removeUserPost(props.post.id);
    }

    function markPostToDelete (event: ChangeEvent<HTMLInputElement>) {
        props.changePostsForDelete(props.post);
    }

}