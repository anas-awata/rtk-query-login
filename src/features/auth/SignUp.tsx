import React, { useState } from "react";
import { useSignUpMutation } from "./authApiSlice";
import { useAppDispatch } from "../../app/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setCredentials } from "./authSlice";
import { FiPhone, FiLock, FiEyeOff, FiEye, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

const schema = z.object({
  fullName: z.string().nonempty(),
  phone: z.string().length(9),
  password: z
    .string()
    .min(6)
    .refine(
      (password) => {
        // Regular expression to match at least one uppercase letter, one lowercase letter, one digit, and one special character
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        return passwordRegex.test(password);
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      }
    ),
});

type SignUpSchemaType = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(schema),
  });

  const [SignUp, { isLoading }] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpSchemaType) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("full_name", data.fullName);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      const userData = await SignUp(formData).unwrap();
      console.log(userData);
      dispatch(
        setCredentials({ token: userData.token, user: userData.data.user })
      );
      navigate("/");
    } catch (error) {
      // Handle SignUp error
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[480px]" style={{ direction: "rtl" }}>
      <form
        className="bg-white shadow-xl rounded px-12 pt-8 pb-10 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="py-10">
          <h2 className="font-bold text-4xl text-start mb-2 leading-10">
            أهلاً بك
          </h2>
          <h2 className="font-bold text-primary text-start text-3xl leading-8">
            إنشاء حسابك
          </h2>
        </div>
        <div className="mb-4">
          <label
            className="block text-custom-default text-base font-bold mb-2 text-start"
            htmlFor="name"
          >
            الاسم الكامل
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <FiUser className="text-gray-400" />
            </span>
            <input
              className="shadow appearance-none border rounded-lg w-full py-4 pr-10 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="أدخل الاسم هنا"
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs italic">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-custom-default text-base font-bold mb-2 text-start"
            htmlFor="phone"
          >
            رقم الهاتف المحمول
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <FiPhone className="text-gray-400 transform scale-x-[-1]" />
            </span>
            <input
              className="shadow appearance-none border rounded-lg w-full py-4 pr-10 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="000 000 000"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs italic">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-custom-default text-base font-bold mb-2 text-start"
            htmlFor="password"
          >
            كلمة المرور
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <FiLock className="text-gray-400" />
            </span>
            <input
              className="shadow appearance-none border rounded-lg w-full py-4 pr-10 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******"
              {...register("password")}
            />
            <span
              className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FiEyeOff className="text-gray-400" />
              ) : (
                <FiEye className="text-gray-400" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center flex-col">
          <button
            className="bg-primary hover:bg-primary-600 w-full text-white font-bold p-4 rounded-lg focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            <div className="flex items-center justify-center gap-2">
              <p>إنشاء حساب</p>
              {isLoading && <Loading />}
            </div>
          </button>
          <div className="flex flex-row gap-2 p-3">
            <p className="text-sm font-bold">لديك حساب مسبقاً ؟</p>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-600"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
