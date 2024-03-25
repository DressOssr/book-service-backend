export interface orderDto {
  books: {bookId: number, quantity: number}[];
  subtotal: number;
  shippingPrice: number;
}