import React from 'react';
import { NEW_DISPLAY_TYPE, EDIT_DISPLAY_TYPE, DEFAULT_DISPLAY_TYPE } from '../../constants/FormDisplayType';
import { UserForm } from '../user/index';
import { IUser } from '../../typings';
import { UserPostsContainer } from '../user/UserPostsContainer';

export interface IMapperProps {
    toggleEditingUser: (type: string) => void;
    user?: IUser;
    switchMessagePopup: (shouldDisplay: boolean) => void
    isNew: boolean;
    toggleUserForm: (type: string) => void;
}

export const userDisplayMapping : {[key: string]: (props: IMapperProps) => JSX.Element | null} = {
    [NEW_DISPLAY_TYPE] : (props) => renderCreateUserForm(props),
    [EDIT_DISPLAY_TYPE] : (props) => renderUserForm(props),
    [DEFAULT_DISPLAY_TYPE] : (props) => renderUserPosts(props)
};

const renderUserForm = (props: IMapperProps) => { 
    return (
       <UserForm 
            toggleEditingUser = {props.toggleUserForm}
            user = {props.user}
            switchMessagePopup = {props.switchMessagePopup}
            isNew = {props.isNew}
       />
    );
}

const renderCreateUserForm = (props: IMapperProps) => {
    return (
        <UserForm 
             toggleEditingUser = {props.toggleUserForm}
             user = {undefined}
             switchMessagePopup = {props.switchMessagePopup}
             isNew = {props.isNew}
        />
     );
}

const renderUserPosts = (props: IMapperProps) => {
    return (
        <UserPostsContainer 
            switchMessagePopup = {props.switchMessagePopup}
            user = {props.user}
        />
    );
}