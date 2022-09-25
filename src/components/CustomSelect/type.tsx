import { SyntheticEvent } from "react"

export interface CustomSelectProps {
    name: string,
    value: string,
    handleChange: (_event: any) => void,
    options: Array<optionProp>
}

export interface optionProp {
    name: string,
    value: string
}