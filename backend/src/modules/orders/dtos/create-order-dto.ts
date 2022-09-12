interface ICreateOrderDTO {
  id?: string;
  name?: string;
  table: number;
  status: boolean;
  draft: boolean;
}

export { ICreateOrderDTO };
