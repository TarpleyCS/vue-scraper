import { db } from './index'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

// Example functions
export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), data)
}

// Add more database functions as needed
