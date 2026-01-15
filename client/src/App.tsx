import { Route, Switch } from "wouter";
import Hero from "./components/Hero";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Hero />
    </div>
  );
}

export default App;
