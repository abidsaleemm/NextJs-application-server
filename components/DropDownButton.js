import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// TODO should this be in another location?
export default ({ keyValue, items, defaultItem, onItemSelected }) => (
  <UncontrolledDropdown>
    <style jsx>
      {`
        .renderOption {
          display: flex;
          background: green;
          justify-content: space-between;
          cursor: pointer;
        }
      `}
    </style>
    <DropdownToggle caret>{defaultItem}</DropdownToggle>
    <DropdownMenu>
      {
        items.map((item, index) => (
          <DropdownItem key={keyValue + index} onClick={ () => onItemSelected(item)}>
            {item}
          </DropdownItem>
        ))
      }   
    </DropdownMenu>
  </UncontrolledDropdown>
);
