import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import NextApp from 'next/app'
import { ThemeProvider } from 'styled-components'

import App from '../src/components/app'
import GlobalStyles from '../src/components/global-styles'
import * as theme from '../src/theme'

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
})

class MyApp extends NextApp {
  render (): JSX.Element {
    const { Component, pageProps } = this.props
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <App>
            <Component {...pageProps} />
          </App>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default MyApp
