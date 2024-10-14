import React from 'react'

function ListItem({ todo, fetchlistDetails }) {
    console.log(todo);
    return (
      <>
          <div className="bg-white text-black p-3 h-48 w-60 flex flex-col text-balance justify-between">
                <h3>ID: { todo?.id}</h3>
              <p>{ todo?.todo}</p>
                <p>completed: { todo?.completed?'Yes':'No'}</p>
                <p>userId: { todo?.userId}</p>
          <button onClick={()=>{fetchlistDetails(todo?.id)}} className='bg-gray-700 hover:bg-black text-white'>Show Details</button>
            </div>
        </>
      
  )
}

export default ListItem

const singleToDo= {
  "id": 1,
  "todo": "Do something nice for someone I care about",
  "completed": true,
  "userId": 26
}