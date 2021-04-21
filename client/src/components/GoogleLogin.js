import React from 'react';
import{GoogleLogin} from 'react-google-login';
import { refreshTokenSetup } from '../utils/RefreshToken';

const clientId='241601696449-kat678q5lkg0g36j7kg5cp4s67m7ddfk.apps.googleusercontent.com';

function Login() {
    const onSuccess = (res) => {
      console.log('Login Success: currentUser:', res.profileObj);
      alert(
        `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
      );
      refreshTokenSetup(res);
    };
  
    const onFailure = (res) => {
      console.log('Login failed: res:', res);
      alert(
        `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
      );
    };
  
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Academic Staff Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px', color:'black', Width:'300px'}}
          //isSignedIn={true}
        />
      </div>
    );
  }
  
  export default Login;