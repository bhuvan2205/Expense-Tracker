import { Button } from "../ui/button";

const Login = () => {
	return (
		<div className="flex flex-col items-start my-2">
			<p>You have to login</p>
			<div className="flex gap-4">
				<Button asChild className="my-4" variant="secondary">
					<a href="/api/login">login</a>
				</Button>

				<Button asChild className="my-4" variant="secondary">
					<a href="/api/register">register</a>
				</Button>
			</div>
		</div>
	);
};

export default Login;