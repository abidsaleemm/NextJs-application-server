const ActionGroup = props => {
  return (
    <div className={props.shown ? "ActionGroup" : "ActionGroup Hidden"}>
      <style jsx>{`
        .ActionGroup {
          display: flex;
          padding-right: 10px;
        }
        .ActionGroup * {
          margin-right: 5px;
        }
        .ActionGroup *:last-child {
          margin-right: 0;
        }
        .Hidden {
          visibility: hidden;
        }
      `}</style>
      {props.children}
    </div>
  );
};

export default ActionGroup;
