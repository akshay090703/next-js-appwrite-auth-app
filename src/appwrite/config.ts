import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

console.log("adasd" + conf.appwriteUrl);

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

const account = new Account(appwriteClient);

export class AppwriteService {
  // create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();

      return Boolean(data);
    } catch (error: any) {
      console.log(error.message);
    }

    return false;
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error: any) {
      console.log("Error getting current user.", error.message);
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error: any) {
      console.log("Failed to log out", error.message);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
