import { useEffect, useRef, useState } from "react";
import { useArrowStore } from "../../store/arrow";
import { useCardStore } from "../../store/card";

export default function Size() {
  const [widthBuffer, setWidthBuffer] = useState("672");
  const cardWidth = useCardStore((state) => state.width);
  const setWidth = useCardStore((state) => state.setWidth);
  useEffect(() => {
    setWidthBuffer(cardWidth + "");
  }, [cardWidth]);
  function widthKeyDown(e: any) {
    if (e.keyCode === 38) {
      setWidth(() => +widthBuffer + 1);
    } else if (e.keyCode === 40) {
      setWidth(() => +widthBuffer - 1);
    } else if (e.keyCode === 13) {
      if (Number.isNaN(Number(widthBuffer))) {
        setWidthBuffer(cardWidth + "");
      } else {
        setWidth(() => +widthBuffer);
      }
    }
  }

  const [heightBuffer, setHeightBuffer] = useState("332");
  const cardHeight = useCardStore((state) => state.height);
  const setHeight = useCardStore((state) => state.setHeight);
  useEffect(() => {
    setHeightBuffer(cardHeight + "");
  }, [cardHeight]);
  function heightKeyDown(e: any) {
    if (e.keyCode === 38) {
      setHeight(() => +heightBuffer + 1);
    } else if (e.keyCode === 40) {
      setHeight(() => +heightBuffer - 1);
    } else if (e.keyCode === 13) {
      if (Number.isNaN(Number(heightBuffer))) {
        setHeightBuffer(cardHeight + "");
      } else {
        setHeight(() => +heightBuffer);
      }
    }
  }

  const [radiusBuffer, setRadiusBuffer] = useState("16");
  const radius = useCardStore((state) => state.radius);
  const setRadius = useCardStore((state) => state.setRadius);
  useEffect(() => {
    setRadiusBuffer(radius + "");
  }, [radius]);
  function roundKeyDown(e: any) {
    if (e.keyCode === 38) {
      setRadius((radius) => radius + 1);
    } else if (e.keyCode === 40) {
      setRadius((radius) => radius - 1);
    } else if (e.keyCode === 13) {
      if (Number.isNaN(Number(radiusBuffer))) {
        setRadiusBuffer(radius + "");
      } else {
        setRadius((radius) => radius + Number(radiusBuffer));
      }
    }
  }

  const setIsArrowVisible = useArrowStore((state) => state.setIsArrowVisible);
  const setX = useArrowStore((state) => state.setX);
  const setY = useArrowStore((state) => state.setY);

  function mouseDownHandler(e: any) {
    setIsArrowVisible(() => true);
    setX(() => e.clientX - 10);
    setY(() => e.clientY - 10);
    e.target.requestPointerLock();
  }

  useEffect(() => {
    document.addEventListener("pointerlockchange", () => {
      if (document.pointerLockElement) {
        document.addEventListener("mousemove", incrementDimension);
      } else {
        document.removeEventListener("mousemove", incrementDimension);
        setIsArrowVisible(() => false);
      }
    });
  }, []);

  function incrementDimension(e: any) {
    setX((X) => X + e.movementX);
    switch (e.target.attributes["data-name"].value) {
      case "width":
        setWidth((width) => width + e.movementX);
        break;
      case "height":
        setHeight((height) => height + e.movementX);
        break;
      case "radius":
        setRadius((radius) => radius + e.movementX);
    }
  }

  return (
    <div className="firefox-padding-fix p-5 pr-3">
      <h2 className="font-bold">Size</h2>
      <form className="mt-4 flex flex-wrap gap-y-4">
        <div className="flex w-1/2 gap-x-3">
          <label
            htmlFor=""
            className="cursor-ew-resize font-mono text-slate-500"
            onMouseDown={mouseDownHandler}
            onMouseUp={() => {
              document.exitPointerLock();
              setIsArrowVisible(() => false);
            }}
            data-name="width"
          >
            W
          </label>
          <input
            value={widthBuffer}
            onChange={(e) => setWidthBuffer(e.target.value)}
            onBlur={() =>
              Number.isNaN(Number(widthBuffer))
                ? setWidthBuffer(cardWidth + "")
                : setWidth(() => Number(widthBuffer))
            }
            onKeyDown={widthKeyDown}
            className="w-full"
            type="text"
          />
        </div>

        <div className="flex w-1/2 gap-x-3">
          <label
            htmlFor=""
            className="cursor-ew-resize font-mono text-slate-500"
            onMouseDown={mouseDownHandler}
            onMouseUp={() => {
              document.exitPointerLock();
              setIsArrowVisible(() => false);
            }}
            data-name="height"
          >
            H
          </label>
          <input
            value={heightBuffer}
            onChange={(e) => setHeightBuffer(e.target.value)}
            onBlur={() =>
              Number.isNaN(Number(heightBuffer))
                ? setHeightBuffer(cardHeight + "")
                : setHeight(() => Number(heightBuffer))
            }
            onKeyDown={heightKeyDown}
            className="w-full"
            type="text"
          />
        </div>

        <div className="flex w-1/2 gap-x-3">
          <label
            htmlFor=""
            className="cursor-ew-resize font-mono text-slate-500"
            onMouseDown={mouseDownHandler}
            onMouseUp={() => {
              document.exitPointerLock();
              setIsArrowVisible(() => false);
            }}
            data-name="radius"
          >
            R
          </label>
          <input
            value={radiusBuffer}
            onChange={(e) => setRadiusBuffer(e.target.value)}
            onBlur={() =>
              Number.isNaN(Number(radiusBuffer))
                ? setRadiusBuffer(radius + "")
                : setRadius((radius) => radius + Number(radiusBuffer))
            }
            onKeyDown={roundKeyDown}
            className="w-full"
            type="text"
          />
        </div>
      </form>
    </div>
  );
}
