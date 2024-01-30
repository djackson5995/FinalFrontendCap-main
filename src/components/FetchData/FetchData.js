export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7a2f44f764msh63c760a318b54e7p13f836jsnd7e899cd9c27",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};
export const postExerciseoptions = {
  method: "POST",

  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "7a2f44f764msh63c760a318b54e7p13f836jsnd7e899cd9c27",
    "X-RapidAPI-Host": "workoutdb1.p.rapidapi.com",
  },
};
export const getExerciseoptions = {
  method: "GET",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "7a2f44f764msh63c760a318b54e7p13f836jsnd7e899cd9c27",
    "X-RapidAPI-Host": "workoutdb1.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
