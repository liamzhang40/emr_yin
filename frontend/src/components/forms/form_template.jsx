import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { snakeToTitle } from '../../utils/string_utils';

export default function Form ({
  errors,
  fields,
  handleChange,
  parentState,
}) {
  const textFields = Object.keys(fields).map((fieldName, idx) => (
    fieldName.component ? 
      <div></div> :
      <Grid key={idx}
        item xs={fields[fieldName].xs} sm={fields[fieldName].sm}>
        <TextField
          error={Boolean(errors[fieldName])}
          helperText={Boolean(errors[fieldName]) && `${snakeToTitle(fieldName)} ${errors[fieldName]}`}
          type={fields[fieldName].type}
          value={parentState[fieldName]}
          name={fieldName}
          required={fields[fieldName].required}
          id={fieldName}
          label={snakeToTitle(fieldName)}
          onChange={handleChange(fieldName)}
          fullWidth
          variant={fields[fieldName].variant}
          autoComplete="new-password"
        />
      </Grid>
  ));

  return (
    <Grid container spacing={2} style={{ marginBottom: 20 }}>
      {textFields}
    </Grid>
  );
}