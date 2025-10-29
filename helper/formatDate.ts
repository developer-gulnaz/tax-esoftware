export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}


// export function formatDate(dateString: string) {
//   const date = new Date(dateString);
//   const now = new Date();

//   const isToday =
//     date.getDate() === now.getDate() &&
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear();

//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);

//   const isYesterday =
//     date.getDate() === yesterday.getDate() &&
//     date.getMonth() === yesterday.getMonth() &&
//     date.getFullYear() === yesterday.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   // ✅ Time period logic (Marathi)
//   const getMarathiPeriod = (h: number) => {
//     if (h >= 8 && h <= 11) return "सकाळ";
//     if (h >= 12 && h <= 15) return "दुपारी";
//     if (h >= 16 && h <= 18) return "संध्या";
//     if (h >= 19 && h <= 23) return "रात्र";
//     return "पहाट";
//   };

//   const timePeriod = getMarathiPeriod(hours);

//   // ✅ 12-hour formatting
//   const hr = hours % 12 || 12;
//   const formattedHours = String(hr).padStart(2, "0");
//   const formattedTime = `${formattedHours}:${minutes} ${timePeriod}`;

//   if (isToday) return `आज, ${formattedTime}`;
//   if (isYesterday) return `काल, ${formattedTime}`;

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year} ${formattedTime}`;
// }
