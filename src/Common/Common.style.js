import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiFormLabel-root": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white", // Change the color to your desired color
  },
}));


const ColumnContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  margin: "10px",
});

const RowContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
});

export { StyledTextField, ColumnContainer, RowContainer };
