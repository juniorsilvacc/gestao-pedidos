import React, { useState, FormEvent } from 'react'
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

export default function AddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    
    try {
      if (name === '' || description === '') {
        return toast.warning("Preencha os campo");
      }

      setLoading(true);

      await api.post("/api/categories/create", {
        name,
        description
      });

      toast.success("Categoria cadastrada");

      setLoading(false);

      navigate("/admin/categorias");
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar categoria.");
    }

    setName('');
    setDescription('');
  }

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Title name="Categorias">
          <BiCategory color="#000" size={24} />
        </Title>

        <main className={styles.container}>
          <h1 className={styles.title}>Criar Categoria</h1>
          
          <div className={styles.category}>
            <form onSubmit={handleCreate}>
              <Input
                placeholder="Nome"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="Descrição"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                type="submit"
                loading={loading}
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
