import React, { Component } from 'react';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY; 

class Feed extends Component {
  state = {
    list: [],
    query: ''
  }
  
  componentDidMount(){
   Axios.get(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`).then(res => {
      this.setState({
      list: res.data.recipes
    });
  }); 
   }

   returnResults = (e) => {
    e.preventDefault();
    Axios.get('https://api.spoonacular.com/recipes/complexSearch?query='+this.state.query+`&apiKey=${API_KEY}`).then(res => {
    this.setState({
        list: res.data.results
      });
    }); 
    }
   
  handleChange = (e) => {
     this.setState({
       query: e.target.value
     });
   }
  
 render(){
  
  const rows = this.state.list.reduce(function (rows, key, index) { 
    return (index % 2 === 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows;
  }, []); // converting an array of objects containing 1 recipe each into an array of objects containing 2 recipes.

const rowsList = this.state.list.length 
? ( rows.map((row) => {
 return(
   <div className="row" key={Math.random()}>
     <div className="col s12 m5">
         <div className="card medium z-depth-4">
           <div className="card-image">
             <img alt="" className="responsive-img" src={row[0].image}/> 
           </div> 
           <div className="card-content">
             <span className="card-title flow-text center">{row[0].title}</span>
              <div className="card-action center">
               <Link to={`/recipe/${row[0].id}`} className="blue-text">VIEW MORE</Link>
             </div>
         </div>
         </div>
     </div>
     {
     row[1] ? (
    <div className="col s12 m5 offset-m2">
        <div className="card medium  z-depth-4">
        <div className="card-image">
        <img alt="" className="responsive-img" src={row[1].image}/>
        </div>
        <div className="card-content">
        <span className="card-title center">{row[1].title}</span>
        <div className="card-action center">
          <Link to={`/recipe/${row[1].id}`}  className="blue-text">VIEW MORE</Link>
        </div>
        </div>
        </div>
     </div>) : null 
    } 
   </div>
 )
}) ) 
: (<p className="center flow-text">LOADING</p>)
  
  return(
   <div>
     <div className="reacipe-background parallax-container">
        <div className="container">
        <h2 className="header center yellow-text row">SEARCH FROM  OVER 350,000  RECIPES AND  LEARN HOW TO  MAKE 'EM</h2>   
        <form onSubmit={this.returnResults} className="row">   
        <div className="input-field valign-wrapper col s12 m8 offset-m2">
          <input type="text" className="black-text" onChange={this.handleChange} value={this.state.query}/>
          <button type="submit" className="black btn" onClick={this.handleClick}>
            <i class="fa fa-search"></i> 
          </button>
        </div> 
        </form>
         </div>   
       </div>
     <div className="container">
        <h3 className="header center section">RECIPES</h3>
        {rowsList}
     </div>
   </div>
  )
}
}

export default withRouter(Feed);

