import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Form from '../components/form'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fax Iain</title>
        <meta name="description" content="easy way to fax for a drop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Form />
      </main>

      <footer className={styles.footer}>
        <a
          href="http://sawmon-and-natalie.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Saw-mon &amp; Natalie
        </a>
      </footer>
    </div>
  )
}
