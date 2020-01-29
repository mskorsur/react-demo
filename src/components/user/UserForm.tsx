import React, { ChangeEvent } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IUser } from '../../typings';
import { UserService } from '../../services/UserService';
import { DEFAULT_DISPLAY_TYPE } from '../../constants/FormDisplayType';
import { UserFormTextField } from './index'

interface Props {
    toggleEditingUser: (type: string) => void;
    user?: IUser;
    switchMessagePopup: (shouldDisplay: boolean) => void
    isNew: boolean;
}

interface State extends StateAdapter {
    id : number,
    name: string,
    username: string,
    email: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    },
    phone: string,
    website: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
    }
}

interface StateAdapter {
    [key: string]: any
}

export class UserForm extends React.Component<Props, State> {
    state = {
        id: 0,
        name: '',
        username: '',
        email: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: '',
        },
        phone: '',
        website: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
        }   
    }

    componentDidMount() {
        if(this.props.user) {
            this.setState(
                {...this.state, ...this.props.user}
            )
        }
    }

    render() {
        return (
            <Card className={'user-form__wrapper'}>
                <CardContent className="user-form">
                    <Typography variant="h5" component="h2">
                            {this.props.isNew ? 'Create new user' : 'Edit user information'}
                    </Typography>
                    <form className="user-form" onSubmit={this.submitUserForm}> 
                        <UserFormTextField 
                            value={this.state.name}
                            name="name"
                            label="Name"
                            onUserFormFieldChange = {this.onUserFormFieldChange}
                        />
                        <UserFormTextField 
                            value={this.state.username}
                            name="username"
                            label="Username"
                            onUserFormFieldChange = {this.onUserFormFieldChange}
                        />
                        <UserFormTextField 
                            value={this.state.email}
                            name="email"
                            label="Email"
                            onUserFormFieldChange = {this.onUserFormFieldChange}
                        />
                        <UserFormTextField 
                            value={this.state.phone}
                            name="phone"
                            label="Phone"
                            onUserFormFieldChange = {this.onUserFormFieldChange}
                        />
                        <UserFormTextField 
                            value={this.state.website}
                            name="website"
                            label="Website"
                            onUserFormFieldChange = {this.onUserFormFieldChange}
                        />
                        <div className="user-form__buttons">
                            <Button className="user-form__buttons__button" variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                            <Button className="user-form__buttons__button" variant="contained" type="button" onClick={this.onCancelFormClick}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }

    onUserFormFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) : void => {
        let value = event.target.value;
        let key = event.target.name;

        this.setState({[key]: value})
    }

    submitUserForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let userId = this.props.user?.id ? this.props.user?.id : 0;

        try {
            await UserService.updateUser(userId, this.state);
        }
        catch (error) {
            this.props.switchMessagePopup(true);
        }
        
        this.props.toggleEditingUser(DEFAULT_DISPLAY_TYPE);
    }

    onCancelFormClick = () => {
        this.props.toggleEditingUser(DEFAULT_DISPLAY_TYPE);
    }
}