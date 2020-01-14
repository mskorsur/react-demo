import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { IUser } from '../../typings';

interface Props {
    classes: string;
    users: IUser[];
    selectedUserId: number;
    onUserSelect: (userId: number) => void;
}

interface State {
    searchTerm: string;
}

export class Sidebar extends React.Component<Props, State> {
    state = {
        searchTerm: '',
    };

    render() {
        return (
            <Grid item xs={12} sm={6} md={3}>
                <Paper className={this.props.classes}>
                    <TextField
                        id="user-search"
                        label="Search agents"
                        value={this.state.searchTerm}
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
                </Paper>
            </Grid>
        );
    }

    renderUsers = () => {
        return this.props.users.map((user: IUser) => {
            return (
                <ListItem 
                    key={user.id} 
                    button
                    selected={this.props.selectedUserId === user.id}
                    onClick={() => { this.props.onUserSelect(user.id) }}
                >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.name} />
                </ListItem>
            );
        });
    }
}