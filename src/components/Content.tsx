import React from 'react';
import Grid from '@material-ui/core/Grid';

import {MainPage, Buttons, Sidebar} from './index';
import {IUser} from '../typings';
import BrowserCacheService from "../services/BrowserCacheService";
import {UserForm} from "./main/UserForm";
import UserService from "../services/UserService";

interface Props {
    classes: string;
}

interface State {
    users: IUser[];
    selectedUserId: number;
    searchTerm: string;
    isUserCreationMode: boolean;
}

export class Content extends React.Component<Props, State> {
    state = {
        users: [] as IUser[],
        selectedUserId: 0,
        searchTerm: '',
        isUserCreationMode: false,
    };

    async componentDidMount() {
        /* const users2 = await UserService.getUsers();
        this.setState({users: users2});*/

        const users = await BrowserCacheService.getUsers();
        this.setState({users: users});
    }

    render() {
        return (
            <Grid container spacing={3}>
                {this.renderLeftSidePanel()}
                {this.renderMainPageComponents()}
            </Grid>
        );
    }

    renderLeftSidePanel() {
        return (
            <Grid item xs={12} sm={6} md={3}>
                <Sidebar
                    classes={this.props.classes}
                    users={this.state.users}
                    selectedUserId={this.state.selectedUserId}
                    onUserSelect={this.handleUserSelect}
                    onSearchValueChange={this.onSearchValueChange}
                    searchTerm={this.state.searchTerm}
                />
                <Buttons
                    onMultiPostDelete={this.onMultiPostDeleteButtonClick}
                    onCreateNewUser={this.onUserCreationButtonClick}
                />
            </Grid>
        );
    }

    renderMainPageComponents() {
        const defaultData: IUser = {name: '', email: '', phone: '', website: ''};
        if (this.state.isUserCreationMode) {
            return (
                <UserForm
                    toggleEditingUser={this.onUserCreationButtonClick}
                    onUserInfoChange={this.onNewUserCreation}
                    defaultUserData={defaultData}/>
            );
        } else {
            return (
                <MainPage
                    classes={this.props.classes}
                    user={this.findSelectedUser()}
                    onUserInfoChange={this.onUserDataEdit}
                />
            );
        }
    };

    findSelectedUser = () => {
        return this.state.users.find(this.isUserSelected);
    };

    isUserSelected = (user: IUser): boolean => {
        return user.id === this.state.selectedUserId;
    };

    onUserDataEdit = (userData: IUser) => {
        const tempUsers: IUser[] = [];
        this.state.users.forEach(user => {
            if (this.isUserSelected(user)) {
                tempUsers.push({...user, ...userData});
            } else {
                tempUsers.push(user);
            }
        });

        BrowserCacheService.storeUsers(tempUsers);
        this.setState({users: tempUsers});
    };

    onNewUserCreation = (userData: IUser) => {
        const users = [...this.state.users];
        const newUserId = users.length + 1; // user IDs start from 1 so we need to include it in the logic
        users.push(userData);

        BrowserCacheService.storeUsers(users);
        this.setState({users: users, selectedUserId: newUserId});
    };

    handleUserSelect = (userId: number) => {
        this.setState({selectedUserId: userId});
    };

    onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const searchValue = event.target.value;

        let filteredUsers: IUser[] = [...this.state.users];
        for (let user of filteredUsers) {
            user.shouldBeDisplayed = user.name.includes(searchValue);
        }

        this.setState({searchTerm: searchValue, users: filteredUsers});
    };

    onMultiPostDeleteButtonClick = () => {

    };

    onUserCreationButtonClick = () => {
        this.setState((prevState: State) => ({
            isUserCreationMode: !prevState.isUserCreationMode
        }));
    };
}