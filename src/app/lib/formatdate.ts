export const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Invalid date"
        : date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return "Invalid date";
    }
};


// utils/formatPhoneNumber.js
export function formatNigerianPhoneNumber(number: string, format = "international") {
  if (!number) return "";

  // Remove all non-digit characters
  const digits = number.replace(/\D/g, "");

  // Handle international format
  if (format === "international") {
    // Remove leading 0 if present
    const cleaned = digits.startsWith("0") ? digits.slice(1) : digits;

    if (cleaned.length !== 10) return number;

    return `+234 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  // Handle local format
  if (format === "local") {
    if (digits.length === 11 && digits.startsWith("0")) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    } else {
      return number;
    }
  }

  return number;
}
