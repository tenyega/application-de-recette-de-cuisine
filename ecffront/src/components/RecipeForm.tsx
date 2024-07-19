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
  conseil: string;
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
  conseil: string;
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
    conseil: ''
  });

  const [errors, setErrors] = useState<RecipeFormData>({
    id:'',
    title: '',
    desc: '',
    category: '',
    type: '',
    img: '',
    time: '',
    ingredients: '',
    steps: '',
    conseil:''
  });
  const [datas, setDatas] = useState<Datas | any>();
  const [msg, setMsg] = useState('');

  // All the regex for the form validation 
  const titleRegx =/^.{3,}$/; //is used to match strings that are at least 3 characters long
  const descRegx = /^[a-zA-Z\n ]{2,30}$/  //is used to match strings that consist only of letters (both uppercase and lowercase), newline characters, and spaces, and have a length between 2 and 30 characters inclusive
  const requiredPattern = /^(?=.*\S)[\s\S]+$/;//is designed to match strings that contain at least one non-whitespace character and can include any characters (both whitespace and non-whitespace). For the not empty field

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://server-json-ecf.vercel.app/recipe');
        const data = await response.json();
        setDatas(data); // Assuming 'data' is an array of Recipe objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));   

    //this error is the return value of validate funtion which is a switch case to verify each value taking its name in switch 
    const error = validate(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'title':
        if (!requiredPattern.test(value)) {
          return 'Title must not be empty ';
        }
        if (!titleRegx.test(value)) {
          return 'Title must be minimum three characters ';
        }
        break;
      case 'desc':
        if (!requiredPattern.test(value)) {
          return 'Description must not be empty ';
        }
        if (!descRegx.test(value)) {
          return 'Description must be between 2-30 characters long';
        }
        break;
      case 'category':
        if (value === "") {
          return 'Please select atleast one category';
        }
        break;
      case 'type':
          if (value === "") {
            return 'Please select atleast one type';
          }
        break;
      case 'img':
        if (!requiredPattern.test(value)) {
          return 'Please provide an image link here ';
        }
        break;
        case 'time':
          if (!requiredPattern.test(value)) {
            return 'Please provide a time consumed for this recipe';
          }
        break;
        case 'conseil':
          if (!requiredPattern.test(value)) {
            return 'Please provide a chefs advice here ';
          }
        break;
        case 'ingredients':
          if (!requiredPattern.test(value)) {
            return 'Ingredients can not be empty';
          }
        break;
        case 'steps':
          if (!requiredPattern.test(value)) {
            return 'Please provide a detailed steps for the prepation of this recipe ';
          }
          break;
      default:
        return '';
    }
    return '';
  };


  const handleFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: RecipeFormData = {
      title: validate('title', formData.title),
      id: '',
      desc: validate('desc', formData.desc),
      category: validate('category', formData.category),
      type: validate('type', formData.type),
      img:  validate('img', formData.img),
      time:  validate('time', formData.time),
      ingredients: validate('ingredients', formData.ingredients),
      steps: validate('steps', formData.steps),
      conseil:  validate('conseil', formData.conseil),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      console.log(formData);
      //here the formData is destructed to get the ingredients and steps as we want to save it in an array format
      const { ingredients, steps, ...rest } = formData;
      //this const recipe for us has the actual format needed for ur db.json after doing the split and map for the ingredients and steps 
      const recipe: Recipe = {
        ...rest,
        id: datas.length.toString(), // as my id in data base is a number that increments every time and it starts with zero thats why its lenght would be the next id for next element 
        ingredients: ingredients.split('\n').map((item: string) => item.trim()),//Here each ingredients is split at new line to save in the array of ingredients and later the map is done for the split ingredients to remove any before or after whitespaces
        steps: steps.split('\n').map((item: string) => item.trim()),
       
      };
  
      try {
        const response = await fetch('https://server-json-ecf.vercel.app/recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),
        }
         
        );
  
        if (response.ok) {
          setMsg("Successfully added your recipe");
        }
        if (!response.ok) {
          setMsg("We have encountred error while saving your recipe")
        }
  
        //here the form Data is reset to zero again
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
          conseil:''
        });
      } catch (error) {
        console.error('Failed to add recipe', error);
        alert('Failed to add recipe');
      }
    }
   
  };



  return (<>
    <NavBar />
    <h1 className='title'> Add a new Recipe </h1>
    <div className='title' style={{ color: msg.includes('Successfully') ? 'green' : 'red' }}><h1>{msg}</h1></div>
    <form className="form" onSubmit={handleFormSubmit}>
      <div className="formContainer">
        <div className="first">
          <div className='formTitle'>
            <label htmlFor="title">Title:</label><br />
            <input type="text" id="title" name="title" className='formInput' value={formData.title} onChange={handleInputChange}  />
            {errors.title && <div className='errMsg'>{errors.title}</div>}<br /><br />
          </div>
          <div className='formDesc'>
            <label htmlFor="desc">Description:</label><br />
            <textarea id="desc" name="desc" rows={4} className='formInput' value={formData.desc} onChange={handleInputChange} ></textarea>
            {errors.desc && <div className='errMsg'>{errors.desc}</div>}<br /><br />
          </div>
          <div className='formCat'>
            <label htmlFor="category">Category:</label><br />
            <select id="category" name="category" value={formData.category} onChange={handleInputChange} >
              <option value="">Select a category</option>
              <option value="starter">Starter</option>
              <option value="main course">Main Course</option>
              <option value="dessert">Dessert</option>
            </select>
            {errors.category && <div className='errMsg'>{errors.category}</div>}
          </div>
          <div className='formType'>
            <label htmlFor="type">Type of Cuisine:</label><br />
            <select id="type" name="type" value={formData.type} onChange={handleInputChange} >
              <option value="">Select Type</option>
              <option value="asian">Asian</option>
              <option value="american">American</option>
              <option value="italian">Italian</option>
              <option value="french">French</option>
              <option value="mexican">Mexican</option>

            </select>
            {errors.type && <div  className='errMsg'>{errors.type}</div>}
          </div>
          <div className='formImg'>
            <label htmlFor="img">Image URL:</label><br />
            <input type="text" id="img" name="img" className='formInput' value={formData.img} onChange={handleInputChange}  />
            {errors.img && <div  className='errMsg'>{errors.img}</div>}
            <br /><br />
          </div>
          <div className='formTime'>
            <label htmlFor="time">Time:</label><br />
            <input type="text" id="time" name="time" className='formInput' value={formData.time} onChange={handleInputChange}  />
            {errors.time && <div  className='errMsg'>{errors.time}</div>}
            <br /><br />
          </div>
          <div className='formConseil'>
            <label htmlFor="conseil">Chef's Advice:</label><br />
            <input type="text" id="conseil" name="conseil" className='formInput' value={formData.conseil} onChange={handleInputChange}  />
            {errors.conseil && <div  className='errMsg'>{errors.conseil}</div>}
            <br /><br />
          </div>
        </div>
        <div className="second">
          <div className='formIngredients'>
            <label htmlFor="ingredients">Ingredients (each on a new line):</label><br />
            <textarea id="ingredients" name="ingredients" rows={13} value={formData.ingredients} onChange={handleInputChange} ></textarea>
            {errors.ingredients && <div  className='errMsg'>{errors.ingredients}</div>}
            <br /><br />
          </div>
          <div className='formSteps'>
            <label htmlFor="steps">Steps (each on a new line):</label><br />
            <textarea id="steps" name="steps" rows={13} value={formData.steps} onChange={handleInputChange} ></textarea>
            {errors.steps && <div  className='errMsg'>{errors.steps}</div>}
            <br /><br />
          </div>
          <button className='submit' type="submit">Add Recipe
            <img src='https://api.iconify.design/formkit:submit.svg?color=%23888888' alt='submit' />
          </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default RecipeForm;
