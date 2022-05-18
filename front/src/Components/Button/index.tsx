import Loading from '../Loading';
import styles from './styles.module.css';

interface Props extends React.HTMLProps<HTMLButtonElement> {
	type: 'button' | 'reset' | 'submit' | undefined;
	isLoading?: boolean;
}

export default function Button({ type, isLoading, ...props }: Props) {
	return (
		<button
			type="submit"
			{...props}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
		>
			{isLoading && <Loading />}
			Button
		</button>
	);
}
