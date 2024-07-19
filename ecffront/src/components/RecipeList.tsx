import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";

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
export default function RecipeList() {
    const [datas, setDatas] = useState<Datas | any>();
    const [res, setRes] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [selectedOptionsCat, setSelectedOptionsCat] = useState<OptionCat[]>([]);
    const [isOpenCat, setIsOpenCat] = useState(false);
    const [isOpenType, setIsOpenType] = useState(false);
    const [selectedOptionsType, setSelectedOptionsType] = useState<OptionType[]>([]);


    const optionsCat: OptionCat[] = [
        { id: 1, label: 'Starter' },
        { id: 2, label: 'Main Course' },
        { id: 3, label: 'Dessert' }
  ];
    const optionsType: OptionType[] = [
      { id: 1, label: 'Mexican' },
      { id: 2, label: 'French' },
      { id: 3, label: 'Asian' },
      { id: 4, label: 'Italian' },
      { id: 5, label: 'American' }
  ];
  

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('https://server-json-ecf.vercel.app/recipe');
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
    
   // this code is only to show or hide the dropdown of the category filter  and at the same time hides the type filter 
  const toggleDropdownCat = () => {
    setIsOpenCat(!isOpenCat);
    setIsOpenType(false);
  };
    
  const handleOptionToggleCat = (optionCat: OptionCat) => {
       // Check if the optionCat is already selected and some function returns true or false as per the finding 
        const isSelectedCat = selectedOptionsCat.some((selectedOptionCat) => selectedOptionCat.id === optionCat.id);
        console.log('isSelectedCat',isSelectedCat )
        if (isSelectedCat) {
          // If already selected, then removes it from the selectedOptionsCat and now updatedOptionsCat containes the new array of all selected Category after removing the unselected category
          const updatedOptionsCat = selectedOptionsCat.filter((selectedOptionCat) => selectedOptionCat.id !== optionCat.id);
          // Update selectedOptionsCat state with the updated array
          setSelectedOptionsCat(updatedOptionsCat);
      
          // Filter datas based on remaining selected categories
          if (updatedOptionsCat.length > 0) {
            //this filteredData contains the list of all the data from db.json which has the same category as that of checked Category
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
          // If the category is not present in selectedOptionsCat then add it to newSelectedOptionsCat
          const newSelectedOptionsCat = [...selectedOptionsCat, optionCat];
          setSelectedOptionsCat(newSelectedOptionsCat);
      
          // Filter datas based on all selected categories and now filteredData contains the list of db.json with category= selected checkbox category
          const filteredData = datas.filter((dataToGet: { id: Key; category: string; }) => {
            return newSelectedOptionsCat.some((selectedOptionCat) => dataToGet.category.toLowerCase().includes(selectedOptionCat.label.toLowerCase()));
          });
          // Update the filtered result state (res)
          setRes(filteredData);
        }
      };
    
 
  const toggleDropdownType = () => {
    setIsOpenType(!isOpenType);
    setIsOpenCat(false);

  };
  
  const handleOptionToggleType = (optionType: OptionType) => {
    const isSelectedType = selectedOptionsType.some((selectedOptionType) => selectedOptionType.id === optionType.id);
    if (isSelectedType) {
      const updatedOptionsType = selectedOptionsType.filter((selectedOptionType) => selectedOptionType.id !== optionType.id);
      setSelectedOptionsType(updatedOptionsType);
      if (updatedOptionsType.length > 0) {
        const filteredData = datas.filter((dataToGet: { id: Key; type: string; }) => {
          return updatedOptionsType.some((selectedOptionType) => dataToGet.type.toLowerCase().includes(selectedOptionType.label.toLowerCase()));
        });
        setRes(filteredData);
      } else {
        setRes(datas);
      }
    } else {
      setSelectedOptionsType([...selectedOptionsType, optionType]);
      const filteredData = datas.filter((dataToGet: { id: Key; type: string; }) => {
        return [...selectedOptionsType, optionType].some((selectedOptionType) => dataToGet.type.toLowerCase().includes(selectedOptionType.label.toLowerCase()));
      });
      setRes(filteredData);
    }
  };


    
  //Below is the code for the search logic 
    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
          async function fetchData() {
              try {
                  const response = await fetch('https://server-json-ecf.vercel.app/recipe');
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

    const handleSearchChange = async(e: { target: { value: any; }; }) => {
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
                onChange={handleSearchChange}
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
            {/* this setSelectedOptionsCat contains all the selected checkbox , first it checks if our category dropdown is visible then only concat the list selected to this line below to show it to the user which options are selected  */}
                    {isOpenCat && selectedOptionsCat.length > 0 ? selectedOptionsCat.map((optionCat) => optionCat.label).join(', ') : ''}
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
                            //only checks the checkbox if the option is in the selectedoptions 
                            onChange={() => handleOptionToggleCat(optionCat)}//calls the handleOptionToggleCat with the id label of the optionCat
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
                <img src={data.img} alt="recipeImg" className="card-image" />
                <button className="star-button" >
                <FavoriteIcon id={data.id?.toString()} dataId={data.id?.toString()} />
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



