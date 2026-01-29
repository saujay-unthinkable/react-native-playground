import * as Linking from "expo-linking";
import { Link } from "expo-router";
import React from "react";

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string },
) {
  return (
    <Link
      target="_blank"
      {...props}
      // @ts-expect-error: External URLs are not typed in Expo Router
      href={props.href}
      onPress={(e) => {
        // Prevent the default behavior of linking to the default browser on native.
        e.preventDefault();
        // Open the link in an external browser.
        Linking.openURL(props.href);
      }}
    />
  );
}
