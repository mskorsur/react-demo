import React from 'react';

import {IUser} from '../../typings';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import {Card, CardContent, Avatar, Typography, IconButton} from '@material-ui/core';

import '../../styles/user-info.css';

interface Props {
    user?: IUser;
    isEditingUser: boolean;
    toggleEditingUser: any;
}

export const UserBasicInfo = (props: Props) => {
    if (props.user === undefined) {
        return null;
    }

    return (
        <Card className={'user-info__wrapper'}>
            <CardContent className="user-info">
                {renderUserAvatar()}
                {renderUserFields(props.user)}
                {renderDeleteButton(props.isEditingUser, props.toggleEditingUser)}
            </CardContent>
        </Card>
    );
};

function renderUserAvatar() {
    return (<div className="user-info__avatar">
        <Avatar className="user-info__avatar-icon">
            <PersonIcon className="user-info__avatar-icon"/>
        </Avatar>
    </div>);
}

function renderUserFields(user: IUser) {
    return (<div className="user-info__contact">
        <Typography variant="h5" component="h2">
            {user.name}
        </Typography>
        <Typography variant="h5" component="h2">
            <a href={`mailto:${user.email}`} target='mail'>Mail me</a>
        </Typography>
        <Typography variant="h5" component="h2">
            {user.phone}
        </Typography>
        <Typography variant="h5" component="h2">
            {user.website}
        </Typography>
    </div>);
}

function renderDeleteButton(isEditingUser: boolean, toggleEditingUser: any) {
    return (!isEditingUser && (
        <IconButton aria-label="delete" onClick={toggleEditingUser}>
            <EditIcon fontSize="large"/>
        </IconButton>
    ));
}

