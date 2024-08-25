
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, Card, CardContent, CardHeader, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "../../providers/AuthProvider";
import { Helmet } from 'react-helmet-async';

function LoginPage() {
	const { signIn } = useAuth();

	const handleLogin = ({ email, password }, form) => {
		signIn(email, password)
			.then((isAdmin) => {
				if (!isAdmin) {
					form.setErrors({ email: "Account Does Not Exist" });
				}
			})
			.catch((e) => form.setErrors({ password: e.message }))
			.finally(() => form.setSubmitting(false));
		return true;
	};

	return (
		<>
			<Helmet>
				<title>Login | SavedBy Admin</title>
			</Helmet>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center" }}>
				<Container maxWidth="xs">
					<Card sx={{borderRadius: 5}}>
						<CardContent>
							<Formik
								initialValues={{ email: "", password: "" }}
								validationSchema={Yup.object().shape({
									email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
									password: Yup.string().max(255).required("Password is required"),
								})}
								onSubmit={handleLogin}
								>
								{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
									<form onSubmit={handleSubmit}>
										<Box sx={{ mb: 3 }}>
											<CardHeader
												title={
													<Typography variant="h2">
														Fantasy Bros
													</Typography>
												}	
												subheader={
													<Typography color="textPrimary" variant="h5">
													Sign in
												</Typography>
												}
											/>
										</Box>
										<TextField
											error={Boolean(touched.email && errors.email)}
											fullWidth
											helperText={touched.email && errors.email}
											label="Email Address"
											margin="normal"
											name="email"
											onBlur={handleBlur}
											onChange={handleChange}
											type="email"
											value={values.email}
											variant="outlined"
											/>
										<TextField
											error={Boolean(touched.password && errors.password)}
											fullWidth
											helperText={touched.password && errors.password}
											label="Password"
											margin="normal"
											name="password"
											onBlur={handleBlur}
											onChange={handleChange}
											type="password"
											value={values.password}
											variant="outlined"
											/>
										<Box sx={{ py: 2 }}>
											<Button color="primary" disabled={!!isSubmitting} fullWidth size="large" type="submit" variant="contained">
												Sign in
											</Button>
										</Box>
									</form>
								)}
							</Formik>
						</CardContent>
					</Card>
				</Container>
			</Box>
		</>
	);
}

export default LoginPage;