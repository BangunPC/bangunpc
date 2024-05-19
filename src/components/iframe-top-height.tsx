"use client";
export const IframeTopHeight = () => {
  const isIframe = window.parent !== window;

  if (!isIframe) {
    return (
      <div
        style={{
          height: "h-navbar-min-h",
        }}
      ></div>
    );
  } else {
    return <></>;
  }
};
