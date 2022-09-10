interface IUpdateProductDTO {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category_id: string;
}

export { IUpdateProductDTO };
