import RNFetchBlob from "react-native-fetch-blob";

const cloudyName = "dfir4b1pq";
const cloudyPreset = "rihdprth";

export const today = () => {
  currentDay = new Date();
  if (currentDay.getMonth() < 10) {
    currentDay =
      currentDay.getDate() +
      "-" +
      "0" +
      (currentDay.getMonth() + 1) +
      "-" +
      currentDay.getFullYear();
  } else {
    currentDay =
      currentDay.getDate() +
      "-" +
      (currentDay.getMonth() + 1) +
      "-" +
      currentDay.getFullYear();
  }
  return currentDay;
};

export const oneMonth = () => {
  oneMonthLater = todayEpoch() + 2592000000;
  oneMonthLater = new Date(oneMonthLater);
  if (oneMonthLater.getMonth() < 10) {
    oneMonthLater =
      oneMonthLater.getDate() +
      "-" +
      "0" +
      (oneMonthLater.getMonth() + 1) +
      "-" +
      oneMonthLater.getFullYear();
  } else {
    oneMonthLater =
      oneMonthLater.getDate() +
      "-" +
      (oneMonthLater.getMonth() + 1) +
      "-" +
      oneMonthLater.getFullYear();
  }
  return oneMonthLater;
};

export const todayEpoch = () => {
  return new Date().getTime();
};

export const nowHour = () => {
  currentHour = new Date();
  currentHour =
    currentHour.getHours() +
    ":" +
    currentHour.getMinutes() +
    ":" +
    currentHour.getSeconds();
  return currentHour;
};

export const uploadFile = file => {
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
};

export const momentChecker = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var yyyy = today.getFullYear();
  var tTime = yyyy + "-" + mm + "-" + dd;
  return tTime;
};
