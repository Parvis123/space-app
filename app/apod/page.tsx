"use client";

import { useQuery } from "@tanstack/react-query";

import fetchData from "../utils/api";

const APODPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["apod"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default APODPage;
