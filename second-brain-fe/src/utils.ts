export function getYouTubeEmbedUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);

    // Case 1: Already an embed URL
    if (parsed.pathname.startsWith("/embed/")) {
      return `${parsed.origin}${parsed.pathname}`;
    }

    // Case 2: Standard watch URL
    const idFromWatch = parsed.searchParams.get("v");
    if (idFromWatch) {
      return `https://www.youtube.com/embed/${idFromWatch}`;
    }

    // Case 3: Short youtu.be URL
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    return undefined;
  } catch {
    return undefined;
  }
}
