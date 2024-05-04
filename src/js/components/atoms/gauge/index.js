import React, { useEffect, useRef } from "react";
import SvgGauge from "svg-gauge";
import { styled, withTheme } from "~theme";
import { SpaceStyle, SizeStyle, TypographyStyle } from "~components/styles";

const defaultOptions = {
  animDuration: 1,
  showValue: true,
  initialValue: 0,
  max: 100,
  dialStartAngle: 270,
  dialEndAngle: 265
  // Put any other defaults you want. e.g. dialStartAngle, dialEndAngle, radius, etc.
};
const Gauge = props => {
  const gaugeEl = useRef(null);
  const gaugeRef = useRef(null);
  const { theme, margin } = props;
  const { gaugeTheme } = theme;

  useEffect(() => {
    if (!gaugeRef.current) {
      const options = { ...defaultOptions, ...props };
      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current.setValue(options.initialValue);
    }
    gaugeRef.current.setValueAnimated(props.value, 1);
  }, [props]);

  return (
    <GaugeStyle
      {...gaugeTheme}
      margin={margin || gaugeTheme.margin}
      className={props.className}
      ref={gaugeEl}
    />
  );
};

const GaugeStyle = styled.div`
  ${SpaceStyle};
  ${SizeStyle};

  .match-gauge__dial {
    stroke-width: 5;
  }

  .match-gauge__valueDial {
    stroke-width: 8;
    stroke: #eb8e25;
  }

  .match-gauge__label {
    ${TypographyStyle};
    alignment-baseline: central;
  }
`;

export default withTheme(Gauge);
