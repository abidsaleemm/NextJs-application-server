const MediaCardContent = props => {
  return (
    <div className="MediaCardContent">
      <style jsx>{`
        .MediaCardContent {
          flex: 1 100%;
          text-align: center;
        }
      `}</style>
      {props.children}
    </div>
  );
};

export default MediaCardContent;
