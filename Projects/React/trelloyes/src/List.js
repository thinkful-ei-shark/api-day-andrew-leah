import React from 'react';
import Card from './Card';
import './List.css';

/*
The List component should render markup matching the design.html: a section with a class of 'List', 
containing a header and div with class 'List-cards'.

The List component accepts 2 props: header and cards.
header is a string of the header of the card to render.

cards is an array of card objects. Each object should have a title and content.
These props will be passed in for each List from the App component.
The List should render a Card component for each of the cards in the cards array prop.
Each instance of the Card component should be passed 2 props (and a key). The 2 props are title and content.
The title prop is a string for the Card's title.
The content prop is a string of the Card's content.


<section class="List">
        <header class="List-header">
          <h2>First list</h2>
        </header>
        <div class="List-cards">
          <div class="Card">
            <button type="button">delete</button>
            <h3>First card</h3>
            <p>lorem ipsum</p>
          </div>

*/

//not sure if props.list OR props.card are correct.


function List(prop){
    return (
        <section className='List'>
            <header>
                <h2>{prop.header}</h2> 
            </header>
            <div className='List-cards'>
                {prop.cards.map((card) => (
                <Card key={card.id} title={card.title} content={card.content} />
                       ))}
                <button type="button" class="List-add-button">
                + Add Random Card
                </button>
            </div>
        </section>
    )
}



export default List;