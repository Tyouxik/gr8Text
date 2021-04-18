import Head from "next/head";
import styles from "../styles/Home.module.scss";
import HeroTriangleDown from "../public/Atoms/HeroTriangleDown";
import HeroTriangleLeft from "../public/Atoms/HeroTriangleLeft";
import HeroRectangle from "../public/Atoms/HeroRectangle";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gr8Courses</title>
      </Head>

      <div>
        <HeroTriangleDown>
          <h1>Welcome to CourseBuilder</h1>
        </HeroTriangleDown>
        <HeroRectangle>
          <h2>Discover our courses</h2>
          <h2>Here they are</h2>
        </HeroRectangle>
        <HeroTriangleDown>
          <h2>Discover our courses</h2>
        </HeroTriangleDown>
        <HeroRectangle>
          <h2>Discover our courses</h2>
          <h2>Here they are</h2>
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
