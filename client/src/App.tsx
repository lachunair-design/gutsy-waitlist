import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import Success from "./pages/success";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/success" component={Success} />
      {/* In your App.tsx Switch component */}
<Route path="/story" component={Story} />
      <Route>
        {/* 404 fallback */}
        <div className="min-h-screen bg-[#f3eee4] flex items-center justify-center font-gutsy">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-black/60 mb-8">Page not found</p>
            <a
              href="/"
              className="bg-[#f20028] text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
