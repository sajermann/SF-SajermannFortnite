import {
	DetailedHTMLProps,
	FormEvent,
	FormHTMLAttributes,
	useEffect,
	useState,
} from 'react';
import Button from '../../Components/Button';
import Tabs from '../../Components/Tabs';
import getStatsUser from '../../Services/Stats';
import UserType from '../../Types/UserType';
import styles from './styles.module.css';

export default function Home() {
	const [userName, setUsername] = useState('Alemão-2021');
	const [isLoading, setIsLoading] = useState(false);
	const [userSelected, setUserSelected] = useState<UserType | null>(null);

	useEffect(() => console.log(userSelected), [userSelected]);

	async function load() {
		setIsLoading(true);
		const result = await getStatsUser(userName);
		setUserSelected(result);
		setIsLoading(false);
	}

	function handleSubmit(event: FormEvent) {
		console.log('Submit');
		event.preventDefault();
		load();
	}

	return (
		<>
			<form className="w-full max-w-sm flex m-2 gap-1" onSubmit={handleSubmit}>
				<input
					className={styles.input}
					type="text"
					data-testid="inputNewItem"
					placeholder="Username"
					value={userName}
					onChange={e => setUsername(e.target.value)}
				/>
				<Button isLoading={isLoading} disabled={isLoading} type="submit">
					Pesquisar
				</Button>
			</form>
			<Tabs infos={userSelected} />
		</>
	);
}
