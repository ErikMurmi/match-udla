import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import User from "models/User";

export const authOptions = {
  // {providers: [
  //   CredentialsProvider({
  //     // The name to display on the sign in form (e.g. "Sign in with...")
  //     // The credentials is used to generate a suitable form on the sign in page.
  //     // You can specify whatever fields you are expecting to be submitted.
  //     // e.g. domain, username, password, 2FA token, etc.
  //     // You can pass any HTML attribute to the <input> tag through the object.
  //     credentials: {
  //       email: { label: "Email", type: "email"},
  //       clave: {  label: "Clave", type: "password" }
  //     },
  //     async authorize(credentials, req) {
  //       // Add logic here to look up the user from the credentials supplied
  //       console.log('credenciales back:',credentials)
  //       const user = await findUserByCredentials(credentials)
  //       console.log(user)
  //       console.log('Login: '+ user.email)
  //       if (!user.email) {
  //         console.log('Credenciales no válidas')
  //         // Any object returned will be saved in `user` property of the JWT
  //         return null
  //       } else {
  //         // If you return null then an error will be displayed advising the user to check their details.
  //         if(user.tipo!==1){
  //           throw Error('No tienes los privilegios para acceder al sistema')
  //           //return null
  //         }
  //         console.log('test')
  //         return user
  //         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
  //       }
  //     }
  //   })
  // ]}
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      type:'credentials',
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        //console.log(credentials)
        // // Add logic here to look up the user from the credentials supplied
        const email = credentials.email
        const password = credentials.password
        const user = await User.findOne({email:email})
        if(!user.email){
           //throw new Error("You haven't registered yet!")
          return null
        }
        if(user.email){
          return user
        }
        // console.log('usuaaaario',user)
        // if(user){
        //   console.log('usuaaaario',user)
        //   return user
        // }
      }
    }
    )
  ],pages:{
    //signIn:"/signin",
    secret:"secret",
    database: process.env.DB_URL
  }
}

export default NextAuth(authOptions)
