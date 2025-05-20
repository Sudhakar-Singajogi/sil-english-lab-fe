import { useSelector } from "react-redux";
import { isFeatureAllowed } from "../utils/helper";

const useACL = () => {
  const role = useSelector((state) => state.auth.role);
  const allowedFeatures = useSelector(
    (state) => state?.auth?.lacInfo?.allowedFeatures || []
  ); 
  const featureAllowed = (feature) => {
    return isFeatureAllowed({ role, feature, allowedFeatures });
  };
  return {
    featureAllowed
  }
};

export default useACL;