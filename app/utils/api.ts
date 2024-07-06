const API_KEY = "Jco8mMHVqbsEqMEEeEaik4maHkQ2IU4db75aV8CJ";

const fetchData = async () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default fetchData;
