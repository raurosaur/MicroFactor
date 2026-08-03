import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = (): {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  deleteToken: (key: string) => Promise<void>;
} => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await getItemAsync(key);
        if (!item) {
          console.log("no cached session");
        } else console.log("session restored");
        return item;
      } catch (e) {
        await deleteItemAsync(key);
        return null;
      }
    },
    saveToken: async (key: string, token: string) => {
      return await setItemAsync(key, token);
    },
    deleteToken: async (key: string) => {
      return deleteItemAsync(key);
    },
  };
};

export const tokenCache =
  Platform.OS === "web" ? undefined : createTokenCache();
