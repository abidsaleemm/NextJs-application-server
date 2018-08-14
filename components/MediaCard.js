const MediaCard = props => {
  const { children, self } = props;
  return (
    <li className="MediaCard" id={ self? "colored" : ""}>
      <style jsx>{`
        .MediaCard {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4),
            0px -1px 0px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        #colored {
          background: khaki !important;
        }
      `}</style>
      {children}
    </li>
  );
};

export default MediaCard;
