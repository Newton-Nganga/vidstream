import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterNewUser() {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  //stall the program untill user is initialized
  const checkIfClerkIsInitialized = async (): Promise<void> => {
    //check if clerk is initialized && isLoaded === true
    //else await for 100ms then call the while loop again
    while (!isLoaded || !isLoaded == null) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  checkIfClerkIsInitialized();
 
  console.log("registering new user account-------");
//only run the registration once
  useEffect(() => { 
   const url = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${user?.id}/`;
    async function registerUserAccount() {
      const response = await axios.post(url, {
        clientId: user?.id,
        username: user?.username,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });

      if (response.status !== 201) {
        toast.error("An error occurred whilst regisering your account");
      }
      console.log("register account response", response);
      navigate("/account/me");
     
    }

    registerUserAccount();
    console.log("registered new user account-------");
  }, [user,navigate]);
 

  return (
    <section className="section min-h-screen flex justify-center items-center ">
       <div className="flex flex-col h-[90vh] ">
        <div className="relative h-20 w-20 m-auto">
           <span className="loader"></span>
        </div>
         <p className="text-base italic">Redirecting you ...</p>
      </div> 
    </section>
  );
}
