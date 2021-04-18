import { AppProps } from "next/app";
import { AuthProvider } from "../utils/auth-context";
import "../styles/globals.scss";
import Navbar from "../public/Components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
