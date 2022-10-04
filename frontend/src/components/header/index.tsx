import { useContext } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import Image from "next/image";

import { FiLogOut, FiSettings, FiUserPlus } from 'react-icons/fi';
import { MdProductionQuantityLimits, MdOutlineFastfood } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';

import avatarNull from '../../../public/avatar.jpg';

import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <div>
        <Image width={150} height={150} src={avatarNull} alt="Foto Avatar" />
      </div>

      <Link href="/dashboard">
        <a>
        <MdOutlineFastfood color="#FFF" size={24}/>
          Pedidos
        </a>
      </Link>

      <Link href="/categories">
        <a>
          <BiCategory color="#FFF" size={24} />
            Categorias
        </a>
      </Link>

      <Link href="/products">
        <a>
          <MdProductionQuantityLimits color="#FFF" size={24} />
            Produtos
        </a>
      </Link>

      <Link href="/add-user">
        <a>
          <FiUserPlus color="#FFF" size={24} />
            Usuários
        </a>
      </Link>

      <Link href="/profile">
        <a>
          <FiSettings color="#FFF" size={24} />
            Configurações
        </a>
      </Link>
    
      <a onClick={logout} className={styles.button}>
        <FiLogOut color="#FFF" size={24} />
          Sair
      </a>
    </div>  
  )
}
