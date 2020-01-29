import React from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import { Main, Sidebar } from './index';
import { IUser } from '../typings';
import { Alert } from './Alert'
import { DEFAULT_DISPLAY_TYPE, NEW_DISPLAY_TYPE } from '../constants/FormDisplayType';

interface Props {
    classes: string;
}

interface State {
    selectedUser?: IUser;
    openMessage: boolean;
    formDisplayType: string;
}

export class Content extends React.Component<Props, State> {
    state = {
        selectedUser: undefined,
        openMessage: false,
        formDisplayType: DEFAULT_DISPLAY_TYPE
    }
    
    render() {
        return (
            <Grid container spacing={3}>
                <Sidebar
                    classes={this.props.classes}
                    onUserSelect={this.handleUserSelect}
                    toggleUserForm = {this.resetSelectedUser}
                />
                <Main
                    classes={this.props.classes}
                    user={this.state.selectedUser}
                    switchMessagePopup= {this.toggleMessagePopup}
                    toggleUserForm = {this.setUserFormType}
                    formDisplayType = {this.state.formDisplayType}
                />
                <Snackbar open={this.state.openMessage} autoHideDuration={6000} onClose={() => { this.toggleMessagePopup(false) }}>
                    <Alert onClose={() => { this.toggleMessagePopup(false) }} severity="error">
                        Something went wrong!
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }

    handleUserSelect = (user: IUser) => {
        this.setState({ selectedUser: user });
    }

    toggleMessagePopup = (shouldDisplay: boolean) => {
        this.setState({openMessage: shouldDisplay})
    }

    setUserFormType = (type: string) => {
        this.setState({formDisplayType: type})
    }

    resetSelectedUser = () => {
        this.setState({selectedUser: undefined});
        this.setUserFormType(NEW_DISPLAY_TYPE);
    }
}