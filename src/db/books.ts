import Dexie,{type Table} from 'dexie';
export type BookRecord={id:string;title:string;file:Blob;fileHash:string;totalPages:number;addedAt:number;updatedAt:number};
class BacaDB extends Dexie{books!:Table<BookRecord,string>;constructor(){super('BacaCerdasDB');this.version(1).stores({books:'id,updatedAt,fileHash'});}}
export const db=new BacaDB();
async function sha256(blob:Blob){const buf=await blob.arrayBuffer();const hash=await crypto.subtle.digest('SHA-256',buf);return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function importBook(file:File){if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf'))throw new Error('Pilih file PDF.');const fileHash=await sha256(file);const old=await db.books.where('fileHash').equals(fileHash).first();if(old)return old;const now=Date.now();const row:BookRecord={id:`local-${fileHash.slice(0,24)}`,title:file.name.replace(/\.pdf$/i,''),file:new Blob([file],{type:'application/pdf'}),fileHash,totalPages:0,addedAt:now,updatedAt:now};await db.books.put(row);return row;}
export const listBooks=()=>db.books.orderBy('updatedAt').reverse().toArray();
export const updateBook=(id:string,patch:Partial<BookRecord>)=>db.books.update(id,{...patch,updatedAt:Date.now()});
