import React from "react";
import { Button, DialogActions, DialogContent, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DeleteDialogProp } from "./type";
import "./deleteDialog.scss";

const DeleteDialog = ({ open, handleOpenDialog, handleDelete }: DeleteDialogProp) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialogWrapper"
        >
            <DialogContent>
                <Box className="header">
                    <Box>
                        Are you sure you want to delete?
                    </Box>
                    <Box onClick={handleOpenDialog} className="material-icons-outlined close">
                        close
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button className="cancel" onClick={handleOpenDialog}>
                    Cancel
                </Button>
                <Button className="delete" onClick={() => { handleOpenDialog(); handleDelete(); }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>)

};

export default DeleteDialog;