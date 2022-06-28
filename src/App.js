import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useFirebase from "./hooks/use-firebase";
import { useDispatch } from "react-redux";
import { counterActions } from "./store/counter-store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./components/Footer";
import Prodotti from "./components/Prodotti";
import ProdottoDettagliato from "./components/ProdottoDettagliato";
//import Cart from './pages/Cart';
import Carrello from "./components/Carrello";
import Logout from "./components/Logout";

function App() {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(true);
  const [isLogged, setIsLoagged] = useState(false);
  const [input, setInput] = useState("");
  const [list, setList] = useState({});
  const firebaseURLProduct =
    "https://stage-app-109c7-default-rtdb.europe-west1.firebasedatabase.app/credentials.json";
  const { readFirebase } = useFirebase();

  useEffect(() => {
    updateProductsFetch();
  }, []);

  const dispatch = useDispatch();
  dispatch({ type: counterActions.START });

  const updateProductsFetch = async () => {
    const answer = await readFirebase(firebaseURLProduct);
    const risposta = [];
    for (const p in answer) {
      risposta.push({
        nome: answer[p].nome,
        cognome: answer[p].cognome,
        username: answer[p].username,
        codiceCliente: answer[p].codiceCliente,
      });
    }
    setList(risposta);
  };

  const usernameChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = list.find((user) => user.codiceCliente === input);
    const u = { ...userData };
    if (u.codiceCliente === input) {
      setIsLoagged(true);
      setIsShown(false);
      navigate("/home");
    } else {
      alert("codice errato");
    }
  };

  return (
    <Fragment>
      {!isLogged ? (
        <form onSubmit={handleSubmit}>
          {isShown && (
            <div>
              <input onChange={usernameChangeHandler} />
              <button>Login</button>
            </div>
          )}
        </form>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/prodotti" element={<Prodotti />} />
            <Route path="/dettaglio" element={<ProdottoDettagliato />} />
            <Route path="/carrello" element={<Carrello />} />
            <Route path="/" element={<Logout />} />
          </Routes>
          <Footer />
        </div>
      )}
    </Fragment>
  );
}

export default App;
