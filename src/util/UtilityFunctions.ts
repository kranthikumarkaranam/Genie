export const calculateOriginalPrice = (
  discountedPrice: number,
  discountPercentage: number,
) => {
  // Convert the discount percentage to a decimal value
  const discountDecimal = discountPercentage / 100;

  // Calculate the original price
  const originalPrice = discountedPrice / (1 - discountDecimal);

  // Round the result to two decimal places
  return parseFloat(originalPrice.toFixed(0));
};

export const roundToOneDecimalPlace = (num: number) =>
  parseFloat(num.toFixed(1));

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to format category names
export const formatCategory = (name: string) => {
  // Split the category name by '-'
  const words = name.split('-');
  // Capitalize each word and join them with a space
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to reverse formatted category names
export const reverseFormatCategory = (formattedName: string) => {
  // Split the formatted name by space
  const words = formattedName.split(' ');
  // Lowercase the first word and join them with a '-'
  return words
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join('-');
};
