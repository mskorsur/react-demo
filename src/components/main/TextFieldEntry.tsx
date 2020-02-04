import React from 'react';

import '../../styles/user-info.css';
import { TextField } from '@material-ui/core';

interface Props {
    label: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const TextFieldEntry = (props: Props) => {
    return <TextField 
        margin={'normal'} 
        variant="outlined"
        defaultValue={props.value}
        fullWidth
        name={props.label.toLowerCase()}
        id={props.label.toLowerCase()}
        label={props.label}
        onChange={props.onChange}
    />
};