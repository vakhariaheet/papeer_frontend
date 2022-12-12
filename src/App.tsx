import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	const [paperInfo, setPaperInfo] = useState({
		exam: '',
		subject: '',
		year: '',
		semester: '',
		course: '',
		code: '',
		examType: 'Theory',
	});
	const [uploadedFiles, setUploadedFiles] = useState<any>([]);
	const [file, setFile] = useState<any>(null);
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/all`)
			.then((res) => res.json())
			.then((data) => {
				setUploadedFiles(data.data);
			});
	}, []);
	const onUpload = async (e: any) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const query = Object.keys(paperInfo)
				.map((key) => {
					return key + '=' + (paperInfo as any)[key];
				})
				.join('&');

			const data = await fetch(
				`${import.meta.env.VITE_API_URL}/upload?${query}`,
				{
					method: 'POST',
					body: formData,
				},
			);
			if (data.status !== 200) {
				toast.error('Please Check all the fields are filled correctly');
				return;
			}
			await fetch(`${import.meta.env.VITE_API_URL}/all`)
				.then((res) => res.json())
				.then((data) => {
					setUploadedFiles(data.data);
				});
			setPaperInfo({
				exam: '',
				subject: '',
				year: '',
				semester: '',
				course: '',
				code: '',
				examType: 'Theory',
			});
			setFile('');
			toast.success('File Uploaded Successfully', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} catch (err) {
			console.log(err);
			toast.error(
				'Something went wrong,Please Check all the fields are filled correctly',
			);
		}
	};
	return (
		<div>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<h1 className='text-6xl mb-12'>Papeer</h1>
			<div className='flex flex-col justify-center items-center gap-2'>
				<input
					type='text'
					value={paperInfo.exam}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, exam: e.target.value });
					}}
					placeholder='Exam Name'
					list='exam'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				<datalist id='exam'>
					<option value='Second Sessional' />
					<option value='University' />
				</datalist>
				<input
					type='text'
					value={paperInfo.course}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, course: e.target.value });
					}}
					placeholder='Course Name'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				<input
					type='text'
					value={paperInfo.subject}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, subject: e.target.value });
					}}
					placeholder='Subject Name'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				<input
					type='number'
					value={paperInfo.year}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, year: e.target.value });
					}}
					min={1}
					max={4}
					placeholder='Year'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				<input
					type='number'
					value={paperInfo.semester}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, semester: e.target.value });
					}}
					min={1}
					max={8}
					placeholder='Semester'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				<input
					type='text'
					value={paperInfo.examType}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, examType: e.target.value });
					}}
					placeholder='Exam Type'
					list='examType'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				<datalist id='examType'>
					<option value='Theory' />
					<option value='Pratical' />
				</datalist>
				<input
					type='text'
					value={paperInfo.code}
					onChange={(e) => {
						setPaperInfo({ ...paperInfo, code: e.target.value });
					}}
					placeholder='Code'
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
				/>
				{file ? (
					<div className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full flex justify-between'>
						<p>{file.name}</p>
						<button onClick={() => setFile('')}>
							<svg width={24} height={24} x={0} y={0} viewBox='0 0 512 512'>
								<g>
									<path
										d='m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0'
										fill='#000000'
										data-original='#000000'
									/>
									<path
										d='m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0'
										fill='#000000'
										data-original='#000000'
									/>
									<path
										d='m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0'
										fill='#000000'
										data-original='#000000'
									/>
								</g>
							</svg>
						</button>
					</div>
				) : (
					<div className='w-full flex justify-center'>
						<input
							type='file'
							id='file'
							onChange={(e: any) => {
								setFile(e?.target?.files[0]);
							}}
							value={file?.filename}
							style={{ display: 'none' }}
						/>
						<label
							className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full cursor-pointer'
							htmlFor='file'
						>
							Choose File
						</label>
					</div>
				)}

				<button
					className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full'
					onClick={onUpload}
				>
					Upload
				</button>
				<h3 className='text-4xl my-4'>Uploaded Files</h3>
				{uploadedFiles.length === 0 && (
					<p className='text-xl text-gray-400'>No files uploaded yet</p>
				)}
				{uploadedFiles.map((file: any) => (
					<div className='block p-2 bg-white border border-gray-500 focus:border-gray-800 text-black text-lg rounded-md max-w-xl w-full flex justify-between'>
						<p>{file.url.split('/')[file.url.split('/').length - 1]}</p>
						<a href={file.url}>
							<svg width={24} height={24} x={0} y={0} viewBox='0 0 32 32'>
								<g>
									<g
										id='a9148db4-8702-4948-b3d7-c33f0782daf4'
										data-name='Download'
									>
										<path
											d='m28 24v-4a1 1 0 0 0 -2 0v4a1 1 0 0 1 -1 1h-18a1 1 0 0 1 -1-1v-4a1 1 0 0 0 -2 0v4a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3zm-6.38-5.22-5 4a1 1 0 0 1 -1.24 0l-5-4a1 1 0 0 1 1.24-1.56l3.38 2.7v-13.92a1 1 0 0 1 2 0v13.92l3.38-2.7a1 1 0 1 1 1.24 1.56z'
											fill='#000000'
											data-original='#000000'
										/>
									</g>
								</g>
							</svg>
						</a>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
