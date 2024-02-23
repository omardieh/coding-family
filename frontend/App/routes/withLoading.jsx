import { useAuthContext } from "../contexts/AuthContext";
import Loading from "/features/Loading";

export default function withLoading(ChildComponent) {
  return (props) => {
    const { isLoading } = useAuthContext();
    if (isLoading) {
      return <Loading />;
    }
    return <ChildComponent {...props} />;
  };
}
