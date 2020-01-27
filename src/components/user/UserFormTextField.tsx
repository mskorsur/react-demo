import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    value: string;
    name: string;
    label: string;
    onUserFormFieldChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function UserFormTextField (props: Props) {
        return (
            <TextField 
            margin={'normal'} 
            fullWidth id="name" 
            label={props.label} 
            variant="outlined"
            name={props.name}
            value={props.value} 
            onChange={(e) => {props.onUserFormFieldChange(e)}} />
        );
}