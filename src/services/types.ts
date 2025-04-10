export type OSRMResponse = {
  routes: {
    geometry: {
      coordinates: [number, number][];
    };
    distance: number;
    duration: number;
  }[];
};

export type PolylineData = {
  polyLineData: [number, number][];
  distance: number;
  duration: string;
};
