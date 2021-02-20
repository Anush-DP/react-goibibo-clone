export const findFlightNameByKey = (key, data) => {
  for (let i = 0; i < data.length; ++i) {
    if (data[i].c === key) return { ...data[i] };
  }
};

export const findPlaceNameByIata = (iata, data) => {
  for (let i = 0; i < data.length; ++i) {
    if (data[i].i === iata) return { ...data[i] };
  }
};
