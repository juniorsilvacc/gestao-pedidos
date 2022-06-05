import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from "next/image";
import { FiLogOut } from 'react-icons/fi';

import headerLogo from '../../../public/header-logo.png';

import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <Link href="/dashboard">
            <Image width={180} height={40} src={headerLogo} alt="Header Logo - Gestão de Pedidos" />
          </Link>

          <Link href="/category">
              <a>Categoria</a>
          </Link>

          <Link href="/product">
              <a>Cardápio</a>
          </Link>
        </div>

        <nav className={styles.nav}>
          <button onClick={logout}>
            <FiLogOut color="#EA1D2C" size={28}/>
          </button>
        </nav>
      </div>
    </header>
  )
}
