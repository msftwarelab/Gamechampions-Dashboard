import { styled } from "~theme";

const TableWrapper = styled.div`
  flex: 10;
  overflow: ${props => (props.noScroll ? "unset" : "scroll")};
  display: flex;
`;

export default TableWrapper;
