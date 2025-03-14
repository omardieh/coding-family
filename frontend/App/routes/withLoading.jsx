import { useAuthContext } from "/features/Auth/context";
import { LoadingSpinner } from "/common/components";

export default function withLoading(ChildComponent) {
  return (props) => {
    const { isLoading } = useAuthContext();
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <ChildComponent {...props} />;
  };
}
