import { styled, withTheme } from "~theme";
import React from "react";
import { Paragraph, Image } from "..";
import {
  DisplayStyle,
  SpaceStyle,
  FlexBoxStyle,
  SizeStyle
} from "~components/styles";

class Loader extends React.Component {
  renderLoader() {
    const { color, scale, spinner, text, theme } = this.props;
    const { loaderTheme } = theme;
    const { defaultSpinnerTheme } = loaderTheme;

    if (text) {
      return <Paragraph>{text}</Paragraph>;
    }

    if (spinner) {
      return <Image src={spinner} />;
    }

    return (
      <svg
        width={scale || defaultSpinnerTheme.scale}
        height={scale || defaultSpinnerTheme.scale}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="loader"
      >
        <circle cx="30" cy="50" fill="#00143c" r="20">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;0.5;1"
            values="30;70;30"
            begin="-0.5s"
          ></animate>
        </circle>
        <circle cx="70" cy="50" fill="#75f13f" r="20">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;0.5;1"
            values="30;70;30"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="30" cy="50" fill="#00143c" r="20">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;0.5;1"
            values="30;70;30"
            begin="-0.5s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            values="0;0;1;1"
            calcMode="discrete"
            keyTimes="0;0.499;0.5;1"
            dur="1s"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
    );
  }

  render() {
    const { isLoading, margin, height, alignItems, theme } = this.props;
    const { loaderTheme = {} } = theme;
    const { rootTheme = {} } = loaderTheme;

    return (
      <LoaderStyle
        {...rootTheme}
        margin={margin}
        height={height}
        alignItems={alignItems}
        display={isLoading ? "flex" : "none"}
      >
        {this.renderLoader()}
      </LoaderStyle>
    );
  }
}

const LoaderStyle = styled.div`
  ${DisplayStyle};
  ${SpaceStyle};
  ${SizeStyle};
  ${FlexBoxStyle};
`;

export default withTheme(Loader);
