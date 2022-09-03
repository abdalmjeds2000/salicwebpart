import React, { useState, useEffect } from 'react';
import './StickyNotes.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'




const StickyNotes = () => {


  const [notes, setNotes] = useState([
    {id: 0, title: 'Hello World 0', description: 'It is a long established fact that a reader will be distracted by the readable content of a page. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'},
    {id: 1, title: 'Hello World 1', description: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'},
    {id: 2, title: 'Hello World 2', description: 'The readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'},
    {id: 3, title: 'Hello World 3', description: 'will be distracted by the readable content of a page. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'},
  ])
  const [currentNote, setCurrentNote] = useState(0);
  const [isActiveEditMode, setIsActiveEditMode] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState(notes.filter(n => n.id === currentNote)[0]?.title);
  const [newNoteDescription, setNewNoteDescription] = useState(notes.filter(n => n.id === currentNote)[0]?.description);


  const saveEdits = () => {
    if(newNoteTitle === '' && newNoteDescription === ''){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Please, edit any text above and try again.',
        timer: 1500,
        showConfirmButton: false
      })
    } else {
      if(currentNote === -1) {
        setNotes(prev => [...prev, {id: prev.length, title: newNoteTitle, description: newNoteDescription}]);
        setCurrentNote(notes.length)
      } else{
        const updatedNotes = notes.map(obj => {
          if (obj.id === currentNote) {
            obj.title = newNoteTitle;
            obj.description = newNoteDescription;
            return {...obj};
          }
          return obj;
        });
        setNotes(updatedNotes);
      }
      setIsActiveEditMode(false)
      Swal.fire({
        icon: 'success',
        title: 'Done!',
        timer: 1000,
        showConfirmButton: false
      })
    }
  }
  const cancelEdits = () => {
    setIsActiveEditMode(false)
    if(currentNote === -1) {
      setCurrentNote(0)
    }
  }


  useEffect(() => {
    setNewNoteTitle('')
    setNewNoteDescription('')
  }, [isActiveEditMode])
  useEffect(() => {
    if(currentNote === -1) {
      setIsActiveEditMode(true)
    }else if(currentNote !== -1) {
      setIsActiveEditMode(false)
    }
  }, [currentNote])


  return (
    <div className='sticky-notes-container'>
      <div className="header">
        <h2>Sticky Notes</h2>
        {
          isActiveEditMode
          ? <div className='action-btns'>
              <button className='action-btn save-btn' onClick={saveEdits}>Save</button>
              <button className='action-btn cancel-btn' onClick={cancelEdits}>Cancel</button>
            </div>
          : <div className='action-btns'>
              <span className='action-btn'><FontAwesomeIcon icon={faTrash} style={{cursor: 'pointer'}} /></span>
              <span className='action-btn'><FontAwesomeIcon icon={faPlus} onClick={() => setCurrentNote(-1)} style={{cursor: 'pointer'}} /></span>
            </div>
        }
      </div>
      <div className="note">

        {
          currentNote === -1
          ? <div className='add-new-form'>
              <input type="Note Title" placeholder='Note Title' onChange={e => setNewNoteTitle(e.target.value)} />
              <textarea name="Note Description" placeholder='Note Description' rows={5} onChange={e => setNewNoteDescription(e.target.value)}></textarea>
            </div>
          : null
        }


        {
          notes.map((n) => {
            return (
              n.id === currentNote && <>
                {
                  isActiveEditMode
                  ? <div className='add-new-form'>
                      <input type="Note Title" onChange={e => setNewNoteTitle(e.target.value)} defaultValue={n.title} />
                      <textarea name="Note Description" rows={5} onChange={e => setNewNoteDescription(e.target.value)} defaultValue={n.description} ></textarea>
                    </div>
                  : <div onClick={() => setIsActiveEditMode(true)}>
                      <h4 className="note-title">
                        {n.title}
                      </h4>
                      <p className="note-description">
                        {n.description}
                      </p>
                    </div>
                }
              </>
            )
          })
        }
      </div>
      <div className='dots'>
        
        {
          notes.map((n) => {
            return (
              <span 
                className={`note3 ${currentNote === n.id ? 'active' : ''}`}
                onClick={(() => setCurrentNote(n.id))}
                style={{pointerEvents: isActiveEditMode && currentNote !== -1 ? 'none' : ''}}
              ></span>
            )
          })
        }
        <span 
          className={`note3 ${currentNote === -1 ? 'active' : ''}`}
          onClick={(() => setCurrentNote(-1))}
          style={{pointerEvents: isActiveEditMode && currentNote === -1 ? 'none' : ''}}
        ></span>
      </div>
    </div>
  )
}


export default StickyNotes