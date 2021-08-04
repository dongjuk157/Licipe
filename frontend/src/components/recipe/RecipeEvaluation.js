import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Rating from '@material-ui/lab/Rating';

const RecipeEvaluation = () => {
	const [value, setValue] = React.useState(2);
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        {/* <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        /> */}
      </Box>
    </div>
  );
}

export default RecipeEvaluation;