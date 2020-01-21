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
    selectedUserId: number;
    openMessage: boolean;
    formDisplayType: string;
}

export class Content extends React.Component<Props, State> {
    state = {
        users: [] as IUser[],
        selectedUserId: 0,
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
                    selectedUserId={this.state.selectedUserId}
                    onUserSelect={this.handleUserSelect}
                    toggleUserForm = {this.toggleUserForm}
                />
                <Main 
                    classes={this.props.classes}
                    user={this.state.users.find(user => user.id === this.state.selectedUserId )}
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

    handleUserSelect = (userId: number) => {
        this.setState({ selectedUserId: userId });
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