import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
	if (!isOpen) return null
	return (
		<div className='fixed inset-0 z-50'>
			<div className='fixed inset-0 bg-black/50' onClick={onClose} />
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<div className='bg-white rounded-lg shadow-xl w-full max-w-xl relative max-h-[90vh] flex flex-col'>
					<button
						onClick={onClose}
						className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
					<div className='p-6 overflow-y-auto'>{children}</div>
				</div>
			</div>
		</div>
	)
}
