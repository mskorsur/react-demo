import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import MessageIcon from '@material-ui/icons/Message';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, IconButton } from '@material-ui/core';
import { IPost } from '../../typings';

import '../../styles/user-info.css';

interface Props {
    post: IPost;
    handlePostDelete: (id: number) => void;
}

function getOnClick(props: Props) {
    return () => props.handlePostDelete(props.post.id);
}

export const UserPost = (props: Props) => {
    return (
        <ListItem key={props.post.id}>
            <ListItemAvatar>
                <Avatar>
                    <MessageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.post.title} secondary={props.post.body} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={getOnClick(props)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

