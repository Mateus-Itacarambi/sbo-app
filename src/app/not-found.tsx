import styles from './not-found.module.scss';
import Image from 'next/image';
import ImgNotFound from './assets/not-found.png'
import NavBar from './components/NavBar';

export default function NotFound() {
  return (
    <main>
      <NavBar/>
      <div className={styles.container}>
        <Image src={ImgNotFound} alt='Ilustração de erro 404 - Página não encontrada' width={650}/>
        <a href="/" className={styles.button}>Voltar para o Início</a>
      </div>
    </main>
  );
}
