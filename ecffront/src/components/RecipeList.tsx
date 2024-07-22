import React, {    ReactNode,  useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";

interface Data {
    time: ReactNode;
    id: string;
    title: string;
    desc: string;
    ingredients: { [key: string]: string };
    step: { [key: string]: string };
    category: string;
    img: string;
    type: string;
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
    const [datas, setDatas] = useState<Data[]>([]);
    const [res, setRes] = useState<Data[]>([]);
    const [searchTxt, setSearchTxt] = useState('');
    const [selectedOptionsCat, setSelectedOptionsCat] = useState<OptionCat[]>([]);
    const [isOpenCat, setIsOpenCat] = useState(false);
    const [isOpenType, setIsOpenType] = useState(false);
    const [selectedOptionsType, setSelectedOptionsType] = useState<OptionType[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

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
                const data = await response.json();
                setDatas(data);
                setRes(data);
            } catch (err) {
                setRes([]);
            }
        }
        fetchData();
    }, []);

    const toggleDropdownCat = () => {
        setIsOpenCat(!isOpenCat);
        setIsOpenType(false);
    };

    const handleOptionToggleCat = (optionCat: OptionCat) => {
        const isSelectedCat = selectedOptionsCat.some((selectedOptionCat) => selectedOptionCat.id === optionCat.id);
        if (isSelectedCat) {
            const updatedOptionsCat = selectedOptionsCat.filter((selectedOptionCat) => selectedOptionCat.id !== optionCat.id);
            setSelectedOptionsCat(updatedOptionsCat);
            if (updatedOptionsCat.length > 0) {
                const filteredData = datas.filter((dataToGet) => updatedOptionsCat.some((selectedOptionCat) => dataToGet.category.toLowerCase().includes(selectedOptionCat.label.toLowerCase())));
                setRes(filteredData);
            } else {
                setRes(datas);
            }
        } else {
            const newSelectedOptionsCat = [...selectedOptionsCat, optionCat];
            setSelectedOptionsCat(newSelectedOptionsCat);
            const filteredData = datas.filter((dataToGet) => newSelectedOptionsCat.some((selectedOptionCat) => dataToGet.category.toLowerCase().includes(selectedOptionCat.label.toLowerCase())));
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
                const filteredData = datas.filter((dataToGet) => updatedOptionsType.some((selectedOptionType) => dataToGet.type.toLowerCase().includes(selectedOptionType.label.toLowerCase())));
                setRes(filteredData);
            } else {
                setRes(datas);
            }
        } else {
            const newSelectedOptionsType = [...selectedOptionsType, optionType];
            setSelectedOptionsType(newSelectedOptionsType);
            const filteredData = datas.filter((dataToGet) => newSelectedOptionsType.some((selectedOptionType) => dataToGet.type.toLowerCase().includes(selectedOptionType.label.toLowerCase())));
            setRes(filteredData);
        }
    };

    useEffect(() => {
        if (datas) {
            const filtered = datas.filter((item) => item.title.toLowerCase().includes(searchTxt.toLowerCase()));
            setRes(filtered);
            const filteredLabel = filtered.map((recipe) => recipe.title);
            setSuggestions(filteredLabel);
        }
    }, [searchTxt, datas]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTxt(value);
        setIsVisible(true);
    };

    const handleSuggestion = (suggestion: string) => {
        setSearchTxt(suggestion);
        setIsVisible(false);
    };

    return (
        <>
            <div className="search">
                <input
                    type="text"
                    id="textInput"
                    value={searchTxt}
                    onChange={handleSearchChange}
                    className="searchBar"
                    autoComplete="off"
                />
                {searchTxt && isVisible && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestion(suggestion)}>{suggestion}</li>
                        ))}
                    </ul>
                )}
                <img src="https://api.iconify.design/pepicons-pencil:loop.svg?color=%23888888" alt="loop" className="loop" />
                <label htmlFor="textInput">Search</label>
            </div>
            <div className="filter">
                <div className="dropdown">
                    <div className="dropdown-toggle" onClick={toggleDropdownCat}>
                        <h2>Select the Category</h2>
                        {isOpenCat && selectedOptionsCat.length > 0 ? selectedOptionsCat.map((optionCat) => optionCat.label).join(', ') : ''}
                        <hr />
                    </div>
                    {isOpenCat && (
                        <ul className="dropdown-menu">
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

            <div className="CardContainer">
                {res.map((data) => (
                    <div className="card" key={data.id}>
                        <img src={data.img} alt="recipeImg" className="card-image" />
                        <button className="star-button">
                            <FavoriteIcon id={data.id.toString()} dataId={data.id.toString()} />
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
