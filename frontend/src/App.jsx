import { SlideProvider } from "./context/SlideContext";
import MergedSlideEditor from "./components/Editor/MergedSlideEditor";
import React from "react";

function App() {
  return (
    <SlideProvider>
      <MergedSlideEditor />
    </SlideProvider>
  );
}

export default App;
