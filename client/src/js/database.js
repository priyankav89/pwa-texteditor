import { openDB } from 'idb';

const initdb = async() => {
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  console.log('open db finished');
};

//  logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT request sent to the jateDB');


  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction(['jate'], 'readwrite');
  console.log('opened transaction')
  const store = tx.objectStore('jate');
  console.log('located object store');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data successfully saved to jate', result);
  return result;
}


// logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the jateDB');

  const jateDb = await openDB('jate', 1);
  // if (!jateDb.objectStoreNames.contains('jate')) {
  //   initdb();
  // }
  const tx = jateDb.transaction(['jate'], 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  // Get confirmation of the request
  const result = await request;
  console.log('Data successfully pulled from jateDB', result);
  return result?.value;
}

console.log('Calling initdb');
initdb();
console.log('Finished initdb');