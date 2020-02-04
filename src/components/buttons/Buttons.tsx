import React from "react";
import {Button} from "@material-ui/core";

import '../../styles/user-info.css'

interface Props {
    onCreateNewUser: () => void;
    onMultiPostDelete: () => void;
}

export const Buttons = (props: Props) => {
    return (
        <div className="main__buttons">
            <Button className="main__buttons__button" variant="contained" color="primary" onClick={props.onCreateNewUser}>
                Create New
            </Button>
            <Button className="main__buttons__button" variant="contained" onClick={props.onMultiPostDelete}>
                Multidelete
            </Button>
        </div>);
};