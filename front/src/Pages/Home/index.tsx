import {
	DetailedHTMLProps,
	FormEvent,
	FormHTMLAttributes,
	useEffect,
	useState,
} from 'react';
import Button from '../../Components/Button';
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
		console.log(result);
		setUserSelected(result);
		setIsLoading(false);
	}

	function handleSubmit(event: FormEvent) {
		console.log('Submit');
		event.preventDefault();
	}

	return (
		<>
			<form className="w-full max-w-sm" onSubmit={handleSubmit}>
				<input
					className={styles.input}
					type="text"
					data-testid="inputNewItem"
					placeholder="Username"
					value={userName}
					onChange={e => setUsername(e.target.value)}
				/>
				<Button type="submit">Buscar</Button>
			</form>
			<div className={styles.content}>
				{userSelected && <h1 className={styles.title}>{userSelected.name}</h1>}
			</div>

			<ul
				className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
				id="tabs-tab"
				role="tablist"
			>
				<li className="nav-item" role="presentation">
					<a
						href="#tabs-home"
						className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    "
						id="tabs-home-tab"
						data-bs-toggle="pill"
						data-bs-target="#tabs-home"
						role="tab"
						aria-controls="tabs-home"
						aria-selected="true"
					>
						Home
					</a>
				</li>
				<li className="nav-item" role="presentation">
					<a
						href="#tabs-profile"
						className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
						id="tabs-profile-tab"
						data-bs-toggle="pill"
						data-bs-target="#tabs-profile"
						role="tab"
						aria-controls="tabs-profile"
						aria-selected="false"
					>
						Profile
					</a>
				</li>
				<li className="nav-item" role="presentation">
					<a
						href="#tabs-messages"
						className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
						id="tabs-messages-tab"
						data-bs-toggle="pill"
						data-bs-target="#tabs-messages"
						role="tab"
						aria-controls="tabs-messages"
						aria-selected="false"
					>
						Messages
					</a>
				</li>
				<li className="nav-item" role="presentation">
					<a
						href="#tabs-contact"
						className="
      nav-link
      disabled
      pointer-events-none
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
						id="tabs-contact-tab"
						data-bs-toggle="pill"
						data-bs-target="#tabs-contact"
						role="tab"
						aria-controls="tabs-contact"
						aria-selected="false"
					>
						Contact
					</a>
				</li>
			</ul>
			<div className="tab-content" id="tabs-tabContent">
				<div
					className="tab-pane fade show active"
					id="tabs-home"
					role="tabpanel"
					aria-labelledby="tabs-home-tab"
				>
					Tab 1 content
				</div>
				<div
					className="tab-pane fade"
					id="tabs-profile"
					role="tabpanel"
					aria-labelledby="tabs-profile-tab"
				>
					Tab 2 content
				</div>
				<div
					className="tab-pane fade"
					id="tabs-messages"
					role="tabpanel"
					aria-labelledby="tabs-profile-tab"
				>
					Tab 3 content
				</div>
				<div
					className="tab-pane fade"
					id="tabs-contact"
					role="tabpanel"
					aria-labelledby="tabs-contact-tab"
				>
					Tab 4 content
				</div>
			</div>
		</>
	);
}
