import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.css';
import { toast } from 'react-toastify';

// Icons
import { BiCategory } from 'react-icons/bi';
import { FiEdit2, FiDelete } from 'react-icons/fi';

// Components
import Header from '../../components/Header';
import Title from '../../components/Title';

// API
import api from '../../services/api';

interface ICategoriesProps {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

export default function Categories() {
  const [categories, setCategories] = useState<ICategoriesProps[]>([] as ICategoriesProps[]);

  useEffect(() => {
    api.get("/api/categories/list").then((response) => {
      setCategories(response.data);
    })
  }, []);

  async function handleDelete(id: string): Promise<void>{
    await api.delete(`/api/categories/remove/${id}`);
    setCategories([...categories.filter(category => category.id !== id)]);

    alert("Deseja excluir essa categoria?");

    toast.success("Categoria excluida");

    const response = await api.get("/api/categories/list");
    setCategories(response.data);
  }

  return (
    <>
      <div>
        <Header />

        <div className={styles.content}>
          <Title name="Categorias">
            <BiCategory color="#000" size={24} />
          </Title>

          <div className={styles.creationCategory}>
            <Link to="/admin/adicionar-categoria">
              Nova Categoria
            </Link>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td data-label="name">{category.name}</td>
                  <td data-label="description" className={styles.description}>{category.description}</td>
                  <td data-label="created_at">
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(category.created_at)
                    )}
                  </td>
                  <td data-label="#">
                    <Link to={`/admin/atualizar-categoria/${category.id}`}>
                      <button className={styles.actionUpdate}>
                        <FiEdit2 color="#FFF" size={20} />
                      </button>
                    </Link>
                    <button className={styles.actionDelete} onClick={() => handleDelete(category.id)}>
                      <FiDelete color="#FFF" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
