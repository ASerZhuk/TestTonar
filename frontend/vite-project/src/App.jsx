import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Modal from './components/Modal'
import DirectorCard from './components/DirectorCard'
import DepartmentCard from './components/DepartmentCard'
import OtdelCard from './components/OtdelCard'
import SotrudnikCard from './components/SotrudnikCard'

export default function App() {
	const [direktora, setDirektora] = useState([])
	const [departments, setDepartments] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedDepartment, setSelectedDepartment] = useState(null)
	const [sotrudniki, setSotrudniki] = useState([])
	const [loading, setLoading] = useState(false)
	const [expandedDepartment, setExpandedDepartment] = useState(null)
	const [otdels, setOtdels] = useState([])
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/api/departaments')
			.then(response => {
				const allData = response.data
				const dir = allData.filter(
					item =>
						item.name.toLowerCase().includes('генеральный директор') ||
						item.name.toLowerCase().includes('финансовый директор')
				)
				const dep = allData.filter(
					item =>
						!item.name.toLowerCase().includes('генеральный директор') &&
						!item.name.toLowerCase().includes('финансовый директор')
				)
				setDepartments(dep)
				setDirektora(dir)
			})
			.catch(error => console.error('Ошибка при получении данных:', error))
	}, [])

	const getSotrudniki = useCallback(async data => {
		try {
			setIsModalOpen(true)
			setLoading(true)

			let url
			if (data.type === 'department') {
				url = `http://127.0.0.1:8000/api/departaments/${data.departmentId}/sotrudniks`
			} else if (data.type === 'otdel') {
				url = `http://127.0.0.1:8000/api/departaments/${data.departmentId}/otdels/${data.otdelId}/sotrudniks`
			} else if (data.type === 'subotdel') {
				url = `http://127.0.0.1:8000/api/departaments/${data.departmentId}/otdels/${data.otdelId}/sub-otdels/${data.subOtdelId}/sotrudniks`
			}

			const response = await axios.get(url)
			setSotrudniki(response.data)
		} catch (error) {
			console.error('Ошибка при получении списка сотрудников:', error)
		} finally {
			setLoading(false)
		}
	}, [])

	const handleDepartmentClick = useCallback(
		async department => {
			try {
				if (expandedDepartment === department.id) {
					setExpandedDepartment(null)
					setOtdels([])
					return
				}

				const otdelsResponse = await axios.get(
					`http://127.0.0.1:8000/api/departaments/${department.id}/otdels`
				)

				setSelectedDepartment(department)
				await getSotrudniki({
					type: 'department',
					departmentId: department.id,
				})

				if (otdelsResponse.data.length > 0) {
					const otdelsWithSubotdels = await Promise.all(
						otdelsResponse.data.map(async otdel => {
							const subotdelsResponse = await axios.get(
								`http://127.0.0.1:8000/api/departaments/${department.id}/otdels/${otdel.id}/sub-otdels`
							)
							return {
								...otdel,
								department_id: department.id,
								has_subotdels: subotdelsResponse.data.length > 0,
								subotdels: subotdelsResponse.data,
							}
						})
					)

					setExpandedDepartment(department.id)
					setOtdels(otdelsWithSubotdels)
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		},
		[expandedDepartment, getSotrudniki]
	)

	const handleOtdelClick = useCallback(
		async data => {
			try {
				setSelectedDepartment(data)
				await getSotrudniki(data)

				if (data.type === 'otdel' && data.has_subotdels) {
					setIsExpanded(true)
				}
			} catch (error) {
				console.error('Ошибка при получении списка сотрудников:', error)
			}
		},
		[getSotrudniki]
	)

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false)
		setTimeout(() => {
			setSelectedDepartment(null)
			setSotrudniki([])
		}, 200)
	}, [])

	return (
		<div className='container mx-auto px-4 py-8 max-w-7xl'>
			<div className='flex justify-center mb-12'>
				<img src='https://tonar.info/bitrix/templates/legeart_new/img/logo-new.png' />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
				{direktora.map(director => (
					<DirectorCard
						key={director.id}
						director={director}
						onClick={handleDepartmentClick}
						isActive={isModalOpen && selectedDepartment?.id === director.id}
					/>
				))}
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{departments.map(department => (
					<React.Fragment key={department.id}>
						<div className='relative'>
							<DepartmentCard
								department={department}
								onClick={handleDepartmentClick}
								isActive={
									(isModalOpen && selectedDepartment?.id === department.id) ||
									expandedDepartment === department.id
								}
							/>
							{expandedDepartment === department.id && (
								<div className='absolute -bottom-3 left-0 right-0 flex justify-center z-10'>
									<div className='w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-blue-900/85 border-r-[12px] border-r-transparent' />
								</div>
							)}
						</div>
						{expandedDepartment === department.id && (
							<div className='col-span-full bg-blue-900 rounded-lg p-4 shadow-inner'>
								<div className='overflow-x-auto'>
									<div className='flex gap-4 pb-2 min-w-max'>
										{otdels.map(otdel => (
											<div key={otdel.id} className='w-64'>
												<OtdelCard otdel={otdel} onClick={handleOtdelClick} />
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</React.Fragment>
				))}
			</div>

			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<div className='w-full text-center'>
					{loading ? (
						<div className='flex justify-center items-center py-8'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900'></div>
						</div>
					) : (
						<div className='grid gap-8'>
							{sotrudniki.length > 0 ? (
								sotrudniki.map(sotrudnik => (
									<SotrudnikCard key={sotrudnik.id} sotrudnik={sotrudnik} />
								))
							) : (
								<div className='py-8 text-gray-500'>
									Нет данных о сотрудниках
								</div>
							)}
						</div>
					)}
				</div>
			</Modal>
		</div>
	)
}
