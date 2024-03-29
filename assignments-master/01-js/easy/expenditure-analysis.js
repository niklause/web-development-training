/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const categoryArray = [];
  const resultArray = [];

  let sum = 0;
  transactions.forEach((data) => {
    categoryArray.push(data.category);
  });
  const filteredArray = [...new Set(categoryArray)];
  for (let index = 0; index < filteredArray.length; index++) {
    transactions.forEach((data) => {
      if (data.category === filteredArray[index]) {
        sum = sum + data.price;
      }
    });
    resultArray.push({ category: filteredArray[index], totalSpent: sum });
    sum = 0;
  }
  return resultArray;
}

module.exports = calculateTotalSpentByCategory;
