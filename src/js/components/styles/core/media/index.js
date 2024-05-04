import { css, media } from "~theme";
// todo: improve this component so we dont create all of the medias but just the required one
export const getMediaStyle = ({ cssName, value }) => {
  if (!value) {
    return;
  }

  if (value && value instanceof Object && value.base) {
    return css`
      ${cssName}: ${value.base};
      ${media.md`
        ${cssName}: ${value.md};
      `};
      ${media.lg`
        ${cssName}: ${value.lg};
      `};
      ${media.xl`
        ${cssName}: ${value.xl};
      `};
    `;
  } else if (
    value &&
    (typeof value === "string" || typeof value === "number")
  ) {
    // TODO: once the POC is done, we should only support Object type
    return css`
      ${cssName}: ${value};
    `;
  } else {
    console.error(
      `${cssName} must have supported value type (Object, String)`,
      value
    );
  }
};
