import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Main, Sidebar } from './index';
import { IUser } from '../typings';
import { UserService } from '../services/UserService';

interface Props {
    classes: string;
}

interface State {
    users: IUser[];
    selectedUserId: number;
}

export class Content extends React.Component<Props, State> {
    state = {
        users: [] as IUser[],
        selectedUserId: 0,
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
                />
                <Main 
                    classes={this.props.classes}
                    user={this.state.users.find(user => user.id === this.state.selectedUserId)}
                />
            </Grid>
        );
    }

    handleUserSelect = (userId: number) => {
        this.setState({ selectedUserId: userId });
    }
}