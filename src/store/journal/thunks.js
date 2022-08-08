
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, noteUpdated } from "./";


export const startNewNote = () => {

    return async(dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } =  getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/jornal/notes` ));

        const setDocResp = await setDoc( newDoc, newNote );

        console.log({newDoc, setDocResp});

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote( newNote ));

        dispatch(setActiveNote( newNote ));

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        if( !uid ) throw new Error('El UID del usuario no existe');
        
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };

        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${uid}/jornal/notes/${activeNote.id}`);

        await setDoc(docRef, noteToFireStore, { merge: true } );

        dispatch(noteUpdated( activeNote ));
    }
}