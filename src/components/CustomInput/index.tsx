import React from "react";
import { FormControl, InputBase, styled } from "@mui/material";
import { CustomInputProps } from "./type";

const Input = styled(InputBase)(({
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        border: '1px solid #ced4da',
        width: '100%',
        padding: '10px 12px',
    },
}));

const CustomInput = ({ value, handleChange, name, type }: CustomInputProps) => {
    return (
        <FormControl variant="standard">
            <Input type={type} name={name} value={value} onChange={handleChange} id="custom-input" />
        </FormControl>
    );
}

export default CustomInput;