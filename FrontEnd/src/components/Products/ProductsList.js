import { useLoaderData } from "react-router-dom";
import classes from "./ProductsList.module.css";
import ProductsItem from "./ProductItem";
function ProductsList() {
  // products lấy danh sách ản phẩm lấy từ api
  const products = useLoaderData();
  // productItem thêm 1 trường tên popup là true để hiển thị popup
  return (
    <div className="my-5 py-3">
      <p className="text-secondary mb-2"> MADE THE HARD WAY</p>
      <h3 className="fs-4 pb-4">TOP TRENDING PRODUCTS</h3>
      <div className={classes.products}>
        {products.map((product) => (
          <ProductsItem product={product} key={product._id} popup={true} />
        ))}
      </div>
    </div>
  );
}
export default ProductsList;
