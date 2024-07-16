import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom"
import NavBar from "./Navbar";
interface Detail {
    id: string;
    title: string;
    desc: string;
    ingredients: { [key: string]: string } ;
    steps: { [key: string]: string };
    category: string;
    img: string;
    isFavorite: boolean;
}


export default function RecipeDetail() {
    let params = useParams();
    
    const [resRecipe, setResRecipe] = useState<Detail |any>({});
    useEffect(() => {
    //Runs only on the first render
 
      
    async function fetchData() {
        try {

            const response = await fetch('http://localhost:3000/recipe/'+params.id);
            const datas = await response.json(); 
            if (datas) {
                setResRecipe(datas);
                console.log("resRecipe", resRecipe);

            }
        } catch (err) {
            setResRecipe([]);
        }
    }
 fetchData();

     

    }, []);
    
    
  
    return (<>
       <NavBar />
        <section className="mainContainer">
            <h1  style={{ textAlign: 'center' }}>Details of the Recipe </h1>
          
            {resRecipe && (
                    <div className="detailContainer">
                        <img src={resRecipe.img} alt={resRecipe.title} className="imgDetail" />
                        <div className="infoRecipe">
                            <h2>{resRecipe.title}</h2>
                            <br />
                            <h3>Time :- {resRecipe.time}</h3>
                            <h4>Category:- {resRecipe.category?.toUpperCase()}</h4>
                            <p className="desc">{resRecipe.desc}</p>
                            <ul>INGREDIENTS -<br />
                                {resRecipe.ingredients ? (
                                Object.keys(resRecipe.ingredients).map((key) => (
                                <li key={key}  className="list">
                                {resRecipe.ingredients[key]}
                                </li>
                                ))
                                ) : (
                                <li>No ingredients found</li>
                                )}
                        </ul><br />
                        <ul >STEPS -<br/>
                                {resRecipe.steps ? (
                                Object.keys(resRecipe.steps).map((key) => (
                                <li key={key}  className="list">
                                {resRecipe.steps[key]}
                                </li>
                                ))
                                ) : (
                                <li>No steps found</li>
                                )}
                            </ul>
                        </div>
                    </div>
            )}
           
        </section>
        </>
      
    )
}