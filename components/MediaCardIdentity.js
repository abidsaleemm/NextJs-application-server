const MediaCardIdentity = props => {
  return (
    <div className="MediaCardIdentity">
      <style jsx>{`
        .MediaCardIdentity {
          flex: 1 300px;
        }
      `}</style>
      {props.children}
    </div>
  );
};

export default MediaCardIdentity;
