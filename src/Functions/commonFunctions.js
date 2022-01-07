const getMonthDayForMonthInteger = (monthInteger) => {
  switch (monthInteger) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "?";
  }
};

export class CommonDateMethods {
  /**
   * this method return date format (Month Date, Year Hour:Min:Sec)
   * @param {string} isoDateString
   * @returns
   */
  getFormattedDateTime(isoDateString) {
    const jsDate = new Date(isoDateString);
    return `${getMonthDayForMonthInteger(
      jsDate.getMonth()
    )} ${jsDate.getDate()}, ${jsDate.getFullYear()} ${jsDate.getHours()}:${jsDate.getMinutes()}:${jsDate.getSeconds()}`;
  }

  /**
   * this method return date format (Month Date, Year)
   * @param {string} isoDateString
   * @returns
   */
  getFormattedDate(isoDateString) {
    const jsDate = new Date(isoDateString);
    return `${getMonthDayForMonthInteger(
      jsDate.getMonth()
    )} ${jsDate.getDate()}, ${jsDate.getFullYear()}`;
  }

  /**
   * this method return date format (Date-Month-Year)
   * @param {string} isoDateString
   * @returns
   */
  getFormattedDateDashes(isoDateString) {
    const jsDate = new Date(isoDateString);
    return `${jsDate.getDate()}-${jsDate.getMonth()}-${jsDate.getFullYear()}`;
  }
}

export class TransformationMethods {
  /**
   * Group By the values
   * @param {string} xs
   * @param {*} key
   * @returns
   */
  groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  /**
   * this method returns the query string fron Object Fields
   * @param {{object}} queryObject
   * @returns
   */
  buildQueryStringFromObject(queryObject) {
    let queryString = "";
    for (const [key, value] of Object.entries(queryObject)) {
      if (value.length > 0) {
        queryString += `&${key}=${value}`;
      }
    }
    return queryString;
  }

  /**
   * this method helps to capitalize first letter of a word
   * @param {string} string string provided for Uppercase first letter
   * @returns Capitalize First Letter word
   */
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * this function is used to populate a null entry in an array
   * @param {object[]} SelectMenuArray Array of Object|String for populating a Select, List or Dropdown
   * @returns Return the Array with the first item to be NULL
   */
  initializeSelectMenuItems(SelectMenuArray) {
    return [{ _id: "", name: "None" }, ...SelectMenuArray];
  }

  formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };
}
