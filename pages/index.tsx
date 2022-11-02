import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import absoluteUrl from 'next-absolute-url'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the coding challenge
        </h1>

        <p className={styles.description}>
          Get started by looking around at {' '} <br/>
          <code className={styles.code}>pages/index.tsx</code><br/>
          <code className={styles.code}>pages/api/allprojects.ts</code><br/>
          <code className={styles.code}>db/dao.js</code><br/>
        </p>

        <div className={styles.grid}>
          <a href="/projects" className={styles.card}>
            <h2>See Projects &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await fetch( 'http://localhost:3333/api/allprojects')
  const posts = await res.json()

  return {
    props: {
      posts:posts,
    },
  }
}
