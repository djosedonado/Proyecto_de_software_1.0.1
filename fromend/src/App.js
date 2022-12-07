import "./App.css";
import { Container } from "./components/Container";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Container/>
      </AuthProvider>
    </div>
  );
}

export default App;
