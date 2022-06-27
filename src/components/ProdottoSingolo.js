import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import useCart from "../hooks/use-cart";
import { Prodotto } from '../model/ProductClass';

const Singolo = (prop) => {
  const storageKey = "user-cart";
  const storageKey2 = "user-cart-count";

  const addToCartHandler = (product) => {
    console.log("aggiunto al localStorage:" + product);
    if (!localStorage.getItem(storageKey2)) {
/*       console.log("COUNT " + localStorage.getItem(storageKey));
 */      localStorage.setItem(storageKey2, 1);
    } else {
      const prev = parseInt(localStorage.getItem(storageKey2)) + 1;
      localStorage.setItem(storageKey2, prev);
    }

    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, product);
    } else {
      const storageCart = [localStorage.getItem(storageKey), product];
      localStorage.setItem(storageKey, storageCart);
    }

/*     console.log("aggiunto al localStorage:" + JSON.stringify(product));
 */  };

  const { id, nome, categoria, descrizioneB, descrizioneD, img, quantità, prezzo } =
    prop.prodotto;

  const { addToCart } = useCart();
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
              addToCartHandler(new Prodotto(id, nome, categoria, descrizioneB, descrizioneD, img, quantità, prezzo));
              console.log("Singolo add : " + prop.prodotto);
              /*  addToCart(prop.prodotto); */
            }}
          >
            Add to cart
          </Button>
          </div>
        </div>
        <div class="col">
          <div className="card text-end">
            <NavLink ClassName="card text-end" to="/ProdottoDettagliato">
              Dettagli
            </NavLink>



            <div className="card_text-end">
              <NavLink to="/">Vai ai dettagli ⇢</NavLink>
            </div>


          </div>
<<<<<<< HEAD
          
          </div>


          </div>
          </div>
          
     
     
    
=======
        </div>

      </div>
    </div>
>>>>>>> 18e5093747ceb743ac29889edfdc878cd2b37d77
  );
} ;


export default Singolo;
