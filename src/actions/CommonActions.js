import RNFetchBlob from "react-native-fetch-blob";

const cloudyName = "dfir4b1pq";
const cloudyPreset = "rihdprth";

export const today =  () => {
    currentDay = new Date();
    if(currentDay.getMonth() < 10 ){
    currentDay = currentDay.getDate() + "/" + "0" + (currentDay.getMonth() + 1)  + "/" + currentDay.getFullYear()
}else{
    currentDay = currentDay.getDate() + "/" + (currentDay.getMonth() + 1)  + "/" + currentDay.getFullYear()
}
    return currentDay;
}

export const todayEpoch = () => {
  return new Date().getTime();
};


export const nowHour = ( ) => {
    currentHour = new Date();
    currentHour = currentHour.getHours() + ":" + currentHour.getMinutes() + ":" + currentHour.getSeconds()
    return currentHour;
}

export const  uploadFile = (file)  => {
    return RNFetchBlob.fetch(
      "POST",
      "https://api.cloudinary.com/v1_1/" +
        cloudyName +
        "/image/upload?upload_preset=" +
        cloudyPreset,
      {
        "Content-Type": "multipart/form-data"
      },
      [
        {
          name: "file",
          filename: file.fileName,
          data: RNFetchBlob.wrap(file.path)
        }
      ]
    );
  }