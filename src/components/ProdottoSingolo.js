import { Link } from "react-router-dom";
import Button from "../components/Button";
import useCart from "../hooks/use-cart";
import { Prodotto } from '../model/ProductClass';

const Singolo = (prop) => {
  const navigate = useNavigate();
  const storageKey = "user-cart";
  const storageKey2 = "user-cart-count";

  const addToCartHandler = (product) => {
    console.log("class prodotto: " + product);

    console.log("aggiunto al localStorage:" + product);
    if (!localStorage.getItem(storageKey2)) {
/*       console.log("COUNT " + localStorage.getItem(storageKey));
 */      localStorage.setItem(storageKey2, 1);
    } else {
      const prev = parseInt(localStorage.getItem(storageKey2)) + 1;
      localStorage.setItem(storageKey2, prev);
    }

    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(product));
    } else {
      const storageCart = [localStorage.getItem(storageKey), JSON.stringify(product)];
      localStorage.setItem(storageKey, storageCart);
    }

/*     console.log("aggiunto al localStorage:" + JSON.stringify(product));
 */  };

  const { id, nome, categoria, descrizioneB, descrizioneD, img, quantità, prezzo } =
    prop.prodotto;
  const p = new Prodotto(id, nome, categoria, descrizioneB, descrizioneD, img, quantità, prezzo);

  const { addToCart } = useCart();

  const detailHandler = () => {
    const storageKey3 = "user-cart-detail";
    localStorage.setItem(storageKey3, JSON.stringify(prop.prodotto));
  }
  return (
    <div className="container">
      <div className="card">
        <div className="row align-items-center">
          <div className="col-md-4 float-start">
            <img src={`${img}`} className="img-thumbnail" alt="..." />
          </div>
          <div className="col">
            <div className="card-body">
              <h5 className="card-title">
                {nome} - {categoria}
              </h5>
              <p className="card-text">{descrizioneB}</p>
              <p className="Prezzo">{prezzo} € </p>
            </div>
          </div>
          <div className="col"><Button
            onClick={() => {
              addToCart(prop.prodotto);
              addToCartHandler(prop.prodotto);//new Prodotto(id, nome, categoria, descrizioneB, descrizioneD, img, quantità, prezzo)
              console.log("Singolo add : " + prop.prodotto);
              /*  addToCart(prop.prodotto); */
            }}
          >
            Add to cart
          </Button>
          </div>
          
        </div>
<<<<<<< HEAD
        <div class="col">
          <div className="card_text-end">
            {/* <NavLink ClassName="card text-end" to="/ProdottoDettagliato/" >
              Dettagli
            </NavLink> */}
            {/* <button onClick={() => {
              navigate ("/ProdottoDettagliato/" + prop.id)
            } }> Dettagli </button> */}

<Link  to={"/ProdottoDettagliato/" + prop.id}>
        Go to details
      </Link>



          </div>
=======
        <div className="col">
            <div className="card_text-end">
              <Link to="/dettaglio" onClick={detailHandler}>Vai ai dettagli ⇢</Link>
            </div>
>>>>>>> da778a550e6d0cd9468b5aeeb9158a0d44e18c60
        </div>

      </div>
    </div>
  );
} ;


export default Singolo;
