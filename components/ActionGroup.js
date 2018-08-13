const ActionGroup = props => {
  return (
    <div className={props.shown ? "ActionGroup" : "ActionGroup Hidden"}>
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
        .Hidden {
          display: none;
        }
      `}</style>
      {props.children}
    </div>
  );
};

export default ActionGroup;
