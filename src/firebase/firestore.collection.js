import { collection } from "firebase/firestore"; 
import { db } from "./firebase-config.js";

export const foodMenuCollectionRef = collection(db, "foodMenu/a1rRfKJdt6h28eQLtiVC/sushiSets");