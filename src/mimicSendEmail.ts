import moment from "moment";
export const mimicSendEmail = (email: string) => {
  return new Promise((resolve, reject) => {
    let startTime = new Date().getTime();
    let time = moment().format("mm:ss");
    const randomTimeInMs = Math.floor(Math.random() * 10000) + 10000; //1000-5000 ms
    setTimeout(() => {
      reject(
        `Started sending email to ${email} at: ${time} - ${moment().format(
          "mm:ss"
        )}& took : ${Math.round(randomTimeInMs / 1000)}s`
      );
    }, randomTimeInMs);
  });
};
