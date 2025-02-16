import React from 'react'

export default function SubOtdelCard({ subotdel, onClick }) {
	return (
		<div
			className='bg-white/80 rounded p-2 shadow-sm hover:shadow-md transition-all cursor-pointer'
			onClick={() => onClick(subotdel)}
		>
			<h5 className='text-sm text-gray-600 select-none'>{subotdel.name}</h5>
		</div>
	)
}
