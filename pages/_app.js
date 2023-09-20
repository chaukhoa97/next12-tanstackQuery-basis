import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import '../styles/globals.css'

const queryClient = new QueryClient()

const theme = createTheme({
  /** Put your mantine theme override here */
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default MyApp
