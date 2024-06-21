import { Fragment, useEffect, useState } from "react";
import ProductsItem from "./ProductItem";
import { cartActions } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";

function ProductDetail(props) {
  // state lưu hình ảnh được hiển thị
  const [img, setImg] = useState(props.product.img1);
  // 1 state lưu số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);
  // format tiền theo VND
  const formatPrice = props.product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // sử dụng dispatch để gọi hàm trong redux
  const dispatch = useDispatch();

  // hàm tăng số lượng sản phẩm
  const addQuantityHandler = () => {
    setQuantity(quantity + 1);
  };
  // hàm giảm số lượng sản phẩm
  const removeQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // hàm thêm sản phẩm vào giỏ hàng
  const addCartHandler = () => {
    dispatch(
      cartActions.ADD_CART({
        id: props.product._id,
        price: Number(props.product.price),
        name: props.product.name,
        img: props.product.img1,
        quantity: quantity,
      })
    );
  };
  // khi click vào ảnh nhỏ thì set lại ảnh lớn
  const imgHandler = (e) => {
    setImg(e.target.src);
  };
  useEffect(() => {
    setImg(props.product.img1);
  }, [props.product]);
  return (
    <Fragment>
      <div className="row g-5 my-4">
        <div className="col-6">
          <div className="row">
            <div className="col-2">
              <div className="row g-5 ">
                <img
                  onClick={imgHandler}
                  className="col"
                  src={props.product.img1}
                ></img>
                <img
                  onClick={imgHandler}
                  className="col"
                  src={props.product.img2}
                ></img>
                <img
                  onClick={imgHandler}
                  className="col"
                  src={props.product.img3}
                ></img>
                <img
                  onClick={imgHandler}
                  className="col"
                  src={props.product.img4}
                ></img>
              </div>
            </div>
            <div className="col-9 d-flex align-items-center">
              <img style={{ width: "100%" }} src={img}></img>
            </div>
          </div>
        </div>
        <div className="col-6">
          <h1>{props.product.name}</h1>
          <p className="fs-4 my-4 py-1 fw-lighter">{formatPrice} VND</p>
          <p className="text-secondary">{props.product.short_desc}</p>
          <p className="text-secondary my-4">
            <strong className="text-dark"> CATEGORY: </strong>
            {props.product.category}
          </p>
          <div className=" d-flex ">
            <div className="border d-flex align-items-center">
              <p className="text-body-tertiary m-0 px-3 py-2 me-4 ">QUANTITY</p>
              <i
                className="fa-solid fa-caret-left  mx-2"
                onClick={removeQuantityHandler}
              />
              <p className="m-0 fs-5 fw-normal fst-normal">{quantity}</p>
              <i
                className="fa-solid fa-caret-right mx-2 pe-3"
                onClick={addQuantityHandler}
              />
            </div>
            <button
              className="bg-dark text-white fs-6 px-4 border-0 fw-semibold"
              onClick={addCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dark text-white d-inline-block px-4 py-3 mt-5">
        DESCRIPTION
      </div>
      <h5 className="mt-4">PRODUCT DESCRIPTION</h5>
      <p className="text-secondary mt-4">{props.product.long_desc}</p>
      <h5 className="mt-5">RELATED PRODUCT</h5>
      <div className="row my-4">
        {props.products.map((product) => (
          <div key={product._id} className="col-3">
            <ProductsItem product={product} />
          </div>
        ))}
      </div>
    </Fragment>
  );
}
export default ProductDetail;
