import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";
import 'react-toastify/dist/ReactToastify.css';
import "~/styles/globals.css";
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`font-sans ${inter.variable}`}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        theme="colored"
      />
    </div>
  );
};

export default api.withTRPC(MyApp);
