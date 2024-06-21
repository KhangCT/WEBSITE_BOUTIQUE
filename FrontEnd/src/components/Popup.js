import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../store/Popup";
import { useNavigate } from "react-router-dom";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },

  content: {
    width: "1000px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};
function Popup() {
  // sử dụng useDispatch gọi hàm trong redux
  const dispatch = useDispatch();
  // lấy trạng thái HIDE_POPUP và SHOW_POPUP state của modal
  const modalIsOpen = useSelector((state) => state.popup.HIDE_POPUP);
  const productDetail = useSelector((state) => state.popup.SHOW_POPUP);

  let formatPrice;
  // nếu productDetail.price thì format tiền tệ theo VND
  if (productDetail.price) {
    formatPrice = productDetail?.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const navigate = useNavigate();
  // hàm đóng modal
  function closeModal() {
    dispatch(popupActions.hidePopup());
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="row">
          <div className="col">
            <img style={{ width: "100%" }} src={productDetail.img1} />
          </div>
          <div className="col">
            <p className="float-end fs-4 fw-bold" onClick={closeModal}>
              X
            </p>
            <div className="mt-4 p-3">
              <h2>{productDetail.name}</h2>
              <p className="fs-5">{formatPrice}</p>
              <p className="text-secondary">{productDetail.short_desc}</p>
            </div>
            <button
              onClick={() => {
                navigate(`/detail/${productDetail._id}`);
                closeModal();
              }}
              className="text-white border-0 bg-dark px-4 py-2 fw-bold"
            >
              <i className="fa-solid fa-cart-shopping me-1" /> View Detail
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
