import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Component } from "react";

class SelectProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { label, projects, projectSelected, handleChange } = this.props;
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel shrink id="demo-simple-select-label">
            {label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectSelected}
            label="projectSelected"
            onChange={(event) => handleChange(event)}
          >
            {projects.map(({ uuid, name }) => (
              <MenuItem key={uuid} value={uuid}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export default SelectProject;
