import getProductDescription from './getProductDescription';

const item1 = {
  name: 'Кавоварка',
  price: 2500,
  isAvailable: true,
};

const item2 = {
  name: 'Крісло геймерське',
  price: 7200,
  isAvailable: false,
};

console.log(getProductDescription(item1));

console.log(getProductDescription(item2));
