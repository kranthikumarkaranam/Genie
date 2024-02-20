// Define types for route and navigation props
export type RootStackParamList = {
  UpdateProfile: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined;
  ProductsByCategory: {
    categoryName: string;
  };
  ProductDetail: {
    productID: number;
    isComingFromHome?: boolean;
  };
  HomeProductDetail: {
    productID: number;
  };
  CartTab: {
    productID: number;
  };
  MyHome: undefined;
  MyOrders: undefined;
  Auth: undefined;
  Main: undefined;
  HomeTab: undefined;
  Categories: undefined;
  CategoriesTab: undefined;
};
