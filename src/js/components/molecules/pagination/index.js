import React from "react";
import { styled, withTheme } from "~theme";
import { DisplayStyle, SpaceStyle, FlexBoxStyle } from "~components/styles";
import { Span, Section } from "~components/atoms";
import PaginationButton from "./paginationButton";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import { useTranslation } from "react-i18next";

const Pagination = ({ pagination, onChangePageClick, params, theme }) => {
  console.log("===========> pagination: ", pagination);

  const { t } = useTranslation();
  const page = parseInt(pagination && pagination.get(PAGE_QUERY_PARAM_NAME));
  const pageSize = parseInt(
    pagination && pagination.get(PAGE_SIZE_QUERY_PARAM_NAME)
  );
  const pageCount = parseInt(pagination && pagination.get("pageCount"));

  const { paginationTheme = {} } = theme;
  const { rootTheme = {} } = paginationTheme;

  return (
    <>
      {pageCount > 1 && (
        <PaginationStyle {...rootTheme}>
          <Span margin="0.5rem">
            Page {page} of {pageCount}
          </Span>
          <Section>
            <PaginationButton
              params={params}
              pageNumber={1}
              isDisabled={page === 1}
              text={t("PaginationFirstButtonLabel")}
              onClick={onChangePageClick}
              pageSize={pageSize}
            />
            <PaginationButton
              params={params}
              pageNumber={page - 1}
              isDisabled={page === 1}
              text={t("PaginationPrevButtonLabel")}
              onClick={onChangePageClick}
              pageSize={pageSize}
            />
            <PaginationButton
              params={params}
              pageNumber={page + 1}
              isDisabled={page === pageCount}
              text={t("PaginationNextButtonLabel")}
              onClick={onChangePageClick}
              pageSize={pageSize}
            />
            <PaginationButton
              params={params}
              pageNumber={pageCount}
              isDisabled={page === pageCount}
              text={t("PaginationLastButtonLabel")}
              onClick={onChangePageClick}
              pageSize={pageSize}
            />
          </Section>
        </PaginationStyle>
      )}
    </>
  );
};

const PaginationStyle = styled.div`
  ${FlexBoxStyle};
  ${SpaceStyle};
  ${DisplayStyle};
`;

export default withTheme(Pagination);
