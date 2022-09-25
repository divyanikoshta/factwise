import { SyntheticEvent } from "react";

export interface CustomInputProps {
    value: string | number,
    handleChange: (_obj: SyntheticEvent) => void,
    name: string,
    type: string
}