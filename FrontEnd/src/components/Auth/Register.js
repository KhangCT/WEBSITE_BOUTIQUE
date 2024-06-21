import { Form, Link, useActionData } from "react-router-dom";
import classes from "./Register.module.css";
function Register() {
  // sử dụng useActionData để lấy dữ liệu lỗi đã lấy từ API
  const data = useActionData();
  console.log(data?.message);
  return (
    <div
      className={`${classes["bg_img"]} d-flex align-items-center justify-content-center`}
    >
      <Form
        method="post"
        className={`${classes["register_form"]} bg-white d-flex flex-column align-items-center  shadow rounded-2`}
      >
        <p className="fs-2 my-5 py-4">Sign Up</p>
        <div className="px-5 mt-4">
          <input
            className="w-100 px-4 py-4"
            placeholder="Full Name"
            id="fullName"
            name="fullName"
            type="text"
            required
          />
          <input
            className="w-100 px-4 py-4"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            required
          />
          <input
            className="w-100 px-4 py-4"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
          />
          <input
            className="w-100 px-4 py-4"
            placeholder="Phone"
            id="phone"
            name="phone"
            type="phone"
          />
          {data && <p className="m-0 mt-3 text-danger">{data.message}</p>}
          <button className="w-100 px-3 py-4 bg-dark text-white fw-bold mt-4">
            SIGN UP
          </button>
        </div>
        <p className="my-5">
          Already have an account? <Link to={"/login"}>Sign In</Link>
        </p>
      </Form>
    </div>
  );
}
export default Register;
