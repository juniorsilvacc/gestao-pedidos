import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { MdOutlineFastfood } from 'react-icons/md';

// Styles
import styles from './styles.module.css';

// Components
import Header from '../../components/Header';
import Title from '../../components/Title';

// API
import api from '../../services/api';

interface IProductsProps {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category_id: string;
}

export default function Products() {
  const [products, setProducts] = useState<IProductsProps[]>([] as IProductsProps[]);

  useEffect(() => {
    async function loadsProducts() {
      api.get("/api/products/list").then((response) => {
        setProducts(response.data);
      });
    }
    
    loadsProducts();
  }, []);

  return (
    <>
      <Header />

      <div className={styles.content}>
        <Title name="Produtos">
          <MdOutlineFastfood color="#000" size={24} />
        </Title>

        <div className={styles.lenAndButt}>
          <span><b>{products.length}</b> Produtos Cadastrados</span>

          <Link to="/admin/adicionar-produto">
            Novo Produto
          </Link>
        </div>

        <h1 className={styles.title}>Todos os Produtos</h1>

        <main className={styles.container}>
          {products.map((product) => (
            <div key={product.id} className={styles.containerItem}>
              <div className={styles.item}>
                <img src={`http://localhost:3333/files/${product.image}`} alt={product.name} />
                <h1 className={styles.name}>{product.name}</h1>
                <p className={styles.price}>R$ {product.price},00</p>
              </div>
            </div>
          ))}
        </main>

      </div>
    </>
  )
}
