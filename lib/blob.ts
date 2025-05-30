import { put, del, list } from "@vercel/blob"

export async function uploadFile(file: File, pathname: string) {
  try {
    const blob = await put(pathname, file, {
      access: "public",
    })
    return blob
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

export async function deleteFile(url: string) {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    throw error
  }
}

export async function listFiles(prefix?: string) {
  try {
    const { blobs } = await list({
      prefix,
      limit: 100,
    })
    return blobs
  } catch (error) {
    console.error("Error listing files:", error)
    throw error
  }
}

export function getFileUrl(pathname: string) {
  return `${process.env.BLOB_READ_WRITE_TOKEN}/${pathname}`
}
