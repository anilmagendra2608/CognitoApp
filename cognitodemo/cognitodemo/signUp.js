const Cognito = require("@aws-sdk/client-cognito-identity-provider");

const clientId = "your client ID goes here";  // Obtain from the AWS console
const username = "myusername";
const password = "My@wesomeSecret99";
const email = "your email address goes here";

async function main() {
  console.log("Signing up user");
  const client = new Cognito.CognitoIdentityProviderClient({ region: 'ap-southeast-2' });
  const command = new Cognito.SignUpCommand({
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });
  const res = await client.send(command);
  console.log(res);
}

main();
