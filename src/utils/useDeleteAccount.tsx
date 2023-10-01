import axios from "axios";
import { userApi } from "@clerk/clerk-sdk-node";



const clerk = new userApi({
    apiKey:import.meta.env.VITE_CLERK_SECRET_KEY
});


async function useDeleteAccount(userId: string) {
  const url = `${import.meta.env.VITE_CLIENTS_SERVER_URL}/users/${userId}/`;

  const response: {
    status: number | null;
    message: string | null;
    id:string | null
  } = {
    status: null,
    message: null,
    id:null
  };
  try {
    //delete client account  @/users/client
    const clientResponse = await axios.delete(url);

    console.log("Response after deleting client", clientResponse);

    //delete user account
    if (clientResponse.status === 200) {
      await clerk.users.deleteUser(userId);

      return (
        (response.id = userId),
        (response.status = 200),
        (response.message = "User account deleted successfully")
      );
    }
    //incase an error is caught while trying to delete client
    return (
      (response.id = userId),
      (response.status = 400),
      (response.message = "An error was caught while trying to client account")
    );
  } catch (err) {
    return (
      (response.id = userId),
      (response.status = 400),
      (response.message = "An error was caught while trying to delete account")
    );
  }
}

export default useDeleteAccount;
