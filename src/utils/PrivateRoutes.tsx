
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
// Outside of Routes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function  ProtectedRoute({ children }: any) {
    const {isLoaded,isSignedIn} = useUser(); 
     
    const checkIfClerkIsInitialized = async():Promise<void>=>{
     //check if clerk is initialized && isLoaded === true
     //else await for 100ms then call the while loop again
      while(!isLoaded || !isLoaded == null){
        await new Promise(resolve => setTimeout(resolve,100))
      }
    }
    checkIfClerkIsInitialized()
     //if the user is not logged in redirect to /login
     if (isLoaded && !isSignedIn) {
       return <Navigate to="/login" />;
     }
   
     return children;
   }