let counter = 0;
const getCounter = () => {
  console.log(counter);
  counter++;
  setTimeout(getCounter, 1000);
};
getCounter();
