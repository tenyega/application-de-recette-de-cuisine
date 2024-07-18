import React, { useEffect, useState } from "react";

interface FavoriteIconProps {
  id: string;
  dataId: string;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ id, dataId }) => {
  const [fillColor, setFillColor] = useState<string>("none");
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://server-json-ecf.vercel.app/recipe/' + id);
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, [id]);

  
  useEffect(() => {
    if (!isIconClicked || !data) return;

    const updateLocalStorage = () => {
      let oldValue = JSON.parse(localStorage.getItem('favorite') || '[]') as any[];
      if (fillColor === '#ff9900') {
        const newValue = [...oldValue, data];
        localStorage.setItem('favorite', JSON.stringify(newValue));
      } else if (fillColor === 'none') {
        let items = JSON.parse(localStorage.getItem('favorite') || '[]') as any[];
        const itemIdToRemove = id;
        const index = items.findIndex(favorite => favorite.id === itemIdToRemove);
        if (index !== -1) {
          items.splice(index, 1);
        }
        localStorage.setItem('favorite', JSON.stringify(items));
      }
    };

    updateLocalStorage();
    setIsIconClicked(false);
  }, [isIconClicked, fillColor, data, id]);

  const handleClick = () => {
    if (id === dataId) {
      setFillColor((prevColor) => (prevColor === "none" ? "#ff9900" : "none"));
      setIsIconClicked(true);
    }
    console.log("id is ", id);
  };

  return (
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
