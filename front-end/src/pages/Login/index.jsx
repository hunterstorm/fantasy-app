
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, Card, CardContent, CardHeader, Container, TextField, Stack, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab'
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
				<Container maxWidth="sm">
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
													<Typography color="primary" variant="h2" sx={{fontFamily:'"Rowdies", sans-serif'}}>
														Fantasy Bros
													</Typography>
												}	
												subheader={
													<Stack>

													<Typography color="secondary" variant="h5">
													Tired of losing? Become a Fantasy Bro and simply gatekeep it from your league mates.
												</Typography>
												<Typography color="secondary" variant="body2">
													We actually recommend that you do not gatekeep us because we want everyone to enjoy our app.  Iron sharpens iron!  Plus it's FREE to sign up!
												</Typography>
													</Stack>
												}
											/>
										</Box>
										<Stack px={{xs: 2, md: 12}}>
											{/* <TextField
												error={Boolean(touched.username && errors.username)}
												fullWidth
												helperText={touched.username && errors.username}
												label="Username"
												margin="normal"
												name="email"
												onBlur={handleBlur}
												onChange={handleChange}
												type="email"
												value={values.email}
												variant="outlined"
												/> */}
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
												<Button color="primary" disabled={!!isSubmitting} fullWidth size="large" variant="contained">
													Sign Up!
												</Button>
												<Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} pt={1}>
													<Typography sx={{pb:0.3}}>
														Already have an account?
													</Typography>
													<LoadingButton variant="text" type="submit" loading={!!isSubmitting} sx={{textTransform:'none'}} >
														Login
													</LoadingButton>
												</Stack>
											</Box>											
										</Stack>
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