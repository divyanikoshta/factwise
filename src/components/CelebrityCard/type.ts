export interface celebrityCardProps {
    data: CelebrityDataProp;
    isExpanded: boolean,
    handleSetExpanded: () => void,
    handleDelete: () => void,
    submitData: (_obj: CelebrityDataProp) => void,
    setAnyEdit: (_type: boolean) => void,
}

export interface CelebrityDataProp {
    id: number,
    first: string,
    last: string,
    dob: string,
    gender: string,
    email: string,
    picture: string,
    country: string,
    description: string
}