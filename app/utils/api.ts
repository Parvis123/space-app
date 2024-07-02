const API_KEY = "Jco8mMHVqbsEqMEEeEaik4maHkQ2IU4db75aV8CJ";

const fetchData = async () => {
  const response = await fetch("https://api.nasa.gov/planetary/apod", {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default fetchData;
