export const today =  () => {
    currentDay = new Date();
    currentDay = currentDay.getDate() + "/" + (currentDay.getMonth() + 1)  + "/" + currentDay.getFullYear()
    return currentDay;
}

export const nowHour = ( ) => {
    currentHour = new Date();
    currentHour = currentHour.getHours() + ":" + currentHour.getMinutes() + ":" + currentHour.getSeconds()
    return currentHour;
}