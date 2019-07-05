export const camelToSnake = string => (
  // firstName => first_name
  string.replace(/(?:^|\.?)([A-Z])/g, (x, y) => "_" + y.toLowerCase())
);

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const snakeToTitle = string => {
  // first_name => First Name
  const str = string.replace(/([-_][a-z])/ig, ($1) => (
    $1.toUpperCase()
      .replace('-', ' ')
      .replace('_', ' ')
  )) ;
  
  return capitalize(str);
};
