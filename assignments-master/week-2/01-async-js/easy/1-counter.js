let counter = 0;
const getCounter = () => {
  setInterval(() => {
    counter = counter + 1;
    console.log(counter);
  }, 1000);
};
getCounter();
