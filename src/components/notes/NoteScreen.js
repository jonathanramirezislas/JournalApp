import React,{useEffect, useRef} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
   
    const dispatch = useDispatch();

    //Note active : rename
    const {active:note} = useSelector( state => state.notes );
    const[formValues, handleInputChange, reset] =useForm(note);

    const{ title, body} =formValues;

    //              
    const activeId = useRef(note.id)

    //Due to useform keeps its state becauseand a new note is active does not appears we have to use a effect
    //in other words as the variables weren't declared here thoey arent going to change its values wil keep from the sate from the form
    useEffect(() => {
        //if the note change we set to the activeId in order to avoid infinite cycle and show the new active(note)
        if(note.id !== activeId.current){
            reset(note);//note has title,body, date, etc.. in order to show them in the form
            activeId.current=note.id
        }
       
    }, [note, reset])


    //allows to change the values form
    useEffect(() => {
      
        dispatch(activeNote(formValues.id, {...formValues}));

    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

            <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                <div className="notes__image">
                    {
                     (note.url) &&                        
                        <img 
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                            alt="imagen"
                        />
                        
                    }
                </div>


            </div>

        </div>
    )
}
