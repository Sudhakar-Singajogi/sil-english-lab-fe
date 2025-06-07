import { useEffect, useState } from "react";

const useIsMobileTabDesktop = (breakpoint) => {
  const [whichDevice, setWhichDevice] = useState();

  const handleResize = () => {
    //   setIsMobile(window.innerWidth <= breakpoint);

    if (window.innerWidth >= 1024) {
      setWhichDevice("desktop");
    } else if (window.innerWidth > 600 && window.innerWidth < 1024) {
      setWhichDevice("tablet");
    } else {
      setWhichDevice("mobile");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return whichDevice;
};

export default useIsMobileTabDesktop;
