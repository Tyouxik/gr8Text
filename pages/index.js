import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../public/Components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gr8Courses</title>
      </Head>
      <div class={styles.gridContainer}>
        <Navbar class={styles.Navbar} />
        <div class={styles.Main}>
          <h1>Welcome to Gr8Courses</h1>
        </div>
        <div class={styles.Footer}>
          <h1>This is the footer</h1>
        </div>
      </div>
    </>
  );
}
{
  /* <div className={styles.container}>
      <Head>
        
      </Head>
      <Navbar></Navbar>
      <main className={styles.main}>
        
      </main>
    </div> */
}
