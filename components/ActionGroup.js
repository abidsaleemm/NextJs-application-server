const ActionGroup = props => {
  return (
    <div className="ActionGroup">
      <style jsx>{`
        .ActionGroup {
          display: flex;
        }
        .ActionGroup * {
          margin-right: 5px;
        }
        .ActionGroup *:last-child {
          margin-right: 0;
        }
      `}</style>
      {props.children}
    </div>
  );
};

export default ActionGroup;
