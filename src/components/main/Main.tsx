import React from 'react';
import Grid from '@material-ui/core/Grid';

import '../../styles/user-info.css';
import { IUser } from '../../typings';
import { UserInformation, userDisplayMapping, IMapperProps } from '../user/index';
import { NEW_DISPLAY_TYPE } from '../../constants/FormDisplayType';

interface Props {
    classes: string;
    user?: IUser;
    switchMessagePopup: (shouldDisplay: boolean) => void
    toggleUserForm: (type: string) => void;
    formDisplayType: string;
}

export class Main extends React.Component<Props, {}> {
    
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
            <UserInformation
                user = {this.props.user}
                formDisplayType= {this.props.formDisplayType}
                toggleUserForm = {this.props.toggleUserForm}
            />
        );
    }

    renderUserBody = () => {
        return userDisplayMapping[this.props.formDisplayType](
        {
            toggleEditingUser : this.props.toggleUserForm,
            user : this.props.user,
            switchMessagePopup : this.props.switchMessagePopup,
            isNew : this.props.formDisplayType === NEW_DISPLAY_TYPE ? true : false,
            toggleUserForm : this.props.toggleUserForm
        } as IMapperProps
        );
    }
}