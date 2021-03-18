import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { Field, FieldProps, Form, Formik } from "formik";
import { LoginSchema } from "../../configuration/validationSchemas";
import { useAuth } from "../context/context";
import { Spinner } from "@chakra-ui/spinner";

type loginForm = {
  email: string;
  password: string;
};

const FormStyled = styled(Form)`
  max-width: 500px;
  width: 100%;
  display: flex;
`;

const Login = () => {
  const { dispatch, state } = useAuth();
  const history = useHistory();
  const { loading } = state;

  async function handleSubmit(values: loginForm) {
    dispatch({ type: "loading", value: true });
    const { email, password } = values;
    try {
      await Auth.signIn(email, password);
      dispatch({ type: "loading", value: false });
      dispatch({ type: "authenticate", value: true });
      history.push("/practices");
    } catch (e) {
      dispatch({ type: "loading", value: false });
      alert(e.message);
    }
  }

  return (
    <Flex
      width="full"
      height="full"
      align="center"
      justifyContent="center"
      background="brand.primary"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {(props) => (
          <FormStyled>
            <Box p={8} width="full">
              <Box textAlign="center" mb={6}>
                <Heading color="white">Login</Heading>
              </Box>
              <Box mb={6} textAlign="left">
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={
                        form.errors.email !== "" &&
                        form.errors.email !== undefined &&
                        form.touched.email !== undefined
                      }
                      mb={4}
                    >
                      <FormLabel
                        htmlFor="email"
                        color="white"
                        fontWeight="regular"
                      >
                        Email
                      </FormLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email"
                        type="email"
                        color="white"
                        background="brand.washedWhite"
                        borderColor="#ffffff6e"
                      />
                      <FormErrorMessage color="#ff7b7b">
                        {form.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={
                        form.errors.password !== "" &&
                        form.errors.password !== undefined &&
                        form.touched.password !== undefined
                      }
                    >
                      <FormLabel
                        htmlFor="password"
                        color="white"
                        fontWeight="regular"
                      >
                        Password
                      </FormLabel>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Password"
                        type="password"
                        color="white"
                        background="brand.washedWhite"
                        borderColor="#ffffff6e"
                      />
                      <FormErrorMessage color="#ff7b7b">
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Button type="submit" width="full" boxShadow="lg">
                  {loading ? <Spinner /> : "Sign In"}
                </Button>
              </Box>
            </Box>
          </FormStyled>
        )}
      </Formik>
    </Flex>
  );
};

export default Login;
