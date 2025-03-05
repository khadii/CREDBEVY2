export const formatNaira = (value: string): string => {
  // Remove all non-digit characters (allow numbers only)
  const numericValue = value.replace(/[^\d]/g, '');
  
  // Add commas as thousands separators
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return formattedValue;
};
