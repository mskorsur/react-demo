import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { IUser } from '../../typings';
import { SidebarListItem } from './SidebarListItem';
import { UserService } from '../../services/UserService';

interface Props {
    classes: string;
    onUserSelect: (user: IUser) => void;
    toggleUserForm: () => void;
}

interface State {
    searchTerm: string;
    selectedUserId: number;
    users: IUser[];
}

export class Sidebar extends React.Component<Props, State> {
    state = {
        searchTerm: '',
        selectedUserId: 0,
        users: []
    };

    async componentDidMount() {
        const users = await UserService.getUsers();
        this.setState({ users });
    }

    render() {
        return (
            <Grid item xs={12} sm={6} md={3}>
                <Paper className={this.props.classes}>
                    <TextField
                        id="user-search"
                        label="Search agents"
                        value={this.state.searchTerm}
                        onChange={this.onInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <List component="nav" aria-label="users">
                        {this.renderUsers()}
                    </List>
                    <Button variant="contained" color="primary" onClick={this.onAddUserButtonClick} >Add user</Button>
                </Paper>
            </Grid>
        );
    }

    renderUsers = () => {
        return this.state.users.map((user: IUser) => {
            if (this.isSearchTermInUserName(user)) {
                return (
                    <SidebarListItem
                        key = {user.id}
                        user = {user}
                        onUserSelect = {this.onUserSelect}
                        selectedUserId = {this.state.selectedUserId}
                    />
                );
            }
            else return null;
        });
    }

    onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({searchTerm: event.target.value})
    }

    onUserSelect = (user: IUser) => {
        this.setState({selectedUserId: user.id})
        this.props.onUserSelect(user);
    }

    onAddUserButtonClick = () => {
        this.props.toggleUserForm();
    }

    isSearchTermInUserName = (user: IUser) => {
        return user.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1
    }
}