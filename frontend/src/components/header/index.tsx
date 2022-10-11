import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.css';

// Icons
import { FiLogOut, FiSettings, FiUserPlus } from 'react-icons/fi';
import { MdProductionQuantityLimits, MdOutlineFastfood } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';

// Img
import avatar from '../../assets/avatar.jpg';

// Context
import { AuthContext } from '../../context/AuthContext';

export default function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <div>
        <img src={avatar} alt="Foto Avatar" />
        {/* <img src={user.user.avatar === undefined ? avatar : user.user.avatar} alt="Foto Avatar" /> */}
      </div>

      <Link to="/admin/dashboard">
        <MdOutlineFastfood color="#FFF" size={22}/>
          Pedidos
      </Link>

      <Link to="/admin/categorias">
        <BiCategory color="#FFF" size={22} />
          Categorias
      </Link>

      <Link to="/admin/produtos">
        <MdProductionQuantityLimits color="#FFF" size={22} />
          Produtos
      </Link>

      <Link to="/admin/adicionar-usuario">
        <FiUserPlus color="#FFF" size={22} />
          Usuários
      </Link>

      <Link to="/admin/perfil">
        <FiSettings color="#FFF" size={22} />
          Configurações
      </Link>
    
      <a onClick={logout} className={styles.button}>
        <FiLogOut color="#FFF" size={22} />
          Sair
      </a>
    </div>  
  )
}
