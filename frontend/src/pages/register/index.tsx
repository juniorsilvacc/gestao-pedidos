// import { FormEvent, useContext, useState } from 'react';
// import type { NextPage } from 'next';
// import Head from "next/head";
// import Link from "next/link";
// import styles from '../../../styles/home.module.css';

// // Components
// import Input from '../../components/forms/Input';
// import Button from '../../components/forms/Button';

// // Hooks
// import { AuthContext } from '../../contexts/AuthContext';
// import { toast } from 'react-toastify';

// const Register: NextPage = () => {
//   const { register } = useContext(AuthContext);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);

//   async function handleRegister(e: FormEvent) {
//     e.preventDefault();

//     if (name === '' || email === '' || password === '') {
//       return toast.warning("Preencha todos os campos")
//     }

//     setLoading(true);

//     let data = {
//       name,
//       email,
//       password
//     }

//     await register(data);

//     setLoading(false);
//   }

//   return (
//     <>
//       <Head>
//         <title>Gestão de Pedidos - Faça seu Cadastro</title>
//       </Head>
//       <div className={styles.containerCenter}>
//         <h1 className={styles.title}>Cadastre-se</h1>

//         <div className={styles.login}>
//           <form onSubmit={handleRegister}>
//              <Input
//               placeholder="Nome"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <Input
//               placeholder="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <Input
//               placeholder="Senha"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button
//               type="submit"
//               Loading={loading}
//             >
//               Cadastrar
//             </Button>
//           </form>

//           <p className={styles.text}>Não possui um cadastro? <Link href="/">Entrar</Link></p>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Register
