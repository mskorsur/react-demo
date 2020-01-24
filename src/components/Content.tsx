import React from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import { Main, Sidebar } from './index';
import { IUser } from '../typings';
import { UserService } from '../services/UserService';
import { Alert } from './Alert'
import { DEFAULT_DISPLAY_TYPE } from '../constants/FormDisplayType';

interface Props {
    classes: string;
}

interface State {
    users: IUser[];
    selectedUser?: IUser;
    openMessage: boolean;
    formDisplayType: string;
}

export class Content extends React.Component<Props, State> {
    state = {
        users: [] as IUser[],
        selectedUser: undefined,
        openMessage: false,
        formDisplayType: DEFAULT_DISPLAY_TYPE
    }

    async componentDidMount() {
        const users = await UserService.getUsers();
        this.setState({ users });
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Sidebar
                    classes={this.props.classes}
                    users={this.state.users}
                    onUserSelect={this.handleUserSelect}
                    toggleUserForm = {this.toggleUserForm}
                />
                <Main 
                    classes={this.props.classes}
                    user={this.state.selectedUser}
                    switchMessagePopup= {this.switchMessagePopup}
                    toggleUserForm = {this.toggleUserForm}
                    formDisplayType = {this.state.formDisplayType}
                />
                <Snackbar open={this.state.openMessage} autoHideDuration={6000} onClose={() => { this.switchMessagePopup(false) }}>
                    <Alert onClose={() => { this.switchMessagePopup(false) }} severity="error">
                        Something went wrong!
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }

    handleUserSelect = (user: IUser) => {
        this.setState({ selectedUser: user });
    }

    switchMessagePopup = (shouldDisplay: boolean) => {
        this.setState({
            openMessage: shouldDisplay
        })
    }

    toggleUserForm = (type: string) => {
        this.setState({
            formDisplayType: type
        })
    }
}