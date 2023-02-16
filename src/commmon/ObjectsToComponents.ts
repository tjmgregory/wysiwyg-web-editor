import Objects from "./Objects";
import Box from "../components/Objects/Box";
import Text from "../components/Objects/Text";

const objectsToComponents: Record<Objects, React.FC> = {
  [Objects.Box]: Box,
  [Objects.Text]: Text,
};

export default objectsToComponents;
