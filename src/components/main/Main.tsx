import React from 'react';
import Grid from '@material-ui/core/Grid';

import '../../styles/user-info.css';
import { IUser } from '../../typings';
import { UserInformation, userDisplayMapper, IMapperProps } from '../user/index';
import { NEW_DISPLAY_TYPE } from '../../constants/FormDisplayType';

interface Props {
    classes: string;
    user?: IUser;
    switchMessagePopup: (shouldDisplay: boolean) => void
    toggleUserForm: (type: string) => void;
    formDisplayType: string;
}

export function Main (props: Props) {
    
    const renderUserInformation = () => {
        if (props.user === undefined || props.formDisplayType === NEW_DISPLAY_TYPE) {
            return null;
        }
        return (
            <UserInformation
                user = {props.user}
                formDisplayType= {props.formDisplayType}
                toggleUserForm = {props.toggleUserForm}
            />
        );
    }

    const renderUserBody = () => {
        const displayProps : IMapperProps = {
            toggleEditingUser : props.toggleUserForm,
            user : props.user,
            switchMessagePopup : props.switchMessagePopup,
            isNew : props.user ? true : false,
            toggleUserForm : props.toggleUserForm
        };

        return userDisplayMapper[props.formDisplayType](displayProps);
    }

    return (
            <Grid item xs={12} md={9} className="user">
                {renderUserInformation()}
                {renderUserBody()}
            </Grid>
    );
}