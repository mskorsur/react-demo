import React from 'react';

import '../../styles/user-info.css';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { TextFieldEntry } from './TextFieldEntry';
import {IUser} from '../../typings'

interface Props {
    toggleEditingUser: () => void;
    onUserInfoChange: (data: IUser) => void;
    defaultUserData: IUser;
}

interface State extends StateAdapter {
    isCreatingUser: boolean;
    name: string;
    email: string;
    website: string;
    phone: string;
}

interface StateAdapter {
    [key: string]: any
}

export class UserForm extends React.Component<Props, State> {
    state = {
        isCreatingUser: false,
        name: this.props.defaultUserData.name || '',
        email: this.props.defaultUserData.email || '',
        website: this.props.defaultUserData.website || '',
        phone: this.props.defaultUserData.phone || ''
    };

    render() {
        return (
            <Card className={'user-form__wrapper'}>
                <CardContent className="user-form">
                    <Typography variant="h5" component="h2">
                            Edit agent information
                    </Typography>
                    <form className="user-form">
                        <TextFieldEntry label="Name" value={this.state.name} onChange={this.onTextFieldChange}/>
                        <TextFieldEntry label="Email" value={this.state.email} onChange={this.onTextFieldChange}/>
                        <TextFieldEntry label="Phone" value={this.state.phone} onChange={this.onTextFieldChange}/>
                        <TextFieldEntry label="Website" value={this.state.website} onChange={this.onTextFieldChange}/>
                        {this.renderButtons()}
                    </form>
                </CardContent>
            </Card>
        );
    };

    renderButtons() {
        return ( <div className="user-form__buttons">
            <Button className="user-form__buttons__button" variant="contained" color="primary" onClick={this.onUserFormSubmit}>
                Save
            </Button>
            <Button className="user-form__buttons__button" variant="contained" onClick={this.props.toggleEditingUser}>
                Cancel
            </Button>
        </div>);
    };

    onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const value: string = event.target.value;
        const name: string = event.target.name;
        this.setState({[name]: value});
    };

     onUserFormSubmit = () => {
        this.props.onUserInfoChange(this.state);
        this.props.toggleEditingUser();
    };
}