import { Box, TextareaAutosize } from "@mui/material";
import clsx from "clsx";
import React, { SyntheticEvent, useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import CustomSelect from "../CustomSelect";
import DeleteDialog from "../DeleteDialog";
import "./celebrityCard.scss";
import { celebrityCardProps } from "./type";

const CelebrityCard = ({ data, isExpanded, handleSetExpanded, handleDelete, submitData, setAnyEdit }: celebrityCardProps) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [errormsg, setErrorMsg] = useState<boolean>(false);

    const genderList = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Transgender", value: "transgender" },
        { name: "Rather not say", value: "ratherNotSay" },
        { name: "Other", value: "other" },
    ];
    const getAge = (dob: string) => {
        var diff = (new Date(dob).getTime() - new Date().getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    };

    const [celebrity, setCelebrity] = useState<any>({});

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    };

    const handleChange = (event: any) => {
        setErrorMsg(false);
        let newCeleb = {};
        if (event.target.name === "dob") {
            const oldAge = getAge(celebrity.dob);
            const diff = oldAge - parseInt(event.target.value);
            const dobArr = celebrity.dob.split("-");
            const newYear = parseInt(dobArr[0]) + diff;
            dobArr[0] = newYear;
            const newdob = dobArr.join("-");
            newCeleb = { ...celebrity, [event.target.name]: newdob }
        } else {
            newCeleb = { ...celebrity, [event.target.name]: event.target.value }
        }
        setCelebrity(newCeleb);
    }

    const getLastName = (val: any) => {
        if (val.name) {
            let last = val.name.split(" ");
            last.shift();
            return last.join(" ");
        }
        return val.last;
    }

    const updateCelebrity = () => {
        if (celebrity?.name === "null" || celebrity?.name === "" || celebrity.age === "" || celebrity.age === "null" || celebrity.description === "null" || celebrity.description === "" || celebrity.country === "null" || celebrity.country === "") {
            setErrorMsg(true);
            return;
        }
        setAnyEdit(false);
        setErrorMsg(false)
        var celebObj = {
            id: celebrity.id,
            first: celebrity.name ? celebrity?.name?.split(" ")[0] : celebrity.first,
            last: getLastName(celebrity),
            dob: celebrity.dob,
            gender: celebrity.gender,
            email: celebrity.email,
            picture: celebrity.picture,
            country: celebrity.country,
            description: celebrity.description
        };
        setCelebrity(celebObj);
        submitData(celebObj);
        setEditMode(!editMode);
    };

    const handleExpand = () => {
        if (editMode) {
            return;
        }
        handleSetExpanded();
    };

    useEffect(() => {
        setCelebrity(JSON.parse(JSON.stringify({ "name": data.first + " " + data.last, ...data })));
    }, [data]);

    return (
        <Box>
            <Box className={clsx("card-wrapper", { "card": isExpanded })}>
                <Box className={clsx("summary", { "summaryBorder": !isExpanded })}>
                    <Box>
                        <img className="image" src={celebrity?.picture} alt="" height={50} />
                    </Box>
                    {!editMode && <Box className="ml-2">
                        {celebrity?.first} {celebrity?.last}
                    </Box>}
                    {editMode &&
                        <Box>
                            <Box className="ml-2">
                                <CustomInput type="text" name="name" value={celebrity.name} handleChange={((event: SyntheticEvent) => handleChange(event))} />
                            </Box>
                        </Box>
                    }
                    <Box className="action-button ml-a" onClick={handleExpand}>
                        <span className="material-icons-outlined">
                            expand_more
                        </span>
                    </Box>
                </Box>
                {isExpanded && <Box>
                    {!editMode &&
                        <>
                            <Box className="celeb-detail-view">
                                <Box>
                                    <Box className="label">Age</Box>
                                    <Box>{getAge(celebrity?.dob)} Years</Box>
                                </Box>
                                <Box>
                                    <Box className="label">Gender</Box>
                                    <Box>{celebrity?.gender}</Box>
                                </Box>
                                <Box>
                                    <Box className="label">Country</Box>
                                    <Box>{celebrity?.country}</Box>
                                </Box>
                            </Box>
                            <Box className="mb-1">
                                <Box className="label">Description</Box>
                                <Box>{celebrity?.description}</Box>
                            </Box>
                        </>
                    }
                    {editMode &&
                        <>
                            <Box className="celeb-detail-edit">
                                <Box>
                                    <Box className="label">Age</Box>
                                    <CustomInput type="number" name="dob" value={getAge(celebrity?.dob)} handleChange={((event: any) => handleChange(event))} />
                                </Box>
                                <Box>
                                    <Box className="label">Gender</Box>
                                    <CustomSelect name="gender" value={celebrity?.gender} handleChange={((event: any) => handleChange(event))} options={genderList} />
                                </Box>
                                <Box>
                                    <Box className="label">Country</Box>
                                    <CustomInput type="text" name="country" value={celebrity?.country} handleChange={((event: any) => handleChange(event))} />
                                </Box>
                            </Box>
                            <Box className="mb-1">
                                <Box className="label">Description</Box>
                                <TextareaAutosize
                                    className="textArea"
                                    minRows={6}
                                    maxRows={6}
                                    name="description"
                                    aria-label="maximum height"
                                    value={celebrity?.description}
                                    onChange={((event: SyntheticEvent) => handleChange(event))}
                                />
                            </Box>
                        </>
                    }
                    {!editMode && <Box className="view-mode">
                        <Box component="span" onClick={() => { handleOpenDialog() }} className="material-icons-outlined action-button btn-red">
                            delete_forever
                        </Box>
                        <Box component="span" onClick={() => { setAnyEdit(true); setEditMode(!editMode); }} className="btn-blue ml-1 btngreen action-button material-icons-outlined">
                            edit
                        </Box>
                    </Box>}

                    {editMode &&
                        <Box className="edit-mode">
                            {errormsg && <Box className="error-msg">
                                Please fill all fields.
                            </Box>}
                            <Box className="edit-mode-btn">
                                <Box component="span" onClick={() => { setAnyEdit(false); setEditMode(!editMode) }} className="material-icons-outlined action-button btn-red">
                                    highlight_off
                                </Box>
                                <Box component="span" onClick={updateCelebrity} className="ml-1 btn-green action-button material-icons-outlined">
                                    check_circle
                                </Box>
                            </Box>
                        </Box>
                    }
                </Box>}
            </Box>
            <DeleteDialog open={openDialog} handleOpenDialog={handleOpenDialog} handleDelete={handleDelete} />
        </Box >
    )
};

export default CelebrityCard;