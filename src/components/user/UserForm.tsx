import React, { ChangeEvent } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IUser, IUserAddress, IUserCompany } from '../../typings';
import { UserService } from '../../services/UserService';
import { DEFAULT_DISPLAY_TYPE } from '../../constants/FormDisplayType';

interface Props {
    toggleEditingUser: (type: string) => void;
    user?: IUser;
    switchMessagePopup: (shouldDisplay: boolean) => void
    isNew: boolean;
}

interface State {
    userFormData: IUser
}

export class UserForm extends React.Component<Props, State> {
    state = {
        userFormData: {
            id: 0,
            name: '',
            username: '',
            email: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: '',
            } as IUserCompany,
            phone: '',
            website: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
            } as IUserAddress
        } as IUser
    }

    componentDidMount() {
        if(this.props.user) {
            this.setState({
                userFormData: {...this.props.user} as IUser
            })
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
                        <TextField margin={'normal'} fullWidth id="name" label="Name" variant="outlined" value={this.state.userFormData.name} onChange={(e) => {this.onUserFormFieldChange(e, "name")}} />
                        <TextField margin={'normal'} fullWidth id="email" label="Email" variant="outlined" value={this.state.userFormData.email} onChange={(e) => {this.onUserFormFieldChange(e, "email")}}/>
                        <TextField margin={'normal'} fullWidth id="phone" label="Phone" variant="outlined" value={this.state.userFormData.phone} onChange={(e) => {this.onUserFormFieldChange(e, "phone")}}/>
                        <TextField margin={'normal'} fullWidth id="website" label="Website" variant="outlined" value={this.state.userFormData.website} onChange={(e) => {this.onUserFormFieldChange(e, "website")}}/>
                        <TextField margin={'normal'} fullWidth id="company" label="Company name" variant="outlined" value={this.state.userFormData.company.name} onChange={(e) => {this.onUserFormFieldChange(e, "company_name")}}/>
                        <TextField margin={'normal'} fullWidth id="street" label="Street name" variant="outlined" value={this.state.userFormData.address.street} onChange={(e) => {this.onUserFormFieldChange(e, "address")}}/>
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

    onUserFormFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) : void => {
        let updatedUserFormData = {...this.state.userFormData} as IUser;
        let value = event.target.value;

        switch (key) {
            case 'name':
                updatedUserFormData.name = value;
                break;
            case 'email':
                updatedUserFormData.email = value;
                break;
            case 'phone':
                updatedUserFormData.phone = value;
                break;
            case 'website':
                updatedUserFormData.website = value;
                break;
            case 'company_name':
                updatedUserFormData.company.name = value;
                break;
            case 'address':
                updatedUserFormData.address.street = value;
        }
        this.setState({
            userFormData: updatedUserFormData
        })
    }

    submitUserForm = async (event: React.FormEvent<HTMLFormElement>) => {
        //todo: it should implement second option for posting new user but there is no endpoint
        event.preventDefault();
        let userId = this.props.user?.id ? this.props.user?.id : 0;
        try {
            await UserService.updateUser(userId, this.state.userFormData);
            this.props.toggleEditingUser(DEFAULT_DISPLAY_TYPE);
        }
        catch (error) {
            this.props.switchMessagePopup(true);
        } 
    }

    onCancelFormClick = () => {
        this.props.toggleEditingUser(DEFAULT_DISPLAY_TYPE);
    }
}