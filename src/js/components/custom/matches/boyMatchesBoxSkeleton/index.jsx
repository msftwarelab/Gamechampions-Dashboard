import React from "react";
import { FlexBox } from "~components/atoms";
import Thumbnail from "../match/thumbnail";
import { styled, media } from "~theme";

const BoyMatchesBoxSkeleton = () => {
  return (
    <FlexBox
      justifyContent="space-between"
      padding="14px"
      borderRadius="16px"
      margin="0 46px 24px"
      backgroundColor="#fff"
    >
      <Thumbnail className="skeleton" />
      <Wrapper>
        <FlexBox
          width={{ base: "unset", md: "16rem", lg: "24rem" }}
          flexDirection="column"
          gap="1rem"
        >
          <FlexBox width="100%">
            <FlexBox
              className="skeleton"
              width="6rem"
              height="1.5rem"
              borderRadius="0.4rem"
            />
          </FlexBox>
          <FlexBox
            className="skeleton"
            width="85%"
            height="2rem"
            borderRadius="0.4rem"
            display={{ base: "none", md: "flex" }}
          />
        </FlexBox>
        <FlexBox
          className="skeleton"
          width="6rem"
          height="1.8rem"
          margin={{ base: "0px", md: "20px 0px 0px 0px" }}
          borderRadius="0.4rem"
        />
        <FlexBox
          className="skeleton"
          width="6rem"
          height="1.8rem"
          margin={{ base: "0px", md: "20px 0px 0px 0px" }}
          borderRadius="0.4rem"
        />
        <FlexBox
          className="skeleton"
          width="6rem"
          height="1.8rem"
          margin={{ base: "0px", md: "20px 0px 0px 0px" }}
          borderRadius="0.4rem"
          display={{ base: "none", md: "flex" }}
        />
      </Wrapper>
    </FlexBox>
  );
};

const Wrapper = styled.div`
  flex-grow: 1;
  gap: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: unset;
  margin-left: 14px;
  ${media.md`
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  `};
`;

export default BoyMatchesBoxSkeleton;
