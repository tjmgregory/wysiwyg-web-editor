import Block from "./Block";
import Box from "../components/Block/Box";
import Text from "../components/Block/Text";

const blockToComponent: Record<Block, React.FC> = {
  [Block.Box]: Box,
  [Block.Text]: Text,
};

export default blockToComponent;
