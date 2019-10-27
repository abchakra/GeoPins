import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from "../../context";
import { ME_QUERY } from "../../graphql/queries";
import { BASE_URL } from "../../client";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const logout = async googleUser => {
    dispatch({ type: "LOGIN_USER", payload: null });
    dispatch({ type: "IS_LOGGED_IN", payload: false });
  }
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;

      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      
      const data= await client.request(ME_QUERY);
      
      // console.log("Success Loggin", me)

      dispatch({ type: "LOGIN_USER", payload: data.me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.error("Error logging in", err);
    dispatch({ type: "IS_LOGGED_IN", payload: false });
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="31018125307-pf8fa1umfhp6nasbe6snd90vftf6m9v1.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
        cookiePolicy={'single_host_origin'}
      />

      <GoogleLogout
        clientId="31018125307-pf8fa1umfhp6nasbe6snd90vftf6m9v1.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);