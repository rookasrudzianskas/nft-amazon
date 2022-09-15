import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import {ModalProvider} from "react-simple-hook-modal";

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
      // @ts-ignore
      <MoralisProvider
          serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
          appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      >
        {/*<AmazonProvider>*/}
        {/* @ts-ignore */}
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        {/*</AmazonProvider>*/}
      </MoralisProvider>
  )
}
export default MyApp
