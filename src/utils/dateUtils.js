export const formatDate = (timeString, i18n) => {
  const date = new Date(timeString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  let monthNames;

  if (i18n.language === "ka") {
    monthNames = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];
  } else {
    monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  const month = monthNames[monthIndex];
  const year = date.getFullYear();
  return { day, month, year };
};
