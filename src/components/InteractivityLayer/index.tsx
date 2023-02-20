const InteractivityLayer: React.FC<
  React.PropsWithChildren<{ addChild?: () => void }>
> = ({ addChild, children }) => {
  return <div onClick={addChild}>{children}</div>;
};

export default InteractivityLayer;
