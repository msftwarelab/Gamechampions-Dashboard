import React from "react";
import { InlineShareButtons } from "sharethis-reactjs";
import { styled, media } from "~theme";

export const ShareThisLinks = ({
  url,
  image,
  description,
  title,
  buttonSize,
  buttonMargin
}) => {
  return (
    <InlineShareButtonsWrapper
      buttonSize={buttonSize}
      buttonMargin={buttonMargin}
    >
      <InlineShareButtons
        config={{
          alignment: "center", // alignment of buttons (left, center, right)
          color: "social", // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 0, // font size for the buttons
          labels: "cta", // button labels (cta, counts, null)
          language: "en", // which language to use (see LANGUAGES)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            "whatsapp",
            "linkedin",
            "messenger",
            "facebook",
            "twitter"
          ],
          padding: 0, // padding within buttons (INTEGER)
          radius: "50%", // the corner radius on each button (INTEGER)
          show_total: false,
          size: buttonSize || 30, // the size of each button (INTEGER)

          // OPTIONAL PARAMETERS
          url: url, // (defaults to current url)
          image: image, // (defaults to og:image or twitter:image)
          description: description, // (defaults to og:description or twitter:description)
          title: title // (defaults to og:title or twitter:title)
          // message: "custom email text", // (only for email sharing)
          // subject: "custom email subject", // (only for email sharing)
          // username: "custom twitter handle" // (only for twitter sharing)
        }}
      />
    </InlineShareButtonsWrapper>
  );
};

const InlineShareButtonsWrapper = styled.div`
  .st-label {
    display: none !important;
  }

  .st-btn {
    min-width: unset !important;
    margin: ${({ buttonMargin }) =>
      buttonMargin ? `${buttonMargin} !important` : `0 0.75rem !important;`};
    width: ${({ buttonSize }) =>
      buttonSize ? `${buttonSize}px !important` : `30px !important;`};
    height: ${({ buttonSize }) =>
      buttonSize ? `${buttonSize}px !important` : `30px !important;`};

    ${media.md`
      margin: 0 1.5rem 0 0 !important;
  `};
  }
`;
