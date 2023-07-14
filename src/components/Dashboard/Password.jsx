import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Password = ({ showPassword, setShowPassword }) => {
  const basePath = process.env.REACT_APP_API_PATH;
  const token = useSelector((state) => state.users.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const updatePassword = async (data) => {
    let url = `${basePath}/api/update-password`;

    try {
      const response = await axios.post(
        url,
        { password: data.password, new_password: data.newPassword },
        config
      );
      if (response.data?.success) {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        toast.error(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="passwordForm" onSubmit={handleSubmit(updatePassword)}>
      <div className="formFieldsGroup">
        <div className="formFieldCol">
          <p className="blueFormLabel">Password</p>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: "8",
                message: "Minimum 8 characters required",
              },
            })}
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password?.message}</span>}
        </div>
        <div className="formFieldCol">
          <p className="blueFormLabel">New Password</p>
          <input
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: "8",
                message: "Minimum 8 characters required",
              },
            })}
            type="password"
            placeholder="New Password"
          />
          {errors.newPassword && (
            <span className="error">{errors.newPassword?.message}</span>
          )}
        </div>
        <div className="formFieldCol">
          <p className="blueFormLabel">Confirm Password</p>
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (val) => {
                if (watch("newPassword") != val) {
                  return "Confirm password do no match";
                }
              },
            })}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword?.message}</span>
          )}
        </div>
        <div></div>
        <div className="formFieldCol groupBox mt-8">
          <button type="submit" className="btnDark w-auto">
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="whiteShadeBtn w-auto"
          >
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default Password;
