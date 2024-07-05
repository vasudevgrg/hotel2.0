import React from 'react'

const MainPage = () => {

    React.useEffect(()=>{
        fetch("http://localhost:5002/")
    })
  return (
    <div>MainPage</div>
  )
}

export default MainPage