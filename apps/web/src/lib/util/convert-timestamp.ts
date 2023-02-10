export default (timestamp:number) => {
    const date = new Date(timestamp * 1000);
    // Months array
    const monthsArr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    // Year
    const year = date.getFullYear();

    // Month
    const month = monthsArr[date.getMonth()];

    // Day
    const day = date.getDate();

    // Hours
    const hours = date.getHours();

    // Minutes
    const minutes = date.getMinutes();

    // Seconds
    const seconds = date.getSeconds();

    // Convert hours & minutes to 12 hour format
    
    const suffix = hours >= 12 ? "pm" : "am";
    
    const clockHours = ((hours + 11) % 12 + 1);
    
    return {
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        clockHours,
        suffix,
    };
};
