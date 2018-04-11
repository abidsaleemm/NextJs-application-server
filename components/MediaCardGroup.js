const MediaCardGroup = props => {
  return (
    <ul className="MediaCardGroup">
      <style jsx>{`
        .MediaCardGroup {
          list-style: none;
          margin: 0;
          overflow: auto;
          padding: 0;
        }
      `}</style>
      {props.children}
    </ul>
  );
};

export default MediaCardGroup;
