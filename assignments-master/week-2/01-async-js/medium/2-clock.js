const getTimeFormat1 = () => {
  const d = new Date();
  console.log(
    d.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );
};
const getTimeFormat2 = () => {
  const d = new Date();
  console.log(
    d.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  );
};

const callTimeFormatsUsingInterval = () => {
  setInterval(() => {
    getTimeFormat1();
    getTimeFormat2();
  }, 1000);
};
const callTimeFormatsUsingTimeout = () => {
  getTimeFormat1();
  getTimeFormat2();
  setTimeout(() => {
    callTimeFormats();
  }, 1000);
};
callTimeFormatsUsingInterval();
callTimeFormatsUsingTimeout();
