import { useAppSelector } from "../../app/store/hooks";
import { selectCurrentUser } from "./authSlice";

type Props = {};

function Welcome({}: Props) {
  const user = useAppSelector(selectCurrentUser);
  return <div>Welcome {user}</div>;
}

export default Welcome;
