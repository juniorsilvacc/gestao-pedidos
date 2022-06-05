import { FormEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.css';

// Components
import Header from '../../components/header';
import Select from '../../components/forms/Select';
import File from '../../components/forms/File';
import TextArea from "../../components/forms/TextArea";
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

// Hooks
import { toast } from "react-toastify";

// Utils
import { SSRAuth } from '../../utils/SSRAuth';

export default function Product() {

  const [category, setCategory] = useState([]);
  const [nameItem, setNameItem] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();  
  }

  return (
    <>
      <Head>
        <title>Gestão de Pedidos - Cadastrar Produto</title>
      </Head>
      <Header />

      <main className={styles.container}>
        <div className={styles.product}>
          <h1 className={styles.title}>Criar Produto</h1>

          <form onSubmit={handleCreateProduct}>
            <File />
            
            <Select />
            
            <Input
              type="text"
              placeholder="Produto"
            />

            <Input
              type="text"
              placeholder="Preço"
            />

            <TextArea
              placeholder="Descrição"
            />

            <Button
              type="submit"
              Loading={loading}
            >
              Cadastrar
            </Button>
          </form>
        </div>  
      </main>
    </>
  )
}

export const getServerSideProps = SSRAuth(async (context) => {
  return {
    props: {}
  }
})
