const IconButton = props => {
  const { children, ...otherProps } = props;
  return (
    <div className="IconButton" { ...otherProps } >
      <style jsx>{`
        .IconButton {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 900px;
          height: 35px;
          margin-right: 60px;
          color: #3e3e3e;
        }
        .IconButton:hover {
          background: #e5e5e5;
          cursor: pointer;
        }
        .IconButton * {
          display: block;
        }
      `}</style>
      {children}
    </div>
  );
};

export default IconButton;
