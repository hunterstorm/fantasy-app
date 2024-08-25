import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

export default function AuthLayout() {
	const { isSignedIn } = useAuth();
	const nav = useNavigate();

	useEffect(() => {
		if (isSignedIn) {
			nav("/", { replace: true });
		}
	}, [isSignedIn, nav]);

	return (
		<>
			<Outlet />
		</>
	);
}