import {
  abs,
  fract,
  sub,
  uv,
  smoothstep,
  add,
  mix,
  mul,
  fwidth,
  Fn,
} from "three/tsl";

export const gridMaterial = Fn(([gridArea, lineWidth]: [number, number]) => {
  const worldUV = uv().mul(gridArea);
  const uvDeriv = fwidth(worldUV);
  const drawWidth = mul(uvDeriv, lineWidth);
  const lineAA = mul(uvDeriv, 1.5);
  const repeatedUV = fract(worldUV);
  const gridUV = abs(mul(repeatedUV, 2.0).sub(1.0));
  const grid2 = smoothstep(
    add(drawWidth, lineAA),
    sub(drawWidth, lineAA),
    gridUV
  );
  return mix(grid2.x, 1, grid2.y);
});
