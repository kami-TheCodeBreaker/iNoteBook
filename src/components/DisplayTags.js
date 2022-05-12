import React from 'react'

function DisplayTags(props) {
  return (
    <div className="text-black  flex gap-1 flex-wrap">
    {props.tags.map((value) => {
      return (
        <div
          className="value py-1 px-2 rounded-md text-white bg-green-600 "
          key={value}
        >
          {value.replace(',','')}
        </div>
      );
    })}
  </div>
  )
}

export default DisplayTags