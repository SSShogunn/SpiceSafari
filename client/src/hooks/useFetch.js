import { useEffect, useState } from "react";

export const useFetch = (id) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getRecipeItemData = async () => {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        if (!res.ok)
          throw new Error("Something went wrong, please try again later!");
        const data = await res.json();
        setData(data?.data?.recipe);
      } catch (error) {
        console.log("ERROR AT USE_FETCH.JS: ", error);
      }
    };

    getRecipeItemData();
  }, []);

  return { data };
};
