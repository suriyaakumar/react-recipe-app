import React, { Component } from 'react';
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon} from 'react-share';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY; 


class Recipe extends Component{
state = {
  recipe: [],
  ingredients: []
}

componentDidMount() {
Axios.get('https://api.spoonacular.com/recipes/'+this.props.match.params.id+`/information?apiKey=${API_KEY}`).then(res => {
this.setState({
        recipe: res.data,
        ingredients: res.data.extendedIngredients
    });
});
}

    render(){
  
     const detail = this.state.ingredients ? this.state.ingredients.map((ingredient) => {
         return(<li className="collection-item flow-text center" key={Math.random()}>{ingredient.originalString}</li>)
     }) : (<li className="collection-item flow-text center">Ingredients of this recipe is not available</li>);
   
    const cuisineChips = this.state.recipe.cuisines ? this.state.recipe.cuisines.map((cuisine) => {
        return(<div className="chip black white-text">{cuisine}</div>)
    }) : null;

    const instructionList = this.state.recipe.analyzedInstructions 
    ? (this.state.recipe.analyzedInstructions.map(
      (instruction) => { return(instruction.steps.map((step) => {return(<li key={Math.random()} className="flow-text">{step.step}</li>)})) 
    })) : (<li className="instructions flow-text">Instructions are not available for this recipe</li>);    

     return(
        <div className="container">
            <div className="section">
            <h4 className="center header">{this.state.recipe.title}</h4>
            <h6 className="center-align"><a href={this.state.recipe.sourceUrl}>{this.state.recipe.sourceName}</a></h6>
            <div className="row center">
               <FacebookShareButton url={"https://reacipe.netlify.app/recipe/" + this.state.recipe.id} title={this.state.recipe.title} ><FacebookIcon size={36}/></FacebookShareButton>
               <TwitterShareButton title={this.state.recipe.title} url={"https://reacipe.netlify.app/recipe/" + this.state.recipe.id}><TwitterIcon size={36}/></TwitterShareButton>
               <PinterestShareButton url={"https://reacipe.netlify.app/recipe/" + this.state.recipe.id} media={this.state.recipe.image}><PinterestIcon size={36}/></PinterestShareButton>
            </div>
            </div>
            <div className="divider"></div>
            <div className="section">
                <div className="row">
                   <div className="col s12 m8">
                       <div className="card z-depth-2">
                           <div className="card-image">
                             <img className="responsive-img" src={this.state.recipe.image} alt="Loading" />
                           </div>
                       </div>
                   </div>
                   <div className="col s12 m4">
                        <h4 className="center header">Summary</h4>
                        <div className="row">
                            {this.state.ingredients.length 
                            ? <div className="col s6 m6">
                              <p className="flow-text center instructions">{this.state.ingredients.length}</p>  
                              <p className="flow-text center instructions">Ingredients</p>  
                            </div> : null}
                            {this.state.recipe.readyInMinutes 
                            ? <div className="col s6 m6">
                                <p className="flow-text center instructions">{this.state.recipe.readyInMinutes}</p>
                                <p className="flow-text center instructions">Minutes</p>
                            </div> : null}
                           </div>
                           <div className="row"> 
                            {this.state.recipe.healthScore 
                            ? <div className="col s6 m6">
                                <p className="flow-text center instructions">{this.state.recipe.healthScore}</p>
                                <p className="flow-text center instructions">Health Score</p>
                            </div> : null}
                            {this.state.recipe.servings 
                             ? <div className="col s6 m6">
                                <p className="flow-text center instructions">{this.state.recipe.servings}</p>
                                <p className="flow-text center instructions">Servings</p>
                            </div> : null}
                        </div>
                   </div>
                </div>
            </div>
            <div className="row">
            <h4 className="center header">Labels</h4>
            <div className="center">
                            {this.state.recipe.vegetarian 
                            ? (<div className="chip green white-text">Veg</div>) 
                            : (<div className="chip red white-text">Non-Veg</div>)}
                            {this.state.recipe.veryHealthy 
                            ? (<div className="chip">Healthy</div>) 
                            : null}
                            {this.state.recipe.veryPopular
                            ? (<div className="chip">Popular</div>) 
                            : null}
                            {this.state.recipe.vegan
                            ? (<div className="chip">Vegan</div>) 
                            : null}
                            {this.state.recipe.glutenFree
                            ? (<div className="chip blue darken-2 white-text">Gluten-Free</div>) 
                            : null}
                            {this.state.recipe.dairyFree
                            ? (<div className="chip black white-text">Dairy-Free</div>) 
                            : (<div className="chip green white-text">Dairy</div>)}
                            {this.state.recipe.sustainable
                            ? (<div className="chip yellow white-text">Sustainable</div>) 
                            : null}
                            {cuisineChips}
                        </div>
            </div>
            <div className="section">
             <ul className="collection with-header">
             <li className="collection-header center"><h4 className="header">Ingredients</h4></li>
             {detail}
             </ul>
            </div>
           <div className="section">
            <h4 className="center header">Instructions</h4>
             <ol>{instructionList}</ol> 
           </div>
        </div>
    )
  } 
}

export default withRouter(Recipe);