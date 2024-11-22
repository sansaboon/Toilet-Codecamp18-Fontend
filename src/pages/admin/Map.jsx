import React from "react";
import MapContent from "../../Map/MapContent";

const Map = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 p-4 shadow-md">
      <div>
        <MapContent/>
        </div>
</div>
  );
};

export default Map;