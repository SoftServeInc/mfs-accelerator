const generateFakeData = (numberOfRows: number) =>
  [...new Array(numberOfRows)].map((_, index) => ({
    id: index,
    name: `name_${index}`,
    surname: `surname_${index}`,
    position: `position_${index}`,
    occupation: `occupation_${index}`,
    location: `location_${index}`,
  }));

export default generateFakeData;
