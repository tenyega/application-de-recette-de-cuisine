import React, { useEffect, useState } from "react";

interface FavoriteIconProps {
  id: string;
  dataId: string;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ id, dataId }) => {
  const [fillColor, setFillColor] = useState<string>("none");
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [datas, setDatas] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://server-json-ecf.vercel.app/recipe/' + id);
        const resDatas = await response.json();
        setDatas(resDatas);
        const localValues = JSON.parse(localStorage.getItem('favorites') || '[]') as any[];

        if (localValues) {
          const isFavorite = localValues.some((value) => value.id === id);
          setFillColor(isFavorite ? '#ff9900' : 'none');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, [id]);

  
  useEffect(() => {
    //checks if the fav icon is not clicked or theres no data then returns directly 
    if (!isIconClicked || !datas) return;

    const updateLocalStorage = () => {
      let oldValue = JSON.parse(localStorage.getItem('favorites') || '[]') as any[];
      if (fillColor === '#ff9900') {
        const newValue = [...oldValue, datas];
        localStorage.setItem('favorites', JSON.stringify(newValue));
      } else if (fillColor === 'none') {
        let newItems = JSON.parse(localStorage.getItem('favorites') || '[]') as any[];
        const itemIdToRemove = id;
        //findIndex is an array method that returns the index of the first element that satisfies the provided testing function. If no elements satisfy the testing function, it returns -1.
        const index = newItems.findIndex(favorite => favorite.id === itemIdToRemove);
        if (index !== -1) {
          //splice is an array method used to change the contents of an array by removing or replacing existing elements and/or adding new elements.
          //index is the position of the element to be removed.
          //1 indicates that one element should be removed starting from the found index.
          newItems.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(newItems));
      }
    };

    updateLocalStorage();
    setIsIconClicked(false);
  }, [isIconClicked, fillColor, datas, id]);

  const handleClick = () => {
    if (id === dataId) {
      //here the fill is toggled between none and the orange color 
      setFillColor((prevColor) => (prevColor === "none" ? "#ff9900" : "none"));
      setIsIconClicked(true);
    }
   
  };

  return (
    // the id attribute of the svg element is being set to the id prop that was passed to the FavoriteIcon component.
    //fill of the svg as per the state fillcolor 
    <svg
      className="star-icon"
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fillColor}
      id={id}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
    >
      <polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2"></polygon>
    </svg>
  );
};

export default FavoriteIcon;
