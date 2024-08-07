import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-wvBGzlYI9NHjVZBq7wbUHtEWrN3AFI8",
  authDomain: "pasarbarokah-56d6c.firebaseapp.com",
  projectId: "pasarbarokah-56d6c",
  storageBucket: "pasarbarokah-56d6c.appspot.com",
  messagingSenderId: "316348641371",
  appId: "1:316348641371:web:5ad38a561e7d73744acf7e",
  measurementId: "G-NKKFY4X1ZC"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarjadwalpelajaran() {
  const refDokumen = collection(db, "jadwalpelajaran");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      jamke: dok.data().jamke,
      waktu: dok.data().wakty,
      kelass: dok.data().kelass,
      matapelajaran: dok.data().matapelajaran,
      gurumapel: dok.data().gurumapel,

    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahjadwalpelajaran(hari, jamke, waktu,kelass,matapelajaran,gurumapel) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwalpelajaran'), {
      hari:hari,
      jamke:jamke,
      waktu:waktu,
      kelass:kelass,
      matapelajaran:matapelajaran,
      gurumapel:gurumapel,
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusjadwalpelajaran(docId) {
  await deleteDoc(doc(db, "jadwalpelajaran", docId));
}

export async function ubahjadwalpelajaran(docId,hari, jamke, waktu,kelas,matapelajaran,gurumapel ) {
  await updateDoc(doc(db, "jadwalpelajaran", docId), {
    hari:haru,
    jamke:jamke,
    waktu:waktu,
    kelass:kelass,
    matapelajaran:matapelajaran,
    gurumapel:gurumapel,
  });
}

export async function ambilmatapelajaran(docId) {
  const docRef = await doc(db, "jadwalpelajaran", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}