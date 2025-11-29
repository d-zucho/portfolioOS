import React from 'react';
import WindowWrapper from "@hoc/WindowWrapper.jsx";
import { WindowControls } from "@components";
import useWindowStore from "@store/window.js";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows?.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target={"txtfile"} />
        <h2>{name}</h2>
      </div>

      <div className="p-4 space-y-4 text-left">
        {image && (
          <img
            src={image}
            alt={name || "text image"}
            className="w-32 h-32 object-cover rounded"
          />
        )}

        {subtitle && <h3 className="text-lg font-semibold">{subtitle}</h3>}

        {Array.isArray(description) && description.length > 0 && (
          <div className="space-y-2">
            {description.map((para, idx) => (
              <p key={idx} className="text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtfile');
export default TextWindow;
