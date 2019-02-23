export const today =  () => {
    currentDay = new Date();
    if(currentDay.getMonth() < 10 ){
    currentDay = currentDay.getDate() + "/" + "0" + (currentDay.getMonth() + 1)  + "/" + currentDay.getFullYear()
}else{
    currentDay = currentDay.getDate() + "/" + (currentDay.getMonth() + 1)  + "/" + currentDay.getFullYear()
}
    return currentDay;
}

export const nowHour = ( ) => {
    currentHour = new Date();
    currentHour = currentHour.getHours() + ":" + currentHour.getMinutes() + ":" + currentHour.getSeconds()
    return currentHour;
}