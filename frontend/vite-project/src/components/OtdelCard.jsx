import React, { useState } from 'react'
import SubOtdelCard from './SubOtdelCard'

export default function OtdelCard({ otdel, onClick }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleClick = async () => {
		onClick({
			type: 'otdel',
			departmentId: otdel.department_id,
			otdelId: otdel.id,
		})

		if (otdel.has_subotdels) {
			setIsExpanded(!isExpanded)
		}
	}

	const handleSubOtdelClick = subotdel => {
		onClick({
			type: 'subotdel',
			departmentId: otdel.department_id,
			otdelId: otdel.id,
			subOtdelId: subotdel.id,
		})
	}

	return (
		<div className='space-y-2'>
			<div
				className={`bg-white rounded p-3 shadow-sm hover:shadow-md transition-all cursor-pointer
					${isExpanded ? 'bg-blue-50 shadow-md' : ''}`}
				onClick={handleClick}
			>
				<div className='flex items-center justify-between'>
					<h4 className='text-sm text-gray-700 select-none'>{otdel.name}</h4>
					{otdel.has_subotdels && (
						<svg
							className={`w-4 h-4 text-blue-900 transform transition-transform ${
								isExpanded ? 'rotate-180' : ''
							}`}
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					)}
				</div>
			</div>

			{isExpanded && (
				<div className='pl-4 space-y-2'>
					{otdel.subotdels?.map(subotdel => (
						<SubOtdelCard
							key={subotdel.id}
							subotdel={subotdel}
							onClick={() => handleSubOtdelClick(subotdel)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
