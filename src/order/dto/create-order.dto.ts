export class CreateOrderDto {
  products: {
    product: string;
    quantity: number;
  }[];
}
