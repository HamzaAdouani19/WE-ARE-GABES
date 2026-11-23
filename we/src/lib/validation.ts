export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function areValidCoordinates(
  latitude: string,
  longitude: string,
): boolean {
  if (latitude.trim() === "" || longitude.trim() === "") return false;

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

  return (
    Number.isFinite(parsedLatitude) &&
    Number.isFinite(parsedLongitude) &&
    parsedLatitude >= -90 &&
    parsedLatitude <= 90 &&
    parsedLongitude >= -180 &&
    parsedLongitude <= 180
  );
}
