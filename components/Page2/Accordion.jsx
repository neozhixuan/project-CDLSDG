import React, { useRef, useState } from 'react'

export const Accordion = (props) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease')

  const contentSpace = useRef(null)

  function toggleAccordion() {
    setActive((prevState) => !prevState)
    // @ts-ignore
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`)
    setRotate(active ? 'transform duration-700 ease' : 'transform duration-700 ease rotate-180')
  }

  return (
    <div className="flex flex-col bg-white mt-1 pl-5 w-full">
      <button
        className="flex flex-row justify-between py-4 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p className="inline-block text-footnote light font-semibold text-base sm:text-lg">{props.header}</p>
        <span className='pr-4'>&darr;</span>
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div className="text-xs sm:text-base pb-10 pr-4">{props.content}</div>
      </div>
    </div>
  )
}