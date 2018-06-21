export default props => (
  <div className="mediaCardHeader">
    <style jsx>
      {`
  .mediaCardHeader {
    font-size: 14px;
    color: #898989;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bakground: white;
    box-shadow: 0px 1px 2px rgba(0,0,0,.4), 0px -1px 0px rgba(0,0,0,.1);
    padding: 10px 20px;
    margin-bottom: 3px;`}
    </style>
    {props.children}
  </div>
);
