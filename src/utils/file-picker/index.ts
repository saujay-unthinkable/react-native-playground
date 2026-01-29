import { PickedFile } from "@/types/media";
import * as DocumentPicker from "expo-document-picker";

export async function pickDocument(): Promise<PickedFile | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/pdf", "image/*"],
    copyToCacheDirectory: true,
    base64: true,
  });

  if (result.canceled) {
    return null;
  }

  const doc = result.assets[0];

  console.log("[File]:", doc.size);

  return {
    uri: doc.uri,
    name: doc.name,
    type: doc.mimeType ?? "application/octet-stream",
    size: doc.size,
    base64: doc.base64,
  };
}
