"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const Auth = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API;

  const [loading, setLoading] = useState(false);

  /* ================== FORM ================== */
  const initialValues = {
    email: "",
    password: "",
  };

  const loginValidation = Yup.object({
    email: Yup.string().required("البريد الإلكتروني مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  /* ================== AXIOS INSTANCE ================== */
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL,
    });
  }, [baseURL]);


  /* ================== INTERCEPTORS ================== */
  useEffect(() => {
    // ===== Request Interceptor =====
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get("accessToken");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // ===== Response Interceptor =====
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) return Promise.reject(error);

        // منع loop refresh
        if (originalRequest.url?.includes("/auth/refresh")) {
          logout();
          return Promise.reject(error);
        }

        if (
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const refreshToken = Cookies.get("refreshToken");

          if (!refreshToken) {
            logout();
            return Promise.reject(error);
          }

          try {
            // 💥 refresh request (BODY + correct API format)
            const { data } = await axiosInstance.post(
              "/auth/refresh",
              {
                refreshToken,
              }
            );

            // 💥 دعم كل أشكال الـ response
            const newAccessToken =
              data?.data?.accessToken || data?.accessToken;

            const newRefreshToken =
              data?.data?.refreshToken || data?.refreshToken;

            if (!newAccessToken) {
              throw new Error("Refresh failed: no access token");
            }

            // 💥 update cookies
            Cookies.set("accessToken", newAccessToken);

            if (newRefreshToken) {
              Cookies.set("refreshToken", newRefreshToken);
            }

            // 💥 update axios default header
            axiosInstance.defaults.headers.Authorization =
              `Bearer ${newAccessToken}`;

            // 💥 retry original request
            originalRequest.headers.Authorization =
              `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  /* ================== LOGIN ================== */
  const getProfile = async ()=>{
  try {
    const {data}= await axios.get(`${baseURL}/auth/me`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
const {data:profile}=useQuery({
queryKey:["profile"],
  queryFn:getProfile
})
  const loginRequest = async (values) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(
        "/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } finally {
      setLoading(false);
    }
  };
const profileQuery=useQueryClient()
  const handleLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginRequest,

    onSuccess: (data) => {
      toast.success("تم تسجيل الدخول بنجاح");
profileQuery.invalidateQueries(["profile"])
      const accessToken = data?.data?.accessToken;

      Cookies.set("accessToken", accessToken);

      const role = data?.data?.user?.role;
Cookies.set("role", role);
      if (role === "admin") {
        router.push("/Admin");
      } else if (role === "b2c") {
        router.push("/Client");
      }else if (role === "b2b") {
        router.push("/Agents");
      }
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "فشل تسجيل الدخول"
      );
    },
  });

  const handleLoginFun = (values, helpers) => {
    handleLoginMutation.mutate(values, {
      onSettled: () => helpers?.setSubmitting(false),
    });
  };
// ================== PROFILE ==================


// ================== LOGOUT ==================
const handleLogout = () => {
  try {
    const {data}= axios.post(`${baseURL}/auth/logout`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}
const handleLogoutMutation = useMutation({
  mutationKey:["logout"],
  mutationFn:handleLogout,
  onSuccess:(data)=>{
    toast.success(data?.message || "تم تسجيل الخروج بنجاح");
    Cookies.remove("accessToken");
    Cookies.remove("role");
    router.push("/");
  },onError:(err)=>{
    toast.error(err?.response?.data?.message || "فشل تسجيل الخروج")
  }
})
const handleLogoutFun=()=>{
  handleLogoutMutation.mutate()
}

  /* ================== CONTEXT ================== */
  return (
    <Auth.Provider
      value={{
        handleLoginFun,
        loginValidation,
        initialValues,
        loading,
        axiosInstance,
        profile,
        handleLogoutFun
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;