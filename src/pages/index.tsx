import Head from 'next/head'
import styles from '../styles/Home.module.css'

type AwaitFor<T> = T extends object & { then(onfulfilled: ((value: infer V, ...args: any) => any)): any } ? V : T;
export default function Home(props: AwaitFor<ReturnType<typeof getStaticProps>>['props']) {
  return (
    <div className={styles.container}>
      <Head>
        <title>fs test</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          List of ./
        </p>
        <div className={styles.grid}>
          {props.next.dir.map(item => (
            <a key={item.name} className={styles.card}>
              <h2>{item.name}</h2>
              <p>{item.type}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  await fs.mkdir('new-dir', {mode: 1})
  const dir = await fs.readdir(path.resolve('./'), {withFileTypes: true})
  let next = {
    title: 'd',
    dir: dir.map(item => ({
      name: item.name,
      type: item.isFile() ? 'file' : item.isDirectory() ? 'dir' : 'unknown'
    }))
  }
  return {
    props: {
      next
    },
  }
}
