import { useState } from "react";
import Text from "../Text";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

const Box: React.FC = () => {
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);

  const insertNode: (index: number) => (node: React.ReactNode) => void =
    (index) => (node) =>
      setNodes((current) => {
        const start = current.slice(0, index);
        const end = current.slice(index);
        return start.concat(node).concat(end);
      });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button onClick={() => insertNode(0)(<Text />)}>{"Add Text"}</button>
      <button onClick={() => insertNode(0)(<Box />)}>{"Add Box"}</button>
      {nodes}
    </div>
  );
};

const childTitle: ParentChild = ({ addRight }: Parameters<ParentChild>[0]) => {
  return <h1>{addRight ? "Can add right" : "Cant add right"}</h1>;
};

export default Box;
