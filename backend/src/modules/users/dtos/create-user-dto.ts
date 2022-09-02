interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
}

export { ICreateUserDTO };
