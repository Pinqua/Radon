import React, { useEffect } from "react";
import StorageService from "../../util/StorageService";
import { store } from "../../app/store";
import { hydrate } from "../../slices/cartSlice";
import Footer from "../Footer/Footer";
import Head from "next/head";
import Header from "../Header/Header";
import { useSession } from "next-auth/client";
import Loader from "react-loader-spinner";
import HeaderMobile from "../Header/HeaderMobile";

function Layout({ children }) {
    const [, loading] = useSession()

    useEffect(() => {
        store.subscribe(() => {
            StorageService.set("cart", JSON.stringify(store.getState().cart));
        });
        let cart = StorageService.get("cart");
        cart = cart ? JSON.parse(cart) : { items: [] };
        store.dispatch(hydrate(cart));
    }, []);


    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <title>Radon</title>
                <meta name="description" content="E-commerce website build with 💗 🔥 by Piyush Sati" />
                <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/img/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/img/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/img/favicons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="msapplication-config" content="/img/favicons/browserconfig.xml" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className="layout">
                <Header />
                <HeaderMobile />
                {loading ?
                    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 loader">
                        <Loader
                            type="TailSpin"
                            color="#0a81ab"
                        />
                    </div>
                    :
                    children
                }
                <Footer />
            </div>
        </>
    );
}

export default Layout;
