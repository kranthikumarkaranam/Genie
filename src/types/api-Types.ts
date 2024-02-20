export interface ApiErrorsT {
  errorMessage: string;
}

export type CategoriesApiT = string[];

export interface userApiT {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  // you can add more properties
  // but all the properties in the UserApi state should be included here
  // (otherwise we will get typescript error).
  // In the payload of the async response, there might be extra fields that are not listed here.
}

export interface productApiT {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isInCart: boolean;
  cartCount: number;
}

export interface productsApiT {
  products: productApiT[];
}
