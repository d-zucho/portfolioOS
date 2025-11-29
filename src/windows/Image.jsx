import React from 'react';
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import { WindowControls } from "@components";
import useWindowStore from "@store/window.js";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows?.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target={"imgfile"} />
        <h2>{name}</h2>
      </div>

      <div className="p-4 flex items-center justify-center h-full">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name || "image file"}
            className="max-h-[65vh] max-w-full object-contain rounded-md shadow"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');
export default ImageWindow;
