import { Form, Link, useActionData } from "react-router-dom";
import classes from "./Login.module.css";
import { useEffect, useRef } from "react";
function Login() {
  const password = useRef();
  // sử dụng action data để lấy dữ liệu lỗi trả về
  const data = useActionData();
  console.log(data);
  // khi data lỗi được trả về thì làm rỗng lại password
  useEffect(() => {
    password.current.value = "";
  }, [data]);

  return (
    <div
      className={`${classes["bg_img"]} d-flex align-items-center justify-content-center`}
    >
      <Form
        method="post"
        className={`${classes["login_form"]} bg-white d-flex flex-column align-items-center  shadow rounded-2`}
      >
        <p className="fs-2 my-5 py-4">Sign In</p>
        <div className="px-5 mt-4">
          <input
            className="w-100 px-4 py-4"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="w-100 px-4 py-4"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            ref={password}
            required
          ></input>
          {data && <p className="m-0 mt-3 text-danger">{data.message}</p>}
          <button className="w-100 px-3 py-4 bg-dark text-white fw-bold mt-4">
            SIGN IN
          </button>
        </div>
        <p className="my-5">
          Create an account? <Link to={"/register"}>Sign up</Link>
        </p>
      </Form>
    </div>
  );
}
export default Login;
