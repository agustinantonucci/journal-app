import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startSavingNote } from "../../store/journal";
import { ImageGallery } from "../components";
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);

    const{ body, title, date ,onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {

        const newDate = new Date(date);

        return newDate.toUTCString();
    },[date])

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [ formState ])

    useEffect(() => {
        if (messageSaved.length > 0 ) {
            Swal.fire("Nota actualizada", messageSaved, "success");
        }
    }, [ messageSaved ])

    const onSaveNote = () => {
        dispatch(startSavingNote());
    }

  return (
    <Grid 
        className='animate__animated animate__fadeIn animate__faster'
        container direction="row" justifyContent="space-between" sx={{mb:1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
        </Grid>
        <Grid item>
            <Button 
                disabled={isSaving}
                onClick={onSaveNote}
                color="primary" 
                sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: "none", mb: 1 }}
                name="title"
                value={ title }
                onChange={onInputChange}
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió el día de hoy?"
                minRows={ 5 }
                sx={{ border: "none", mb: 1 }}
                name="body"
                value={ body }
                onChange={onInputChange}
            />
        </Grid>

        <ImageGallery />
    </Grid>
  )
}
