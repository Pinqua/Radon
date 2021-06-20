import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Provider as NextAuthProvider } from "next-auth/client";
import { ToastContainer } from "react-toastify"; //styles of nprogress
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import { SWRConfig } from "swr";
import fetcher from "../util/fetch";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <SWRConfig
        value={{
          refreshInterval: 4000,
          fetcher,
        }}
      >
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </Provider>
      </SWRConfig>
    </NextAuthProvider>
  );
}

export default MyApp;
