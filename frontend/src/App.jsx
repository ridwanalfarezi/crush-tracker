import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import "./styles/main.css";

function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
