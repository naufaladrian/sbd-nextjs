'use client';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
	const [matkul, setMatkul] = useState([]);
	const [choosenMatkul, setChoosenMatkul] = useState();
	const [oldmk, setOldmk] = useState();

	const handleChooseMatkul = (e) => {
		matkul.map((row, index) => {
			if (row.kode_mk === e) {
				setChoosenMatkul(row);
			}
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			await fetch('http://localhost:3000/api/krs', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nim: 'A11.2022.01114',
					kode_mk: choosenMatkul.kode_mk,
					kelp: '101',
					ta: 2024,
					smt: choosenMatkul.semester,
					old_mk: oldmk,
				}),
			});
		} catch (error) {
			console.error(error);
			// notifyFailed();
		}
	};

	useEffect(() => {
		fetch('http://localhost:3000/api/matkul')
			.then((response) => response.json())
			.then((data) => {
				setMatkul(data);
				setChoosenMatkul(data[0]);
			});
	}, []);

	return (
		<div className='min-w-full'>
			<form
				className='grid grid-cols-1 gap-y-4 w-full'
				onSubmit={handleFormSubmit}
			>
				<label htmlFor='nim' className='form-control w-full'>
					<div className='label'>
						<span className='label-text'>NIM</span>
					</div>
					<input
						name='nim'
						id='nim'
						type='text'
						className='input input-bordered w-full'
						value='A11.2022.01114'
						disabled
					/>
				</label>
				<label htmlFor='ta' className='form-control w-full'>
					<div className='label'>
						<span className='label-text'>Tahun Ajar</span>
					</div>
					<input
						name='ta'
						id='ta'
						type='number'
						className='input input-bordered w-full'
						value='2022'
						disabled
					/>
				</label>
				<label htmlFor='kode_mk' className='form-control w-full'>
					<div className='label'>
						<span className='label-text'>OLD MK</span>
					</div>
					<select
						name='kode_mk'
						id='kode_mk'
						className='select select-bordered'
						onChange={(e) => setOldmk(e.target.value)}
						required
					>
						{matkul.map((row, index) => (
							<option value={row.kode_mk} key={index}>
								{row.nama_mk}
							</option>
						))}
					</select>
				</label>
				<label htmlFor='kode_mk' className='form-control w-full'>
					<div className='label'>
						<span className='label-text'>Mata Kuliah</span>
					</div>
					<select
						name='kode_mk'
						id='kode_mk'
						className='select select-bordered'
						onChange={(e) => handleChooseMatkul(e.target.value)}
						required
					>
						{matkul.map((row, index) => (
							<option value={row.kode_mk} key={index}>
								{row.nama_mk}
							</option>
						))}
					</select>
				</label>
				{choosenMatkul ? (
					<div>
						<h1 className='font-semibold'>
							Informasi Mata Kuliah : {choosenMatkul.nama_mk}
						</h1>
						<hr className='my-4' />
						<p>Kode : {choosenMatkul.kode_mk}</p>
						<p>SKS : {choosenMatkul.sks}</p>
						<p>Semester : {choosenMatkul.semester}</p>
						<hr className='my-4' />
					</div>
				) : (
					<p>Belum Memilih</p>
				)}
				<button type='submit' className='btn btn-outline btn-success'>
					Submit
				</button>
			</form>
		</div>
	);
}
