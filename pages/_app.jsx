import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { appWithTranslation } from "next-i18next";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import createEmotionCache from "createEmotionCache";
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
import "../src/__server__";
import { PrismaClient } from "@prisma/client";
import { Provider } from "react-redux";
import store from "../src/app/store";
//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({
  showSpinner: false,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const App = (props) => {
  // const user = prisma.user.findMany();
  // console.log(user);
  const prisma = new PrismaClient();

  async function main() {
    // const createUser = await prisma.User.create({
    //   data: {
    //     // id: "e42e28ea-528f-4bc8-81fb-97f658d67d75",
    //     email: "Jayden.Gislason78@gmail.com",
    //     phone: "(445) 653-3771 x985",
    //     avatar: "/assets/images/faces/ralph.png",
    //     password: "wJVineM971smn42",
    //     dateOfBirth: "1996-04-25T22:23:50.205Z",
    //     verified: true,
    //     firstName: "Nick",
    //     lastName: "DuBuque",
    //   },
    // });
    // const createUser = await prisma.User.deleteMany();
    // console.log(createUser);
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      // await prisma.$disconnect();
      // process.exit(1);
    });

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
        <title>Enfoni - Ecommerce</title>
      </Head>

      <Provider store={store}>
        <SettingsProvider>
          <AppProvider>
            <MuiTheme>
              <SnackbarProvider>
                <RTL>{getLayout(<Component {...pageProps} />)}</RTL>
              </SnackbarProvider>
            </MuiTheme>
          </AppProvider>
        </SettingsProvider>
      </Provider>
    </CacheProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App);
