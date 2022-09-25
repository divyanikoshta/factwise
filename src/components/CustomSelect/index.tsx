import React from "react";
import { FormControl, InputBase, MenuItem, Select, styled } from "@mui/material";
import { CustomSelectProps, optionProp } from "./type";

const Input = styled(InputBase)(() => ({
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        border: '1px solid #ced4da',
        width: '100%',
        padding: '10px 12px',
        '&:focus': {
            borderRadius: 10,
            borderColor: '#ced4da',
            backgroundColor: "#fff"
        },
    },
}));


const CustomSelect = ({ name, value, handleChange, options }: CustomSelectProps) => {
    return (
        <FormControl variant="standard">
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={value}
                onChange={handleChange}
                name={name}
                input={<Input />}
            >
                {options.map((data: optionProp) => (
                    <MenuItem key={data.value} value={data.value}>{data.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default CustomSelect;