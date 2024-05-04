import React from "react";
import { styled, withTheme, media } from "~theme";
import { FlexBox, Paragraph, Thumbnail } from "~components/atoms";
import Badge from "~components/atoms/badge";
import Image from "~components/atoms/image";

const ChatTabBodyItem = ({
  id,
  userName,
  imageUrl,
  lastMessage,
  newMessages,
  theme,
  handleOpen
}) => {
  const handleClick = () =>
    handleOpen({
      friendId: id,
      friendImage: imageUrl,
      friendName: userName,
      hasUnreadMessages: !!newMessages
    });
  return (
    <FlexBox
      padding="1rem"
      justifyContent="space-evenly"
      alignItems="center"
      gap=".5rem"
      color={theme.colors.black}
      cursor="pointer"
      width="100%"
      maxWidth="60rem"
      margin="0 auto"
      hoverBackgroundColor={theme.colors.disabledColor}
      onClick={handleClick}
    >
      <Thumbnail src={imageUrl} height="40px" width="40px" />
      <TextWrapper>
        <Paragraph fontWeight="bold" showEllipsis={true}>
          {userName}
        </Paragraph>
        <Paragraph color={theme.colors.grey} showEllipsis={true}>
          {lastMessage}
        </Paragraph>
      </TextWrapper>

      {!!newMessages && <Badge number={newMessages} />}
      <Image
        height="25px"
        width="25px"
        src="/img/icons/ic_chevron_right-24px.svg"
      />
    </FlexBox>
  );
};

export default withTheme(ChatTabBodyItem);

const TextWrapper = styled.div`
  flex-grow: 1;
  overflow: hidden;

  ${media.md`
   width: 100px;
 `};
`;
