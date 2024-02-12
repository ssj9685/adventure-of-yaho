import { Stage } from "@pixi/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Game from "./components/Game";
import { Config } from "./state/config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Game />,
  },
]);

function App() {
  return (
    <Stage
      width={Config.screenWidth}
      height={Config.screenHeight}
      options={{ background: "d0d0d0" }}
    >
      <RouterProvider router={router} />
    </Stage>
  );
}

export default App;
