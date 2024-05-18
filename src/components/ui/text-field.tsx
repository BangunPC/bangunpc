import React from 'react'

type paramsProps = {
    label: string
    placeholder: string
    disabled?: boolean
    type?: string
}
const TextField = ({label, placeholder, type}: paramsProps) => {
  return (
    <div className='flex flex-col gap-4 w-full'> 
      <label className="text-lg font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
      <input
        className="h-10 w-full rounded-lg bg-[#F9FAFB] p-3 text-sm outline-none dark:bg-secondary" placeholder={placeholder} type={type}/>
    </div>
  )
}

export default TextField