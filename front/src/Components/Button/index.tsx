import styles from './styles.module.css';

interface Props extends React.HTMLProps<HTMLButtonElement> {
	type: 'button' | 'reset' | 'submit' | undefined;
}

export default function Button({ type, ...props }: Props) {
	return (
		<button
			type={type}
			{...props}
			className={`${styles.btn} ${styles['btn-blue']}`}
		>
			Buscar
		</button>
	);
}
