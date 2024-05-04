import React from "react";
import { getParameterByName } from "../../../../util/util";
import { Button } from "~components/atoms";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";

const PaginationButton = ({
  pageNumber,
  isDisabled,
  text,
  onClick,
  pageSize,
  params = []
}) => {
  let url = `?${PAGE_QUERY_PARAM_NAME}=${pageNumber}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`;
  for (let param of params) {
    url += `&${param}=${getParameterByName(param, location.search)}`;
  }
  return (
    <Button
      to={url}
      isDisabled={isDisabled}
      onClick={onClick}
      title={text}
      margin={{
        base: "0 2px 0 0",
        md: "0 0.5rem 0 0"
      }}
    >
      {text}
    </Button>
  );
};

export default PaginationButton;
