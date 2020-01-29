import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { IUser } from '../../typings';
import { DEFAULT_DISPLAY_TYPE, EDIT_DISPLAY_TYPE } from '../../constants/FormDisplayType';

interface Props {
    user: IUser,
    formDisplayType: string,
    toggleUserForm: (type: string) => void
}

export function UserInformation (props: Props) {
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
                            {props.user.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.user.email}  
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.user.phone}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.user.website}
                        </Typography>
                    </div>
                    {props.formDisplayType === DEFAULT_DISPLAY_TYPE && (
                        <IconButton aria-label="delete" onClick={() => {/*remove to new method*/props.toggleUserForm(EDIT_DISPLAY_TYPE)}}>
                            <EditIcon fontSize="large" />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
        );
}