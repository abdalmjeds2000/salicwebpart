import React, { useState, useEffect, useContext } from 'react';
import './StickyNotes.css';
import pnp from 'sp-pnp-js';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AppCtx } from '../../../App';
import { message } from 'antd';



const StickyNotes = () => {
  const { notes_list } = useContext(AppCtx);

  const [notes, setNotes] = useState(notes_list)
  const [currentNote, setCurrentNote] = useState(notes[0]?.Id);
  const [isActiveEditMode, setIsActiveEditMode] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState(notes.filter(n => n.id === currentNote)[0]?.title);
  const [newNoteDescription, setNewNoteDescription] = useState(notes.filter(n => n.id === currentNote)[0]?.description);


  const saveEdits = () => {
    if(newNoteTitle === '' || newNoteDescription === ''){
      message.error("Please, edit Title and Description above and try again.")
    } else {
      if(currentNote === -1) {
        pnp.sp.web.lists.getByTitle('Sticky Notes').items.add({
          Title: newNoteTitle,
          NoteDescription: newNoteDescription, 
        }).then((res) => {
          setNotes(prev => [res.data, ...prev]);
          message.success("Done!")
          setCurrentNote(res.data?.Id)
        }).catch(err => message.success("Failed, Please try again."))
        

        
      } else{
        pnp.sp.web.lists.getByTitle("Sticky Notes").items.getById(currentNote).update({
          Title: newNoteTitle,
          NoteDescription: newNoteDescription, 
        }).then(() => {
          const updatedNotes = notes.map(obj => {
            if (obj.Id === currentNote) {
              obj.Title = newNoteTitle;
              obj.NoteDescription = newNoteDescription;
              return {...obj};
            }
            return obj;
          });
          message.success("Done!")
          setNotes(updatedNotes);
        }).catch((err) => console.log(err))
        
      }
      setIsActiveEditMode(false)
      
    }
  }


  const cancelEdits = () => {
    setIsActiveEditMode(false)
    if(currentNote === -1) {
      setCurrentNote(notes[0]?.Id)
    }
  }


  const onDeleteHandler = (Id) => {
    const newArray = notes.filter(r => r.Id !== Id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C508C',
      cancelButtonColor: '#ff272b',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        pnp.sp.web.lists.getByTitle("Sticky Notes").items.getById(Id).delete()
        .then(() => {
          setNotes(newArray);
          message.success("Your Note has been deleted.")
          .then(() => setCurrentNote(newArray[0]?.Id))
        })
        .catch((err) => console.log(err))
        
      }
    })
    
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
              <span className='action-btn' onClick={() => onDeleteHandler(currentNote)}><FontAwesomeIcon icon={faTrash} style={{cursor: 'pointer'}} /></span>
              <span className='action-btn' onClick={() => setCurrentNote(-1)}><FontAwesomeIcon icon={faPlus} style={{cursor: 'pointer'}} /></span>
            </div>
        }
      </div>
      <div className="note">

        {
          currentNote === -1
          ? <div className='add-new-form'>
              <input type="Note Title" placeholder='Note Title' onChange={e => setNewNoteTitle(e.target.value)} />
              <textarea name="Note Description" placeholder='Note Description' rows={7} onChange={e => setNewNoteDescription(e.target.value)}></textarea>
            </div>
          : null
        }


        {
          notes?.map((n) => {
            return (
              n?.Id === currentNote && <>
                {
                  isActiveEditMode
                  ? <div className='add-new-form'>
                      <input type="Note Title" onChange={e => setNewNoteTitle(e.target.value)} defaultValue={n.Title} />
                      <textarea name="Note Description" rows={5} onChange={e => setNewNoteDescription(e.target.value)} defaultValue={n.NoteDescription} ></textarea>
                    </div>
                  : <div onClick={() => setIsActiveEditMode(true)}>
                      <h4 className="note-title">
                        {n.Title}
                      </h4>
                      <p className="note-description">
                        {n.NoteDescription}
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
                className={`note3 ${currentNote === n?.Id ? 'active' : ''}`}
                onClick={(() => setCurrentNote(n?.Id))}
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