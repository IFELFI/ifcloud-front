import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { darkTheme, lightTheme } from './styles/themes/theme.css';
import { appContainer } from './styles/common/container.css';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
  },
  basepath: import.meta.env.VITE_BASE_URL,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <div className={`${darkTheme} ${appContainer}`}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV && (
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
            position="bottom"
          />
        )}
      </QueryClientProvider>
    </div>
  );
}
