import { PickedFile } from "@/types/media";
import * as ImagePicker from "expo-image-picker";
import { ensureMediaPermission } from "../permissions";

export async function pickImage(): Promise<PickedFile | null> {
  const allowed = await ensureMediaPermission();
  if (!allowed) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    base64: true,
  });

  if (result.canceled) {
    return null;
  }

  const asset = result.assets[0];

  console.log("[Image]:", asset.fileSize);

  return {
    uri: asset.uri,
    name: asset.fileName ?? "image.jpg",
    type: asset.mimeType ?? "image/jpeg",
    size: asset.fileSize,
    base64: asset.base64,
  };
}
