import ResizableBox from "../ResizableBox";
import React, { useState, useEffect } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useWindowSize } from "../hooks/useWindowSize";

type DataProps = {
  color: string;
  data: any;
  label: string;
  type: string;
};

export default function BarStacked({ data }: DataProps) {
  const [width] = useWindowSize();
  const [scrollMessage, setScrollMessage] = useState<boolean>(false);
  const [minGraphicWidth, setMinGraphicWidth] = useState<string>("");
  const minimumWidthOfDayBar = 20;

  const getFrenchDay = (number: number) => {
    switch (number) {
      case 0:
        return "dimanche";
      case 1:
        return "lundi";
      case 2:
        return "mardi";
      case 3:
        return "mercredi";
      case 4:
        return "jeudi";
      case 5:
        return "vendredi";
      case 6:
        return "samedi";
    }
  };

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => {
        const date = new Date(datum[0]);
        const dayNumber = date.getDay();
        const frenchDay = getFrenchDay(dayNumber);
        return `${frenchDay} ${date.toLocaleDateString("fr")}`;
      },
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum[1] / 1000000,
        stacked: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (data.length) {
      const days = data[0].data.length;
      const minWidth = days * minimumWidthOfDayBar;
      setMinGraphicWidth(minWidth + "px");
      const windowWidth = window.innerWidth;
      if (minWidth > windowWidth) setScrollMessage(true);
      else setScrollMessage(false);
    }
  }, [data, width]);

  return (
    <>
      {scrollMessage && (
        <p className="scroll-message">
          Scroll horizontally to see next days {"-->"}
        </p>
      )}
      <ResizableBox style={{ minWidth: minGraphicWidth }}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
