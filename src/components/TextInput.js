import React from 'react';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { useController } from "react-hook-form";

const TextInput = ({ InputProps, type, ...rest}) => {
    const {
        field: { onChange, onBlur, name, value, ref, defaultValue },
        fieldState: { invalid },
        formState: { isSubmitting, errors }
    } = useController(rest);

    console.log(defaultValue)

    return (
        <FormControl fullWidth className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth">
            <TextField
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                inputRef={ref}
                disabled={isSubmitting}
                InputProps={InputProps}
                type={type}
            />
            {invalid && <FormHelperText error>{errors[name][0] ? errors[name][0] : errors[name].message}</FormHelperText>}
        </FormControl>
    );
}

export default TextInput;
