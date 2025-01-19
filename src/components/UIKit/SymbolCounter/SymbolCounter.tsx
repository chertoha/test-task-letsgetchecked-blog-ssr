"use client";

import { FC, ReactNode, useEffect, useState } from "react";

interface IProps {
  children: ReactNode;
  symbolsNum: number;
  maxSymbols?: number;
}

const SymbolCounter: FC<IProps> = ({ children, symbolsNum, maxSymbols = 200 }) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {children}

      {isClient && (
        <span className="absolute text-xs top-full right-0 text-gray-400">
          <span className={symbolsNum <= maxSymbols ? "text-gray-400" : "text-red-500"}>
            {symbolsNum}
          </span>
          /{maxSymbols}
        </span>
      )}
    </div>
  );
};

export default SymbolCounter;
