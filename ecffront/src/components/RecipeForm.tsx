import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';



export interface Recipe {
  id: string; // Assuming id will be generated or managed separately
  title: string;
  desc: string;
  ingredients: string[];
  steps: string[];
  category: string;
  type: string;
  img: string;
  time: string;
}

export interface RecipeFormData {
  id:string,
  title: string;
  desc: string;
  category: string;
  type: string;
  img: string;
  time: string;
  ingredients: string;
  steps: string;
}

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
const RecipeForm= () => {
  const [formData, setFormData] = useState<RecipeFormData>({
    id:'',
    title: '',
    desc: '',
    category: '',
    type: '',
    img: '',
    time: '',
    ingredients: '',
    steps: '',
  });
  const [datas, setDatas] = useState<Datas | any>();
  const [msg, setMsg] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/recipe');
        const data = await response.json();
        setDatas(data); // Assuming 'data' is an array of Recipe objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    const { ingredients, steps, ...rest } = formData;
    const recipe: Recipe = {
      ...rest,
      id: datas.length.toString(), // Replace with your own id generation logic
      ingredients: ingredients.split('\n').map((item: string) => item.trim()),
      steps: steps.split('\n').map((item: string) => item.trim()),
     
    };

    try {
      const response = await fetch('http://localhost:3000/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      }
       
      );

      if (response.ok) {
        setMsg('Successfully added your recipe');
      }
      if (!response.ok) {
        setMsg("We have encountred error while saving your recipe")
      }


      setFormData({
        id:'',
        title: '',
        desc: '',
        category: '',
        type: '',
        img: '',
        time: '',
        ingredients: '',
        steps: '',
      });
    } catch (error) {
      console.error('Failed to add recipe', error);
      alert('Failed to add recipe');
    }
  };



  return (<>
    <NavBar />
    <h1 className='title'> Add a new Recipe </h1>
    <form className="form" onSubmit={handleFormSubmit}>
      <div className="formContainer">
        <div className="first">
          <div className='formTitle'>
            <label htmlFor="title">Title:</label><br />
            <input type="text" id="title" name="title" className='formInput' value={formData.title} onChange={handleInputChange} required /><br /><br />
          </div>
          <div className='formDesc'>
            <label htmlFor="desc">Description:</label><br />
            <textarea id="desc" name="desc" rows={4}  className='formInput' value={formData.desc} onChange={handleInputChange} required></textarea><br /><br />
          </div>
          <div className='formCat'>
            <label htmlFor="category">Category:</label><br />
            <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="">Select a category</option>
              <option value="starter">Starter</option>
              <option value="main course">Main Course</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className='formType'>
            <label htmlFor="type">Type of Cuisine:</label><br />
            <select id="type" name="type" value={formData.type} onChange={handleInputChange} required>
              <option value="">Select Type</option>
              <option value="asian">Asian</option>
              <option value="american">American</option>
              <option value="italian">Italian</option>
              <option value="french">French</option>
              <option value="mexican">Mexican</option>

            </select>
          </div>
          <div className='formImg'>
            <label htmlFor="img">Image URL:</label><br />
            <input type="text" id="img" name="img" className='formInput' value={formData.img} onChange={handleInputChange} required /><br /><br />
          </div>
          <div className='formTime'>
            <label htmlFor="time">Time:</label><br />
            <input type="text" id="time" name="time" className='formInput' value={formData.time} onChange={handleInputChange} required /><br /><br />
          </div>
        </div>
        <div className="second">
          <div className='formIngredients'>
            <label htmlFor="ingredients">Ingredients (each on a new line):</label><br />
            <textarea id="ingredients" name="ingredients" rows={6} value={formData.ingredients} onChange={handleInputChange} required></textarea><br /><br />
          </div>
          <div className='formSteps'>
            <label htmlFor="steps">Steps (each on a new line):</label><br />
            <textarea id="steps" name="steps" rows={10} value={formData.steps} onChange={handleInputChange} required></textarea><br /><br />
          </div>
          <button className='submit' type="submit">Add Recipe
            <img src='https://api.iconify.design/formkit:submit.svg?color=%23888888' alt='submit' />
          </button>
        </div>
      </div>
    </form>
    <div className='title'>{msg}</div>
    </>
  );
};

export default RecipeForm;
