import { Link, useNavigate } from "react-router-dom";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { popupActions } from "../../store/Popup";
import { cartActions } from "../../store/cart";

function ProductsItem(props) {
  // format tiền theo VND
  const formatPrice = props.product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // dispatch họi hàm trong redux
  const dispatch = useDispatch();
  // navigate chuyển trang
  const navigate = useNavigate();

  // hàm show popup
  const showPopup = () => {
    dispatch(popupActions.showPopup(props.product));
  };
  // hàm chuyển sang trang DetailPage
  const showDetailPage = () => {
    navigate(`/detail/${props.product._id}`);
  };

  // nếu props.popup bằng true sẽ show Popup
  // còn không thì chuyển vào trang PageDetails

  return (
    <div
      onClick={props.popup ? showPopup : showDetailPage}
      className={`text-center text-black ${classes.animation}`}
    >
      <img style={{ width: "100%" }} alt="" src={props.product.img1}></img>

      <h5 className="fs-5 py-2">{props.product.name}</h5>

      <p>{formatPrice} VND</p>
    </div>
  );
}

export default ProductsItem;
