import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { useController } from "react-hook-form";

const SelectInput = ({ options, multiple, property, selectInputProps, inputProps, ...rest }) => {
    const {
        field: { onChange, name, value },
        formState: { isSubmitting, errors },
        fieldState: { invalid }
    } = useController(rest);
    const [defaultValue] = React.useState((() => {
        if (multiple && value.length && options.length) {
            return value.filter(item => options.indexOf(item));
        } else if (!multiple && value && options.length) {
            return options.find(item => item.id == value);
        } else {
            return multiple ? [] : null;
        }
    })());

    const handleChange = (event, option) => {
        return (onChange(option.id))
    }

    const handleMultipleChange = (event, option) => (onChange(option.map(items => items.id)))

    if (!options.length) return 'Sin registros';

    return (
        <FormControl className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth" style={{ width: '100%' }}>
            <Autocomplete
                multiple={multiple}
                {...selectInputProps}
                options={options}
                disabled={isSubmitting}
                getOptionLabel={option => option[property]}
                renderInput={params => (
                    <TextField
                        {...params}
                        InputProps={{ ...params.InputProps, ...inputProps }}
                    />
                )}
                defaultValue={defaultValue}
                onChange={multiple ? handleMultipleChange : handleChange}
                {...rest}
            />
            {invalid && <FormHelperText error>{errors[name][0] ? errors[name][0] : errors[name].message}</FormHelperText>}
        </FormControl>
    );
}

SelectInput.defaultProps = {
    property: 'name',
    options: []
}

export default SelectInput;
