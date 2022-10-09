import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Img
import logo from '../../assets/logo.png';

// Styles
import styles from './styles.module.css';

// Components
import Input from '../../components/Input'
import Button from '../../components/Button';

// Context
import { AuthContext } from '../../context/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [user, setUser] = useState()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent){
    try {
    e.preventDefault();

    if (email === '' || password === '') {
      return toast.warning("Preencha todos os campos.")
    }

    await login({ email, password });

    toast.success("Seu login foi feito com sucesso.");

    navigate("/admin/dashboard");

    } catch (error) {
      toast.error("Ocorreu um erro ao fazer login, cheque as credenciais.");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <img src={logo} alt="Logo - Gestão de Pedidos" />

        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Senha"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
