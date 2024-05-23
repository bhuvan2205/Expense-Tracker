import { Link } from "@tanstack/react-router";

const Navbar = () => {
	return (
		<nav className="p-2 flex justify-between items-baseline max-w-2xl m-auto">
			<Link to="/" className="[&.active]:font-bold">
				<h1 className="font-bold text-2xl">Expense Tracker</h1>
			</Link>
			<ul className="py-2 flex gap-2">
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
				<Link to="/expenses" className="[&.active]:font-bold">
					Expenses
				</Link>
				<Link to="/create-expense" className="[&.active]:font-bold">
					Create Expense
				</Link>
				<Link to="/profile" className="[&.active]:font-bold">
					Profile
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
