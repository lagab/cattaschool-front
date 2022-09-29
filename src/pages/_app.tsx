import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../api/queries/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloCLient = useApollo(pageProps, '', '');

  return (
    <ApolloProvider client={apolloCLient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
