import { ResizableBox as ReactResizableBox } from "react-resizable";

export default function ResizableBox({
  children,
  width = "100%",
  height = 300,
  resizable = true,
  style = {},
  className = "",
}) {
  return (
    <div style={{ width: "100%", overflow: "scroll" }}>
      <div
        style={{
          display: "inline-block",
          width: "calc(100% - 60px)",
          background: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 30px 40px rgba(0,0,0,.1)",
          ...style,
        }}
      >
        <p className="unity">MWh</p>
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
