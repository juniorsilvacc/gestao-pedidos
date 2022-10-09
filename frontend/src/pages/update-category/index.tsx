import { useState, useEffect, FormEvent } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './styles.module.css';
import { toast } from 'react-toastify';

// Icons
import { BiCategory } from 'react-icons/bi';

// Components
import Header from '../../components/Header'
import Input from '../../components/Input'
import Title from '../../components/Title'
import Button from '../../components/Button';

// API
import api from '../../services/api';

interface ICategoryProps {
  name: string;
  description: string;
}

export default function UpdateCategory() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<ICategoryProps>({} as ICategoryProps);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const { id } = useParams();

  useEffect(() => {
    async function loadCategory() {
      api.get(`/api/categories/show/${id}`).then((response) => {
        setCategory(response.data);
      });
    }
    
    loadCategory();
  }, [id]);

  async function handleEdit(e: FormEvent) {  
    try {
      e.preventDefault();

      setLoading(true);

      const { name, description } = category;

      const data = { name, description };
      
      await api.patch(`/api/categories/update/${id}`, data);

      toast.success("Categoria atualizada");

      setLoading(false);
      navigate("/admin/categorias");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar categoria.");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Title name="Categorias">
          <BiCategory color="#000" size={24} />
        </Title>

        <main className={styles.container}>
          <h1 className={styles.title}>Atualizar Categoria</h1>
          
          <div className={styles.category}>
            <form onSubmit={handleEdit}>
              <Input
                placeholder="Nome"
                type="text"
                name="name"
                value={category.name || ""}
                onChange={handleChange}
              />

              <Input
                placeholder="Descrição"
                type="text"
                name="description"
                value={category.description || ""}
                onChange={handleChange}
              />

              <Button
                type="submit"
                loading={loading}
              >
                Atualizar
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
