import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import TransactionPage from "./pages/transaction/TransactionPage";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <TransactionPage />
    </div>
  );
}

export default App;
