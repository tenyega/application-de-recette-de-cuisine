import  { useState } from 'react';
import NavBar from './Navbar';

interface Recipe {
  id: number;
  title: string;
  desc: string;
  img: string;
  time: string;
  category: string;
  type: string;
}

export default function RecipeForm() {
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: 0, // You can generate a unique ID in a real application
    title: '',
    desc: '',
    img: '',
    time: '',
    category: '',
    type:''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending data to API or saving in state
    console.log('New Recipe:', newRecipe);
    // Clear the form after submission (optional)
    setNewRecipe({
      id: 0,
      title: '',
      desc: '',
      img: '',
      time: '',
      category: '',
      type:''
    });
  };

  return (
      <div>
          <NavBar />
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input
            type="text"
            name="title"
            value={newRecipe.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>Description:
          <textarea
            name="desc"
            value={newRecipe.desc}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>Image URL:
          <input
            type="text"
            name="img"
            value={newRecipe.img}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>Preparation Time:
          <input
            type="text"
            name="time"
            value={newRecipe.time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>Category:
          <input
            type="text"
            name="category"
            value={newRecipe.category}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};


