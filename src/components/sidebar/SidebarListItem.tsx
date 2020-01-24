import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

import { IUser } from '../../typings';

interface Props {
    user: IUser,
    onUserSelect : (user: IUser) => void,
    selectedUserId: number
}

interface State {
    selected: boolean
}

export class SidebarListItem extends React.Component<Props, State> {
    state = {
        selected: false
    };

    render() {
        return (
            <ListItem 
                        key={this.props.user.id} 
                        button
                        selected={this.props.selectedUserId === this.props.user.id}
                        onClick={() => { this.onUserSelect() }}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={this.props.user.name} />
                    </ListItem>
        );
    }

    onUserSelect = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
        this.props.onUserSelect(this.props.user);
    }
}