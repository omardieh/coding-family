import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";

export default function ThemeToggle({ onChange, label }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={onChange} />}
        label={label}
      />
    </FormGroup>
  );
}
