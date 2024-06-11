'use client';
import { useState, useEffect } from 'react';

export default function Home() {
	const [krs, setKrs] = useState('');
	const getKrs = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/krs');
			if (!res) {
				throw new Error('Failed to fetch KRS data');
			}
			const json = await res.json();
			console.log(json);
			setKrs(json);
		} catch (error) {
			console.error(error);
			// Handle the error here, e.g. set an error state or show an error message
		}
	};

	useEffect(() => {
		getKrs();
	}, []);

	return (
		<div>
			<div className='overflow-x-auto border border-slate-700 rounded-xl p-4'>
				<table className='table '>
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>NIM</th>
							<th>Kode Mata Kuliah</th>
							<th>Kelompok</th>
							<th>Tahun Ajaran</th>
							<th>Semester</th>
						</tr>
					</thead>

					<tbody>
						{krs ? (
							krs.map((row, index) => (
								<tr className='hover' key={index}>
									<th>{index + 1}</th>
									<td>{row.nim}</td>
									<td>{row.kode_mk}</td>
									<td>{row.kelp}</td>
									<td className='text-right'>{row.ta}</td>
									<td className='text-right'>{row.smt}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='6' className='text-center'>
									belum ada krs
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
