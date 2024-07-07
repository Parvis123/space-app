/* eslint-disable no-console */
const API_KEY = "Jco8mMHVqbsEqMEEeEaik4maHkQ2IU4db75aV8CJ";

const fetchData = async (date: string) => {
  console.log(`Requesting data for date: ${date}`);
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Log the status code and status text for more detailed error information
      console.error(
        `API request failed with status: ${response.status} ${response.statusText}`
      );
      // Attempt to parse the response body for additional error details
      const errorBody = await response.json();
      console.error(`Error details: ${JSON.stringify(errorBody)}`);
      throw new Error("Error fetching data from the API");
    }
    return response.json();
  } catch (error) {
    // Log network or parsing errors
    console.error(`An error occurred: ${error}`);
    throw error; // Rethrow to handle or log by the caller
  }
};

export default fetchData;
