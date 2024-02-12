import { ReactNode } from "react";
import { Application } from "pixi.js";
import { PixiComponent, useApp } from "@pixi/react";
import { Viewport as PixiViewport } from "pixi-viewport";

export interface ViewportProps {
  width: number;
  height: number;
  children?: ReactNode;
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: Application;
}

const PixiComponentViewport = PixiComponent("Viewport", {
  create(props: PixiComponentViewportProps) {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 2,
      worldHeight: props.height * 2,
      ticker: props.app.ticker,
      events: props.app.renderer.events,
    });
    viewport.drag().pinch().wheel().clampZoom({});

    return viewport;
  },
});

const Viewport = (props: ViewportProps) => {
  const app = useApp();
  return <PixiComponentViewport app={app} {...props} />;
};

export default Viewport;
