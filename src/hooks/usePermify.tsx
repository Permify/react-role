import { useContext } from "react";
import PermifyContext from "../PermifyContext";

const usePermify = () => useContext(PermifyContext);

export default usePermify;