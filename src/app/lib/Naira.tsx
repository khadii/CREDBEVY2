export const formatToNaira = (value: number | string) => {
    if (value === undefined || value === null || value === "N/A") return "N/A";
    
    const numValue = typeof value === 'string' ? 
      parseFloat(value.replace(/,/g, '')) : 
      value;
    
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue);
  };