import React, { useRef, useState } from 'react'
import {BsChevronDown} from "react-icons/bs"
import theme from '../css/theme.json'
function Faq({data}) {
    const iconref=useRef(null)
    const questionref=useRef(null)
    const [open, setopen] = useState(false)
    const toggleanswer = (e) => {
        setopen(!open)
        iconref.current.classList.toggle('rotate')
        if(!open){
            questionref.current.style.color=theme.colors.primaryGreen
        }else{
            questionref.current.style.color="rgba(255, 255, 255,0.8)"
        }
    }
    return (
        <div className="faq-card" >
            <div className="faq-question" onClick={toggleanswer} ref={questionref}>
                <div>
                   {data.question}
                </div>
                <div className="down-icon" ref={iconref}><BsChevronDown  /></div>
            </div>
            {
                open &&
                <div className="faq-answer">
                    {data.answer}
                </div>
            }

        </div>
    )
}

export default Faq