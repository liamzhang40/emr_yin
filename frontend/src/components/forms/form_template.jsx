import React from 'react';
import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { snakeToTitle } from '../../utils/string_utils';

export default function Form ({
  errors,
  fields,
  handleChange,
  parentState,
}) {
  const textFields = Object.keys(fields).map((fieldName, idx1) => {
    switch (fields[fieldName].componentType) {
      case "select":
        return (
          <Grid key={idx1}
            item xs={fields[fieldName].xs} sm={fields[fieldName].sm}>
            <FormControl 
              error={Boolean(errors[fieldName])}
              fullWidth
              variant={fields[fieldName].variant} 
            >
              <InputLabel htmlFor={`filled-${fieldName}-native-simple`} shrink>{snakeToTitle(fieldName)}</InputLabel>
              <Select
                // error={Boolean(errors[fieldName])}
                // helperText={Boolean(errors[fieldName]) && `${snakeToTitle(fieldName)} ${errors[fieldName]}`}
                input={<FilledInput name="age" id={`filled-${fieldName}-native-simple`} />}
                native
                onChange={handleChange(fieldName)}
                value={parentState[fieldName]}
              >
                <option value="" />
                {fields[fieldName].options.map((option, idx2) => (
                  <option key={idx2} value={option.value}>{option.text}</option>
                ))}
              </Select>
              {
                Boolean(errors[fieldName]) &&
                <FormHelperText>{Boolean(errors[fieldName]) && `${snakeToTitle(fieldName)} ${errors[fieldName]}`}</FormHelperText>
              }
            </FormControl>
          </Grid>
        );
      default:
        return (
          <Grid key={idx1}
            item xs={fields[fieldName].xs} sm={fields[fieldName].sm}>
            <TextField
              autoComplete="new-password"
              error={Boolean(errors[fieldName])}
              fullWidth
              helperText={Boolean(errors[fieldName]) && `${snakeToTitle(fieldName)} ${errors[fieldName]}`}
              id={fieldName}
              label={snakeToTitle(fieldName)}
              InputLabelProps={{
                shrink: true,
              }}
              name={fieldName}
              multiline={Boolean(fields[fieldName].multiline)}
              onChange={handleChange(fieldName)}
              required={fields[fieldName].required}
              type={fields[fieldName].type}
              value={parentState[fieldName]}
              variant={fields[fieldName].variant}
            />
          </Grid>
        );
    }
  });

  return (
    <Grid container spacing={2} style={{ marginBottom: 20 }}>
      {textFields}
    </Grid>
  );
}