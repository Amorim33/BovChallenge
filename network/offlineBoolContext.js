import React, { createContext } from "react";

const OfflineBoolContext = createContext([false, () => {}]);

export default OfflineBoolContext;
