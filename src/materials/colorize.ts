import type { ShaderCallNodeInternal } from "three/src/nodes/TSL.js";
import {
  clamp,
  color,
  float,
  Fn,
  mix,
  positionView,
  smoothstep,
  uniform,
} from "three/tsl";

export const colorize = Fn(
  ([
    gridStrength,
    plusStrength,
    gridColor,
    plusColor,
    fogColorHex,
    fogNearVal,
    fogFarVal,
    baseColor
  ]: [
      ShaderCallNodeInternal,
      ShaderCallNodeInternal,
      string,
      string,
      string,
      number,
      number,
      string
    ]) => {
    const uPlusColor = uniform(color(plusColor));
    const uGridColor = uniform(color(gridColor));
    const uBaseColor = uniform(color(baseColor));

    const addAllParams = uPlusColor
      .mul(plusStrength)
      .add(uGridColor.mul(gridStrength)).add(uBaseColor);
    const blendedColor = clamp(addAllParams, 0.0, 1.0);

    // Fog logic
    const fogColor = uniform(color(fogColorHex));
    const fogNear = uniform(float(fogNearVal));
    const fogFar = uniform(float(fogFarVal));

    const fogDepth = positionView.z.negate(); // z is negative in front of camera
    const fogFactor = smoothstep(fogNear, fogFar, fogDepth);

    // Final color with fog
    return mix(blendedColor, fogColor, fogFactor);
  }
);
