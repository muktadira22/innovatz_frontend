import React from "react";

type Props = {
  children: JSX.Element;
};

const Card = ({ children }: Props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
};

export default Card;
