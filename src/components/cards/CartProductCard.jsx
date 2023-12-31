import { useState } from "react";

import imagePlaceholder from "../../assets/img/image-placeholder.jpg";
import styles from "./CartProductCard.module.css";
import WarningModal from "../modals/WarningModal";

export default function CartProductCard(props) {
  const {
    product: { productName, imageUrl, markedPrice, sellingPrice, quantity },
    product,
    deleteProduct,
    updateProduct,
  } = props;
  const [count, setCount] = useState(quantity);

  const discount = Math.floor(
    ((markedPrice - sellingPrice) * 100.0) / markedPrice
  );

  return (
    <div className={styles.card}>
      <div>
        <img
          src={imageUrl || imagePlaceholder}
          alt="product"
          height="150px"
          width="100px"
        />
      </div>
      <div className={styles.details}>
        <h5 className="ovf-ellipse">{productName}</h5>
        {discount === 0 ? (
          <div className={styles.price}>
            <span className={styles.main}>
            S/{(sellingPrice * count).toLocaleString()}
            </span>
          </div>
        ) : (
          <div className={styles.price}>
            <span className={styles.main}>
            S/{(sellingPrice * count).toLocaleString()}
            </span>
            <span className={styles.original}>
              {" "}
              S/{(markedPrice * count).toLocaleString()}
            </span>
            <span className={styles.discount}>{discount}% off</span>
          </div>
        )}
      </div>
      <div>
        <Controls
          values={{ product, count }}
          methods={{ deleteProduct, updateProduct, setCount }}
        />
      </div>
    </div>
  );
}

function Controls(props) {
  const { product, count } = props.values;
  const { deleteProduct, updateProduct, setCount } = props.methods;
  const [isOpen, setIsOpen] = useState(false);

  const increment = () => {
    updateProduct({ ...product, quantity: count + 1 });
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (count > 1) {
      updateProduct({ ...product, quantity: count - 1 });
      setCount((prev) => prev - 1);
    }
  };
  const remove = () => {
    deleteProduct(product);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles["box-counter"]}>
        <button className={styles["btn-counter"]} onClick={decrement}>
          -
        </button>
        <span className={styles["text-counter"]}>{count}</span>
        <button className={styles["btn-counter"]} onClick={increment}>
          +
        </button>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className={styles["btn-remove"] + " btn btn-dark"}
      >
        QUITAR
      </button>
      <WarningModal
        isOpen={isOpen}
        message="Seguro que quieres quitarlo?"
        onConfirm={remove}
        onCancel={() => setIsOpen(false)}
        title="Quitar del carro"
      />
    </>
  );
}
