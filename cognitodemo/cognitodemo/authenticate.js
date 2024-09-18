const Cognito = require("@aws-sdk/client-cognito-identity-provider");
const jwt = require("aws-jwt-verify");

const userPoolId = "Your user pool ID goes here"; // Obtain from AWS console
const clientId = "Your client ID goes here"; // match signUp.js
const username = "matt"; // match signUp.js
const password = "My@wesomeSecret99"; // match signUp.js

const accessVerifier = jwt.CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "access",
  clientId: clientId,
});

const idVerifier = jwt.CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "id",
  clientId: clientId,
});

async function main() {
  const client = new Cognito.CognitoIdentityProviderClient({
    region: "ap-southeast-2",
  });

  console.log("Getting auth token");

  // Get authentication tokens from the Cognito API using username and password
  const command = new Cognito.InitiateAuthCommand({
    AuthFlow: Cognito.AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: clientId,
  });

  res = await client.send(command);
  console.log(res);

  // ID Tokens are used to authenticate users to your application
  const IdToken = res.AuthenticationResult.IdToken;
  const IdTokenVerifyResult = await idVerifier.verify();
  console.log(IdTokenVerifyResult);

  // Access tokens are used to link IAM roles to identities for accessing AWS services
  // Most students will not use these
  const accessToken = res.AuthenticationResult.AccessToken;
  const accessTokenVerifyResult = await accessVerifier.verify(accessToken);
  console.log(accessTokenVerifyResult);
}

main();
