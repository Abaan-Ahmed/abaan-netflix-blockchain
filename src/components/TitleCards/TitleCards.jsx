import React from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

  const cardsRef = React.useRef();
  const shuffledCards = [...cards_data].sort(() => Math.random() - 0.5);


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  React.useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {shuffledCards.map((card, index) => {
          return <Link to={`/player/1`} className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards