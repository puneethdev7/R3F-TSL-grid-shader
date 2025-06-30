import { add, clamp, mod, step, sub, uv } from "three/tsl";

export const gridPlus = (
  gridArea: number,
  plusGrid: number,
  plusThickness: number,
  plusSpacing: number,
  plusSize: number
) => {
  const plusAreaFactor = 2.0 * plusGrid - 0.001;

  // Plus lines
  const plusUV = uv().mul(gridArea).mul(plusAreaFactor);
  const mX1 = mod(sub(plusUV.x, plusSize), plusSpacing);
  const mY1 = mod(plusUV.y, plusSpacing);
  const mX2 = mod(plusUV.x, plusSpacing);
  const mY2 = mod(sub(plusUV.y, plusSize), plusSpacing);

  const barX = step(plusSpacing - plusThickness - plusSize * 2, mX1).mul(
    step(plusSpacing - plusThickness, mY1)
  );
  const barY = step(plusSpacing - plusThickness, mX2).mul(
    step(plusSpacing - plusThickness - plusSize * 2, mY2)
  );

  const plusStrength = clamp(add(barX, barY), 0.0, 1.0);

  return plusStrength;
};
