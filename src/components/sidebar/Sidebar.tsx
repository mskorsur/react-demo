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
import Button from '@material-ui/core/Button';

import { IUser } from '../../typings';
import { NEW_DISPLAY_TYPE } from '../../constants/FormDisplayType';

interface Props {
    classes: string;
    users: IUser[];
    selectedUserId: number;
    onUserSelect: (userId: number) => void;
    toggleUserForm: (type: string) => void;
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
                    <Button variant="contained" color="primary" onClick={() => {this.props.toggleUserForm(NEW_DISPLAY_TYPE)}} >Add user</Button>
                </Paper>
            </Grid>
        );
    }

    renderUsers = () => {
        return this.props.users.map((user: IUser) => {
            if (user.name.indexOf(this.state.searchTerm) > -1){
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
            }
        });
    }

    onInputChange = (event: Object): void => {
        let eventObject = event as Event;
        let target = eventObject.target! as HTMLInputElement;
        this.setState({searchTerm: target.value})
    }
}