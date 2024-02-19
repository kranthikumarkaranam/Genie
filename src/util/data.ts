import constants from './constants';

export const MyOrders = [
  {
    id: 1,
    date: '2021-05-31',
    status: 'Delivered',
    total: 100,
    products: [
      {id: 1, name: 'Product 1', price: 20},
      {id: 2, name: 'Product 2', price: 30},
      {id: 3, name: 'Product 3', price: 50},
    ],
  },
  {
    id: 2,
    date: '2021-07-11',
    status: 'Pending',
    total: 150,
    products: [
      {id: 4, name: 'Product 4', price: 40},
      {id: 5, name: 'Product 5', price: 60},
      {id: 6, name: 'Product 6', price: 50},
    ],
  },
];

export const Images = [
  constants.BannerPlaceholderImgae,
  constants.BannerPlaceholderImgae,
  constants.BannerPlaceholderImgae,
  constants.BannerPlaceholderImgae,
  constants.BannerPlaceholderImgae,
  // 'https://c4.wallpaperflare.com/wallpaper/52/138/501/doll-flowers-red-flowers-wallpaper-preview.jpg',
  // 'https://via.placeholder.com/200x200?text=Image+2',
  // 'https://via.placeholder.com/200x200?text=Image+3',
  // 'https://via.placeholder.com/200x200?text=Image+4',
  // 'https://via.placeholder.com/200x200?text=Image+5',
];
