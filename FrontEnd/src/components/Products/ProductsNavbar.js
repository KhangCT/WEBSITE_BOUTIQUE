import { NavLink, useSearchParams } from "react-router-dom";
import classes from "./ProductsNavbar.module.css";

function ProductsNavBar() {
  // tìm caterory trên url
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  // nếu category nào được gọi sẽ dượ active
  return (
    <ul className="mb-5">
      <li className="text-light bg-dark fw-semibold">APPLE</li>
      <li>
        <NavLink
          to={"?category=all"}
          className={` text-decoration-none ${
            category === "all" ? classes.active : undefined
          }`}
        >
          All
        </NavLink>
      </li>
      <li className="bg-body-secondary fw-semibold">iPHONE & MAC</li>
      <li className="text-secondary">
        <NavLink
          to={"?category=iphone"}
          className={` text-decoration-none ${
            category === "iphone" ? classes.active : undefined
          }`}
        >
          iPhone
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"?category=ipad"}
          className={` text-decoration-none ${
            category === "ipad" ? classes.active : undefined
          }`}
        >
          iPad
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"?category=macbook"}
          className={` text-decoration-none ${
            category === "macbook" ? classes.active : undefined
          }`}
        >
          MacBook
        </NavLink>
      </li>
      <li className="bg-body-secondary fw-semibold">WIRELESS</li>
      <li>
        <NavLink
          to={"?category=airpod"}
          className={` text-decoration-none ${
            category === "airpod" ? classes.active : undefined
          }`}
        >
          Airpod
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"?category=watch"}
          className={` text-decoration-none ${
            category === "watch" ? classes.active : undefined
          }`}
        >
          Watch
        </NavLink>
      </li>
      <li className="bg-body-secondary fw-semibold">OTHER</li>
      <li>
        <NavLink
          to={"?category=mouse"}
          className={` text-decoration-none ${
            category === "mouse" ? classes.active : undefined
          }`}
        >
          Mouse
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"?category=keyboard"}
          className={` text-decoration-none ${
            category === "keyboard" ? classes.active : undefined
          }`}
        >
          Keyboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'?category="other"'}
          className={` text-decoration-none ${
            category === "other" ? classes.active : undefined
          }`}
        >
          Other
        </NavLink>
      </li>
    </ul>
  );
}
export default ProductsNavBar;
