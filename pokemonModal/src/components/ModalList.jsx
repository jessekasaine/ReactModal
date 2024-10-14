import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import ListItem from './ListItem';

function ModalList() {
    const [fetched, setFetched] = useState([]);
    //const [loading, setLoading] = useState(false);
    //const [errorMsg, setErrorMsg] = useState(null);
    const [listDetails, setListDetails] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const dialogRef = useRef(null);

    useEffect(() => {
        fetchListOToDos();
        
        // return () => {
        // dialogRef.current?.removeEventListener('close', closeModal)
        // }
    }, [])
    
    async function fetchListOToDos() {
        try {
            setFetched(true)
            const apiResponse = await fetch('https://dummyjson.com/todos');
            const result = await apiResponse.json();
            console.log(result);
            
            if (result?.todos && result?.todos?.length > 0) {
                setFetched(result?.todos)
                setLoading(false)
                setErrorMsg('')
            } else {
                setFetched([])
                setLoading(false)
                setErrorMsg('')
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchlistDetails(getListDetailId) {
        try {
            const apiResponse = await fetch(`https://dummyjson.com/todos/${getListDetailId}`);
            const details = await apiResponse.json()
            console.log(details)
            dialogModelClick();
            if (details) {
                setListDetails(details)
                setOpenModal(true)
            } else {
                setListDetails(null)
                setOpenModal(false)
            }
        } catch (error) {
            setListDetails(null)
            setOpenModal(false)
            console.log(error);    
        }
        
    }

    function dialogModelClick() {
        //setListDetails(details);
        dialogRef.current?.showModal();
        document.body.style.overflow = 'hidden'
        dialogRef.current?.addEventListener('close', closeModal)
    }
    function closeModal() {
        dialogRef.current?.close();
        setListDetails(null);
        document.body.style.overflow = ''
        dialogRef.current?.addEventListener('close', closeModal)
    }

  return (
    <div className='flex flex-col items-center'>
          <h1 className='mb-5'>Simple ToDoList</h1>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4  grid-cols-1 gap-10'>
              {
                  fetched && fetched.length > 0 ?
                      fetched.map(fetchedItem => {
                          return <ListItem fetchlistDetails={fetchlistDetails} todo={ fetchedItem} />
                      }) : <p>Fetching data...</p>
              }
          </div>              
          <dialog ref={dialogRef} className='p-3 h-48 w-60 rounded-lg relative backdrop:bg-gray-900/50'>
              {listDetails && (
                  <div>
                      <h3 className='mb-2'>{listDetails?.todo}</h3>
                      <p>Completed: { listDetails?.completed?'Yes':'No'}</p>
                      <p>UserId: { listDetails?.userId}</p>
                    <button onClick={closeModal} className='absolute bottom-3 left-3 bg-black text-white py-1 px-2 rounded-md'>Close</button>
                  </div>
              )}
          </dialog>
    </div>
  )
}

export default ModalList
