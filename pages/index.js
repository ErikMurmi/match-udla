import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from 'images/playc-white-logo.png'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Playc</title>
        <meta name="description" content="Donde encontrarás el lugar que necesitas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image id='logo-img' src={Logo} height={200}></Image>

        <div className={styles.grid}>
          <a href="/login" className={styles.card}>
            <h2>Login</h2>
          </a>

          <a href="/instalaciones" className={styles.card}>
            <h2>Core</h2>
          </a>

          <a href="/instalaciones/addNew" className={styles.card}>
            <h2>add instalacion</h2>
          </a>

          <a
            href="/admin"
            className={styles.card}
          >
            <h2>Admin</h2>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
