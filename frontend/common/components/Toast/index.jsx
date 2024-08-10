import { Snackbar } from "@mui/material";
import { useState } from "react";

export default function Toast(props) {
  const [isOpen, setIsOpen] = useState(true);
  const options = {
    vertical: props.vertical || "bottom",
    horizontal: props.horizontal || "right",
  };
  const { vertical, horizontal } = options;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      message={props.message}
      key={vertical + horizontal}
    />
  );
}
