import React from 'react'
import type { AppProps } from 'next/app'
import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-50">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp 