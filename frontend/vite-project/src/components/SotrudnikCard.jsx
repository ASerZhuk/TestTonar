import React from 'react'

export default function SotrudnikCard({ sotrudnik }) {
	return (
		<div className='flex flex-col items-center space-y-6 p-8 bg-gray-50 rounded-lg'>
			{sotrudnik.image_url && (
				<img
					src={sotrudnik.image_url}
					alt={`${sotrudnik.first_name} ${sotrudnik.last_name}`}
					className='w-48 h-48 rounded-full object-cover shadow-lg'
				/>
			)}
			<div className='text-center space-y-4 max-w-2xl'>
				<div>
					<h3 className='text-2xl font-bold text-gray-800 '>
						{sotrudnik.last_name} {sotrudnik.first_name}
					</h3>
					{sotrudnik.profession && (
						<p className='text-xl text-blue-600 mt-2 '>
							{sotrudnik.profession}
						</p>
					)}
				</div>

				{sotrudnik.phone && (
					<p className='text-gray-600'>
						<span className='font-semibold'>Телефон:</span>{' '}
						<a className='text-blue-500 hover:underline'>{sotrudnik.phone}</a>
					</p>
				)}
			</div>
		</div>
	)
}
