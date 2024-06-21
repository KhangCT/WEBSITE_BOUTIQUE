import classes from "./CategoryLists.module.css";
import product1 from "../../imgs/product_1.png";
import product2 from "../../imgs/product_2.png";
import product3 from "../../imgs/product_3.png";
import product4 from "../../imgs/product_4.png";
import product5 from "../../imgs/product_5.png";
import { useNavigate } from "react-router-dom";
function CategoryLists() {
  // useNavigate để chuyển trang
  const navigation = useNavigate();

  return (
    <div className="d-flex flex-column my-5">
      <p className="align-self-center mb-1 text-secondary">
        CAREFULLY CREATED COLLECTIONS
      </p>
      <h2 className="align-self-center fs-4 mb-4">BROWSE OUR CATEGORIES</h2>
      <div>
        <div className="row">
          <img
            className={`col ${classes.animation}`}
            alt="iphone category"
            onClick={() => {
              navigation("./shop?category=iphone");
            }}
            src={product1}
          ></img>

          <img
            className={`col ${classes.animation}`}
            alt="Mac category"
            src={product2}
            onClick={() => {
              navigation("./shop?category=macbook");
            }}
          ></img>
        </div>
        <div className="row pt-4">
          <img
            className={`col ${classes.animation}`}
            alt="Ipad category"
            src={product3}
            onClick={() => {
              navigation("./shop?category=ipad");
            }}
          ></img>

          <img
            className={`col ${classes.animation}`}
            alt="Watch category"
            src={product4}
            onClick={() => {
              navigation("./shop?category=watch");
            }}
          ></img>

          <img
            className={`col ${classes.animation}`}
            src={product5}
            alt="Airpods category"
            onClick={() => {
              navigation("./shop?category=airpod");
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default CategoryLists;
