import { useState, useCallback } from "react";

const useSILDrawer = () => {
  const [show, setShow] = useState(false);

  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);
  const toggle = useCallback(() => setShow((prev) => !prev), []);

  return { show, open, close, toggle };
};

export default useSILDrawer;
