import { useEffect, useRef } from "react";
import { Pane } from "tweakpane";

export type DebugParams = {
  frequency: number;
  lineWidth: number;
  plusGrid: number;
  plusThickness: number;
  plusSpacing: number;
  plusSize: number;
  baseColor: string;
  gridColor: string;
  plusColor: string;
  fogNear: number;
  fogFar: number;
  fogColor: string;
};

type DebugPaneProps = {
  params: DebugParams;
  setParams: React.Dispatch<React.SetStateAction<DebugParams>>;
};

export function DebugPane({ params, setParams }: DebugPaneProps) {
  const paneRef = useRef<Pane | null>(null);
  const paneParams = useRef<DebugParams>({ ...params });

  useEffect(() => {
    const pane = new Pane({ title: "Debug Controls", expanded: false });
    paneRef.current = pane;

    const update = <K extends keyof DebugParams>(key: K) => {
      return (ev: { value: DebugParams[K] }) => {
        paneParams.current[key] = ev.value;
        setParams({ ...paneParams.current });
      };
    };
    pane.addBinding(paneParams.current, "baseColor").on("change", update("baseColor"));
    
    const gridFolder = pane.addFolder({ title: "Grid", expanded: true });
    gridFolder
      .addBinding(paneParams.current, "frequency", {
        min: 0,
        max: 200,
        step: 1,
      })
      .on("change", update("frequency"));
    gridFolder
      .addBinding(paneParams.current, "lineWidth", {
        min: 0.01,
        max: 100,
        step: 0.01,
      })
      .on("change", update("lineWidth"));
    gridFolder
      .addBinding(paneParams.current, "gridColor")
      .on("change", update("gridColor"));

    const plusFolder = pane.addFolder({ title: "Plus", expanded: true });
    plusFolder
      .addBinding(paneParams.current, "plusGrid", { min: 1, max: 20, step: 1 })
      .on("change", update("plusGrid"));
    plusFolder
      .addBinding(paneParams.current, "plusThickness", {
        min: 0,
        max: 2,
        step: 0.01,
      })
      .on("change", update("plusThickness"));
    plusFolder
      .addBinding(paneParams.current, "plusSpacing", {
        min: 0,
        max: 10,
        step: 0.01,
      })
      .on("change", update("plusSpacing"));
    plusFolder
      .addBinding(paneParams.current, "plusSize", {
        min: 0,
        max: 10,
        step: 0.01,
      })
      .on("change", update("plusSize"));
    plusFolder
      .addBinding(paneParams.current, "plusColor")
      .on("change", update("plusColor"));

      
    const fogFolder = pane.addFolder({ title: "Fog", expanded: true });
    fogFolder
      .addBinding(paneParams.current, "fogNear", {
        min: 0,
        max: 10,
        step: 0.1,
      })
      .on("change", update("fogNear"));
    fogFolder
      .addBinding(paneParams.current, "fogFar", {
        min: 0,
        max: 100,
        step: 1,
      })
      .on("change", update("fogFar"));
    fogFolder
      .addBinding(paneParams.current, "fogColor")
      .on("change", update("fogColor"));

    return () => pane.dispose();
  }, [setParams]);

  return null;
}
