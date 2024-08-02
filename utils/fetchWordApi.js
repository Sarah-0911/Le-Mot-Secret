export const fetchWord = async() => {
  const url = `https://trouve-mot.fr/api/size/6`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status} : ${response.statusText}`);

    const data = await response.json();

    const wordData = {
      name: data[0].name,
      category: data[0].categorie
    }
    return wordData;

  } catch (error) {
    console.log(error);
  }
};
