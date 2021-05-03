import Head from "next/head";
import styles from "../styles/Home.module.scss";
import HeroTriangleDown from "../public/Atoms/HeroTriangleDown";
import HeroTriangleLeft from "../public/Atoms/HeroTriangleLeft";
import HeroRectangle from "../public/Atoms/HeroRectangle";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gr8Courses</title>
      </Head>

      <div data-test="home-component">
        <HeroTriangleDown>
          <h1 data-test="welcome-title">Welcome to CourseBuilder</h1>
        </HeroTriangleDown>
        <HeroRectangle>
          <Link href="/courses">
            <h2>Discover our courses</h2>
          </Link>
          <Link href="/dashboard">
            <h2>Create your own course</h2>
          </Link>
        </HeroRectangle>
      </div>
    </>
  );
}
{
  /* <div className={styles.container}>
      <Head>
        
      </Head>
      
      <main className={styles.main}>
        
      </main>
    </div> */
}
