import React, { useEffect, useState } from "react";
import { ROOT_NODE } from "../main";

export const HeightOberserver: React.FC = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      const root = document.querySelector(`#${ROOT_NODE}`);

      if (root !== null) {
        setHeight(root.clientHeight);
      }
    }, 500);
    return () => clearInterval(intervalID);
  }, []);
  const eventMessage = { "form-event": "HEIGHT_CHANGE", height };

  console.debug(eventMessage);

  parent.postMessage(eventMessage, "*");

  return <></>;
};
