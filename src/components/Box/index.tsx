import { useEffect, useState } from "react";

type ParentChild = (props: {
  addRight?: (node: React.ReactNode) => void;
}) => React.ReactNode;

const Box: React.FC<{ children?: ParentChild | ParentChild[] }> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);

  const insertNode: (index: number) => (node: React.ReactNode) => void =
    (index) => (node) =>
      setNodes((current) => {
        const start = current.slice(0, index);
        const end = current.slice(index);
        return start.concat(node).concat(end);
      });

  // Temporary
  useEffect(() => {
    setNodes([childTitle({ addRight: insertNode(0) })]);
  }, []);

  return <div>{nodes}</div>;
};

const childTitle: ParentChild = ({ addRight }: Parameters<ParentChild>[0]) => {
  return (
    <h1>
      {"Title"}
      {addRight ? " Can add right" : ""}
    </h1>
  );
};

export default Box;
