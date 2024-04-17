import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/store/hooks";
import { selectCurrentToken } from "./authSlice";

type Props = {};

function RequireAuth({}: Props) {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
