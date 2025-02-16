import React from 'react'

export default function DepartmentCard({ department, onClick, isActive }) {
	return (
		<div
			className={`relative h-20 rounded-lg overflow-hidden group hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer active:scale-95
                ${isActive ? 'shadow-xl -translate-y-2' : ''}
            `}
			onClick={() => onClick(department)}
		>
			<img
				src={department.image_url}
				alt={department.name}
				className='absolute inset-0 w-full h-full object-cover'
			/>
			<div
				className={`absolute inset-0 transition-colors duration-300 
                    ${
											isActive
												? 'bg-blue-900/85'
												: 'bg-blue-900/50 group-hover:bg-blue-900/85'
										}`}
			></div>
			<div className='absolute inset-0 flex items-center justify-center p-4'>
				<h3 className='text-sm font-normal text-white text-center drop-shadow-lg select-none'>
					{department.name}
				</h3>
			</div>
		</div>
	)
}
