import type { AppProps } from "next/app";
import "../styles/globals.css";

import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";
import "@fontsource/jost/700.css";
import "@fontsource/sen/400.css";
import "@fontsource/sen/700.css";

import { NextSeo } from "next-seo";
import Head from "next/head";

// Google Fonts for Portfolio pages
const GoogleFonts = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Fira+Code:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </>
);
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <NextSeo
        title="JunHyeong | Game Client Developer"
        titleTemplate="JunHyeong | Game Client Developer"
        defaultTitle="JunHyeong | Game Client Developer"
        description="Unity 기반 게임 개발자입니다. 창의적인 게임플레이와 기술적 도전을 즐깁니다."
        openGraph={{
          url: "https://junhyeong7083.github.io/",
          title: "JunHyeong | Game Client Developer",
          description:
            "Unity 기반 게임 개발자입니다. 창의적인 게임플레이와 기술적 도전을 즐깁니다.",
          images: [
            {
              url: "/og-image.png",
              width: 800,
              height: 420,
              alt: "JunHyeong | Game Client Developer",
            },
          ],
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Game Developer, Unity, C#, 게임 개발자, 박준형, JunHyeong, Game Client Developer",
          },
        ]}
      />
      <Head>
        <GoogleFonts />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
