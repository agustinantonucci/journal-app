import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  const dispatch = useDispatch();

  const { isSaving, activeNote } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fuga temporibus nisi placeat assumenda asperiores voluptatum harum architecto quia at. Natus ullam nobis maxime porro facilis exercitationem eaque quia illum.</Typography> */}

      {!!activeNote ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
