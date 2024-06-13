export interface IProduct {
    id: number;
    id_cate: number;
    name: string;
    price: number;
    price_sale: number;
    image: string;
    date: string;
    hidden: number;
}
export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
  }

