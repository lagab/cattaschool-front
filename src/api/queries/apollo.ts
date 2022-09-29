import {
  ApolloClient,
  DefaultOptions,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { isEqual } from 'lodash';
import merge from 'deepmerge';
import { ACCESS_TOKEN_LOCAL_STORAGE_ITEM } from '../../types/auth';
import router from 'next/router';
import logger from '../../utils/logger';
import { print } from 'graphql';
import { useMemo } from 'react';

const apolloCLient = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
});

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloGetClient: ApolloClient<NormalizedCacheObject>;
let apolloPostClient: ApolloClient<NormalizedCacheObject>;

const isSSR = typeof window === 'undefined';

const createHttpLink = (basePath: string) =>
  new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT ?? `${basePath}/graphql`,
    fetch,
  });

/**
 * Add auth token header
 */
const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_ITEM);

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken || ''}`,
    },
  };
});

const timeoutLink = new ApolloLinkTimeout(10000);

/**
 * getDefaultOptions for client
 * no-cache on preview env or server side
 * @returns defaultOptions
 */
const getDefaultOptions = (env: string): DefaultOptions => ({
  query: {
    ...((env === 'PREVIEW' || isSSR) && { fetchPolicy: 'no-cache' }),
    errorPolicy: 'all',
  },
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  logger.error(
    { query: print(operation.query), variables: operation.variables },
    'Error in grapqhql query'
  );

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions && extensions.errorCode === `UNAUTHENTICATED`) {
        const signInUrl = `/sign-in.`;
        router.push(signInUrl);
      }
      logger.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) logger.error(`[Network error]: ${networkError}`);
});

/**
 * getDefaultOptions for client with no cache
 * @returns defaultOptions
 */
const getDefaultOptionsNoCache = (): DefaultOptions => ({
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
});

/**
 * Used both client side and server side
 * @returns Apollo Post Client
 */
const createApolloPostClient = (
  basePath: string
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode: isSSR,
    link: from([authLink, errorLink, timeoutLink, createHttpLink(basePath)]),
    cache: new InMemoryCache(),
    defaultOptions: getDefaultOptionsNoCache(),
  });

/**
 * This method is used on client side only
 */
const createApolloGetClient = (
  basePath: string,
  env: string
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode: false,
    link: from([authLink, errorLink, timeoutLink, createHttpLink(basePath)]),
    cache: new InMemoryCache(),
    defaultOptions: getDefaultOptions(env),
  });

export function initializeApollo(
  basePath: string,
  env: string,
  initialState: NormalizedCacheObject = {}
): ApolloClient<NormalizedCacheObject> {
  const apolloGetClientInstance =
    apolloGetClient ?? createApolloGetClient(basePath, env);
  const apolloPostClientInstance =
    apolloPostClient ?? createApolloPostClient(basePath);

  if (isSSR) return createApolloPostClient(basePath);

  if (initialState) {
    //loggerInstance.debug('use Apollo cache');
    const existingCache = apolloGetClientInstance.extract();

    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]) => [
        ...sourceArray,
        ...destinationArray.filter((d: unknown) =>
          sourceArray.every((s: unknown) => !isEqual(d, s))
        ),
      ],
    });

    apolloGetClientInstance.cache.restore(data);
  }

  if (!apolloGetClient) apolloGetClient = apolloGetClientInstance;
  if (!apolloPostClient) apolloPostClient = apolloPostClientInstance;
  return apolloGetClientInstance;
}

export function useApollo(
  pageProps: Record<string, NormalizedCacheObject>,
  basePath: string,
  env: string
): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo(basePath, env, state),
    [basePath, env, state]
  );
  return store;
}

export default apolloCLient;
