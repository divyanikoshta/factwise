import React, { useState } from "react";
import { Box } from "@mui/material";
import CelebrityCard from "../../components/CelebrityCard";
import celebritiesArr from "../../utils/json/celebrities.json";
import "./celebrities.scss";
import { CelebrityDataProp } from "../../components/CelebrityCard/type";

const Celebrities = () => {
    const [celebrities, setCelebrities] = useState<Array<CelebrityDataProp>>(celebritiesArr);
    const [expandedInd, setExpandedInd] = useState(-1);
    const [anyEdit, setAnyEdit] = useState(false);

    const handleCelebrity = (val: Array<CelebrityDataProp>) => {
        setCelebrities(val);
    };

    const handleSetExpanded = (index: number) => () => {
        if (anyEdit) {
            return;
        }
        setExpandedInd((val: number) => val === index ? -1 : index);
    }

    const handleDelete = () => {
        const newCelebritiList = [...celebrities];
        newCelebritiList.splice(expandedInd, 1);
        handleCelebrity(newCelebritiList);
    };

    const submitData = (index: number) => (celebrityObj: CelebrityDataProp) => {
        setCelebrities((prevVal: Array<CelebrityDataProp>) => {
            const newVal = [...prevVal];
            newVal[index] = celebrityObj;
            return newVal;
        })
    };

    return (
        <Box className="list-wrapper">
            {celebrities.map((data: any, index: number) => (
                <CelebrityCard key={index} data={data} isExpanded={index === expandedInd} handleSetExpanded={handleSetExpanded(index)} handleDelete={handleDelete} submitData={submitData(index)} setAnyEdit={setAnyEdit} />
            ))}
        </Box>
    );
};

export default Celebrities;