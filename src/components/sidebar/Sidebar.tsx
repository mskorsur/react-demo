import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import {IUser} from '../../typings';

interface Props {
    classes: string;
    users: IUser[];
    selectedUserId: number;
    onUserSelect: (userId: number) => void;
    searchTerm: string
    onSearchValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Sidebar = (props: Props) => {
    return (
        <Paper className={props.classes}>
            {renderSearchField(props)}
            <List component="nav" aria-label="users">
                {renderUsers(props)}
            </List>
        </Paper>
    );
};

const renderSearchField = (props: Props) => {
    return (<TextField
        id="user-search"
        label="Search agents"
        value={props.searchTerm}
        onChange={props.onSearchValueChange}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon/>
                </InputAdornment>
            ),
        }}
    />);
};

// TODO Extra breakdown to users and User required... no time for this :)
const renderUsers = (props: Props) => {
    return props.users
        .filter(user => user.shouldBeDisplayed)
        .map((user: IUser) => {
            return (
                <React.Fragment key={user.id}>
                    <ListItem
                        button
                        selected={props.selectedUserId === user.id}
                        onClick={() => {
                            props.onUserSelect(user.id)
                        }}
                    >
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary={user.name}/>
                    </ListItem>
                </React.Fragment>
            );
        });
};