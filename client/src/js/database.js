import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

//export PUT function
export const putDb = async (content) => {
  try {
    console.log("Put to the database");
    // Create a connection to the database database and version we want to use.
    const jateDB = await initdb();

    // Create a new transaction and specify the database and data privileges.
    const tx = jateDB.transaction("jate", "readwrite");

    // Open up the desired object store.
    const store = tx.objectStore("jate");

    // Use the .add() method on the store and pass in the content.
    const request = store.add({ value: content });

    // Get confirmation of the request.
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (error) {
    console.error("putDb not implemented", error);
  }
};
// Export a function we will use to GET to the database.
export const getDb = async () => {
  // try {
    console.log("GET from the database");

    // Create a connection to the database database and version we want to use.
    const jateDB = await openDB("jate", 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = jateDB.transaction("jate", "readonly");

    // Open up the desired object store.
    const store = tx.objectStore("jate");

    // Use the .getAll() method to get all data in the database.
    const request = store.get(1);

    // Get confirmation of the request.
    const result = await request;
    console.log("result.value", result);
    return result?.value;
  // } catch (error) {
  //   console.error("getDb not implemented", error);
  // }
};

initdb();
