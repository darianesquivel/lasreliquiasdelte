// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { PRODUCTS_A } from "../data/products";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWyUlqc7S1iWEsfPOF5qX6sQSUZAvlfzk",
  authDomain: "lasreliquiasdelte-2a95e.firebaseapp.com",
  projectId: "lasreliquiasdelte-2a95e",
  storageBucket: "lasreliquiasdelte-2a95e.firebasestorage.app",
  messagingSenderId: "662525584216",
  appId: "1:662525584216:web:f25e28064431a6bb137b2d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export async function addProducts(db: any) {
//   try {
//     const productsCol = collection(db, "products");

//     for (const product of PRODUCTS_A) {
//       const { id, ...productData } = product; // saco el id para que Firebase cree uno nuevo
//       await addDoc(productsCol, productData);
//     }

//     console.log("✅ Todos los productos fueron agregados correctamente");
//   } catch (error) {
//     console.error("❌ Error al agregar productos:", error);
//   }
// }
