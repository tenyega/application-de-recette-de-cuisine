import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import StarIcon from "./FavoriteIcon";

interface Data {
    id: string;
    title: string;
    desc: string;
    ingredients:  { [key: string]: string };
    step:  { [key: string]: string };
    category: string;
    img: string;
    type: string;
}
interface Datas {
datas: Data[];
}
interface OptionCat {
    id: number;
    label: string;
}
  
interface OptionType {
    id: number;
    label: string;
  }
export default function RecipeCard() {
    const [datas, setDatas] = useState<Datas | any>();
    const [res, setRes] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const optionsCat: OptionCat[] = [
        { id: 1, label: 'Starter' },
        { id: 2, label: 'Main Course' },
        { id: 3, label: 'Dessert' }
      ];
    
      const [selectedOptionsCat, setSelectedOptionsCat] = useState<OptionCat[]>([]);
      const [isOpenCat, setIsOpenCat] = useState(false);
      const [isOpenType, setIsOpenType] = useState(false);

      const toggleDropdownCat = () => {
        setIsOpenCat(!isOpenCat);
        setIsOpenType(false);
      };
    
  const handleOptionToggleCat = (optionCat: OptionCat) => {
       // Check if the optionCat is already selected
        const isSelectedCat = selectedOptionsCat.some((selectedOptionCat) => selectedOptionCat.id === optionCat.id);
      console.log('isSelectedCat',isSelectedCat )
        if (isSelectedCat) {
          // If already selected, filter out the deselected category
          const updatedOptionsCat = selectedOptionsCat.filter((selectedOptionCat) => selectedOptionCat.id !== optionCat.id);
          // Update selectedOptionsCat state with the updated array
          setSelectedOptionsCat(updatedOptionsCat);
      
          // Filter datas based on remaining selected categories
          if (updatedOptionsCat.length > 0) {
            const filteredData = datas.filter((dataToGet: { id: Key; category: string; }) => {
              // Check if any remaining selected category matches dataToGet category
              return updatedOptionsCat.some((selectedOptionCat) => dataToGet.category.toLowerCase().includes(selectedOptionCat.label.toLowerCase()));
            });
            // Update the filtered result state (res)
            setRes(filteredData);
          } else {
            // If no categories are selected, show all data
            setRes(datas);
          }
        } else {
          // If the category is not selected, add it to selectedOptionsCat
          setSelectedOptionsCat([...selectedOptionsCat, optionCat]);
      
          // Filter datas based on all selected categories
          const filteredData = datas.filter((dataToGet: { id: Key; category: string; }) => {
            return [...selectedOptionsCat, optionCat].some((selectedOptionCat) => dataToGet.category.toLowerCase().includes(selectedOptionCat.label.toLowerCase()));
          });
          // Update the filtered result state (res)
          setRes(filteredData);
        }
      };
    

    const optionsType: OptionType[] = [
        { id: 1, label: 'Mexican' },
        { id: 2, label: 'French' },
        { id: 3, label: 'Asian' }
      ];
    
      const [selectedOptionsType, setSelectedOptionsType] = useState<OptionType[]>([]);
    
      const toggleDropdownType = () => {
        setIsOpenType(!isOpenType);
        setIsOpenCat(false);

      };
    
      const handleOptionToggleType = (optionType: OptionType) => {
        // Check if the optionCat is already selected
        const isSelectedType = selectedOptionsType.some((selectedOptionType) => selectedOptionType.id === optionType.id);
      
        if (isSelectedType) {
          // If already selected, filter out the deselected category
          const updatedOptionsType = selectedOptionsType.filter((selectedOptionType) => selectedOptionType.id !== optionType.id);
          // Update selectedOptionsCat state with the updated array
          setSelectedOptionsType(updatedOptionsType);
      
          // Filter datas based on remaining selected categories
          if (updatedOptionsType.length > 0) {
            const filteredData = datas.filter((dataToGet: { id: Key; type: string; }) => {
              // Check if any remaining selected category matches dataToGet category
              return updatedOptionsType.some((selectedOptionType) => dataToGet.type.toLowerCase().includes(selectedOptionType.label.toLowerCase()));
            });
            // Update the filtered result state (res)
            setRes(filteredData);
          } else {
            // If no categories are selected, show all data
            setRes(datas);
          }
        } else {
          // If the category is not selected, add it to selectedOptionsCat
          setSelectedOptionsType([...selectedOptionsType, optionType]);
      
          // Filter datas based on all selected categories
          const filteredData = datas.filter((dataToGet: { id: Key; type: string; }) => {
            return [...selectedOptionsType, optionType].some((selectedOptionType) => dataToGet.type.toLowerCase().includes(selectedOptionType.label.toLowerCase()));
          });
          // Update the filtered result state (res)
          setRes(filteredData);
        }
      };
  
    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/recipe');
                setDatas(await response.json());
                if (datas) {
                    setRes(datas);
                    console.log(datas);
  
                }
            } catch (err) {
                setRes([]);
            }
        }
        fetchData();
         
    },[]);
    
    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
          async function fetchData() {
              try {
                  const response = await fetch('http://localhost:3000/recipe');
                  setDatas(await response.json()) ; 
                  if (datas) {
                      setRes(datas);
  
                  }
              } catch (err) {
                setRes([]);
              }
          }
           fetchData();
           //Sets the shouldFetch to false after each fetch data. 
           if (shouldFetch) {
              fetchData();
              setShouldFetch(false);
          }
    }, [shouldFetch]);
    
    useEffect(() => {
        if (datas) {
            const filtered = datas.filter((item: { title: string; }) => item.title.toLowerCase().includes(searchTxt));
            setRes(filtered);
        }
    }, [datas]);

    const handleChange = async(e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setSearchTxt(value)
        setShouldFetch(true);
      
    }

    return (<>
        
        {/* Search Bar Logic */}
        <div className="search">
        <input
          type="text"
          id="textInput"
                value={searchTxt}
                onChange={handleChange}
                className="searchBar"
            />
            <img src="https://api.iconify.design/pepicons-pencil:loop.svg?color=%23888888" alt="loop" className="loop"/>
                    <label htmlFor="textInput" >Search</label>

        </div>
        <div className="filter">
            {/* Filter Logic  for category*/}
            <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleDropdownCat}>
                <h2>Select the Category</h2>
                    {isOpenCat && selectedOptionsCat.length > 0 ? selectedOptionsCat.map((optionCat) => optionCat.label).join(', ') : ''}
                    {/* {selectedOptionsCat.map((optionCat) => <h2>{optionCat.label}</h2> )} */}

                    <hr />
                </div>
                {isOpenCat && (
                    <ul className="dropdown-menu" >
                    {optionsCat.map((optionCat) => (
                        <li key={optionCat.id}>
                        <label>
                            <input
                            type="checkbox"
                            checked={selectedOptionsCat.some((selectedOptionCat) => selectedOptionCat.id === optionCat.id)}
                            onChange={() => handleOptionToggleCat(optionCat)}
                            />
                            {optionCat.label}
                        </label>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            {/* Filter Logic  for Type */}
                
            <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleDropdownType}>
            <h2>Type of Cuisine</h2>
                    {isOpenType && selectedOptionsType.length > 0 ? selectedOptionsType.map((optionType) => optionType.label).join(', ') : ' '}
                    <hr />
                </div>
                {isOpenType && (
                    <ul className="dropdown-menu">
                    {optionsType.map((optionType) => (
                        <li key={optionType.id}>
                        <label>
                            <input
                            type="checkbox"
                            checked={selectedOptionsType.some((selectedOptionType) => selectedOptionType.id === optionType.id)}
                            onChange={() => handleOptionToggleType(optionType)}
                            />
                            {optionType.label}
                        </label>
                        </li>
                    ))}
                    </ul>
                )}
             </div>
            
        </div>
        {/* Card Display logic */}
        <div className="CardContainer">
        {res.map((data: {id: Key , img: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (

        <div className="card" key={data.id}>
                <img src={data.img} alt="Example Image" className="card-image" />
                <button className="star-button" >
                <StarIcon id={data.id?.toString()} dataId={data.id?.toString()} />
             </button>
            <div className="card-content">
                <h2 className="card-title">{data.title}</h2>
                <p className="card-time">{data.time}</p>
                </div>
                <NavLink to={`/recipedetail/${data.id}`} className="btnDetails">
            Details <img src="https://api.iconify.design/material-symbols:arrow-forward-rounded.svg?color=%23888888" alt="launch" />        
                    </NavLink>
                   
        </div>
        ))}
            </div>
            </>
    );
}



