import '../styles/globals.css'
import { Layout } from 'components/Layout'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps },
 }) {

  return (
    <SessionProvider session={session}>
      <Layout>
        <header>
        <title>Playc-Home </title>
            <meta name="description" content="Developed by Erik Murminacho" />
            <link rel="icon" href="/favicon.ico" />
        </header>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    )
}

export default MyApp
