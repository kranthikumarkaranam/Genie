import {asyncOrdersT} from '../types/store-Types';

// Define the possible values for status.text
const possibleStatuses = [
  {text: 'Processing', color: '#FFA500'},
  {text: 'Shipped', color: '#0000FF'},
  {text: 'Delivered', color: '#008000'},
  {text: 'Cancelled', color: '#FF0000'},
] as const;

// Define possible user names
const possibleUserNames = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eva',
  'Frank',
  'Grace',
  'Harry',
  'John',
  'Jack',
  'Kelly',
];

// Generate a random number of orders between 3 and 7
const randomNumberOfOrders = Math.floor(Math.random() * 5) + 3;

// Generate an array of random orders
export const MyOrdersData: asyncOrdersT[] = Array.from(
  {length: randomNumberOfOrders},
  (_, index) => {
    // Generate a random number of order products between 1 and 7
    const randomOrderedProductsLength = Math.floor(Math.random() * 7) + 1;

    // Generate a random price for each ordered product
    const orderedProducts = Array.from(
      {length: randomOrderedProductsLength},
      () => Math.floor(Math.random() * 100) + 1,
    );

    // Generate a random status text
    const randomStatus =
      possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];

    // Generate a random date for orderedOn
    const randomDate = new Date('2024-02-20');
    randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 7));

    // Generate a random order total
    const randomOrderTotal = orderedProducts.reduce(
      (acc, curr) => acc + curr,
      0,
    );

    // Generate a random orderedBy name
    const randomOrderedByName =
      possibleUserNames[Math.floor(Math.random() * possibleUserNames.length)];

    // Generate a random 5-digit order ID
    const randomOrderId = Math.floor(Math.random() * 90000) + 10000;

    return {
      orderId: randomOrderId,
      orderedOn: randomDate,
      orderedBy: randomOrderedByName,
      status: {
        text: randomStatus.text,
        color: randomStatus.color,
      },
      orderTotal: randomOrderTotal,
      orderedProducts: orderedProducts,
    };
  },
);
