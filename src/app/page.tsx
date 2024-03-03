'use client'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World</h1>
      <a href="./signUp">Cadastre-se</a>
    </main>
  );
}
