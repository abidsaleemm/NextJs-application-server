const MediaCard = props => {
  return (
    <li className="MediaCard">
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
      `}</style>
      {props.children}
    </li>
  );
};

export default MediaCard;
