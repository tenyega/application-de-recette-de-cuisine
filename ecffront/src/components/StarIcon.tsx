import React, {  useEffect, useState } from "react";

interface StarIconProps {
  id: string;
  dataId: string;
}

interface Data {
    id: string;
    title: string;
    desc: string;
    ingredients:  { [key: string]: string };
    step:  { [key: string]: string };
    category: string;
    img: string;
    isFavorite: boolean;
}
interface Datas {
datas: Data[];
}



const StarIcon: React.FC<StarIconProps> = ({ id, dataId }) => {
    const [fillColor, setFillColor] = useState<string>("none");
    const [datas, setDatas] = useState<Datas | any>();


    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/recipe/'+id);
                setDatas(await response.json());
                if (datas) {
                    let oldValue = JSON.parse(localStorage.getItem('favorite') || '[]') as any[];
                    const newValue = [...oldValue, datas];
                    localStorage.setItem('favorite', JSON.stringify(newValue));
                } } catch (err) {
            }
        }
        fetchData();
           
         
    }, [fillColor]);
    

  const handleClick = async() => {
    if (id === dataId) {
      setFillColor((prevColor) => (prevColor === "none" ? "#ff9900" : "none"));
      }
     console.log("id is ", id)
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

export default StarIcon;
