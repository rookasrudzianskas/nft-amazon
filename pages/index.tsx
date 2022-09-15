import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

const styles = {
    container: `h-full w-full flex bg-[#fff]`,
}


const Home: NextPage = () => {
  return (
    <div  className={styles.container}>
      <Head>
        <title>Amazon NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Sidebar />
        <Main />
    </div>
  )
}

export default Home
