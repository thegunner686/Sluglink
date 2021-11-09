export const toAMPMTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

export const getWeekdayName = (date) => {   
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()];
};

export const getMonthName = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
};

export const getSimpleFormattedDate = (date) => {
    let year = date.getFullYear().toString().padStart(4, "0"),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`
};

export const getDayWithEnding = (date) => {
    let d = date.getDate().toString();
    let lastDay = Number(d.length > 1 ? d[1] : d[0]);
    switch(lastDay) {
        case 1:
            ending = "st";
            break;
        case 2:
            ending = "nd";
            break;
        case 3:
            ending = "rd";
            break;
        default:
            ending = "th";
            break;
    }
    return d + ending;
};

export const toMonthDayDate = (date) => {
    const month = getMonthName(date);
    const weekday = getWeekdayName(date);
    const day = getDayWithEnding(date);

    return `${weekday}, ${month} ${day}`;
};

export const getNumeralTime = (date) => {
    if(date == null) return '';
    const hour = date.getHours() % 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${hour == 0 ? 12 : hour}:${minutes} ${ampm}`;
};

export const getNumeralDate = (date) => {
    if(date == null) return '';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2, 4);

    return `${month}/${day}/${year}`;
};

export const getNumeralDateAndTime = (date) => {
    if(date == null) return '';

    return `${getNumeralTime(date)} ${getNumeralDate(date)}`;
};
