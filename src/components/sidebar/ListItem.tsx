import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

import { IUser } from '../../typings';

interface Props {
    user: IUser,
    onUserSelect : (user: IUser) => void
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
                        selected={this.state.selected}
                        onClick={() => { this.props.onUserSelect(this.props.user) }}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={this.props.user.name} />
                    </ListItem>
        );
    }

}