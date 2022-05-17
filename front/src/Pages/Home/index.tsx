import { useState } from 'react';
import styles from './styles.module.css';

export default function Home() {
	const [userName, setUsername] = useState('');

	function load() {
		console.log('Is Loading');
	}

	return (
		<div data-testid="Batata">
			<input
				className={styles.button}
				type="text"
				data-testid="inputNewItem"
				placeholder="Username"
				value={userName}
				onChange={e => setUsername(e.target.value)}
			/>
			<button type="button" onClick={load} className="bg-brand-500">
				Buscar
			</button>

			<div className={styles.content}>
				<p>Aqui será colocado o result</p>
			</div>
		</div>
	);
}
