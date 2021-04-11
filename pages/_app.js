import { AppProps } from "next/app";
import { AuthProvider } from "../utils/auth-context";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
