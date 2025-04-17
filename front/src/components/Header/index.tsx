export default function Header() {
	return (
		<nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-dark-700">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				<a href="/" className="flex items-center">
					<img
						src="https://rodasdadiversao.files.wordpress.com/2018/07/fortnite-logo-ps4.png?w=512"
						className="mr-3 h-6 sm:h-9"
						alt="Fortnite Logo"
					/>
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						SF-SajermannFortnite
					</span>
				</a>

			</div>
		</nav>
	);
}
