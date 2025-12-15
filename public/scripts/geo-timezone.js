export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => reject(err.message),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}

export function getUserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

/**
 * Combined helper
 */
export async function getUserGeoTimezone() {
  const tz = getUserTimezone();

  try {
    const loc = await getUserLocation();
    return {
      timezone: tz,
      ...loc,
    };
  } catch {
    return {
      timezone: tz,
      lat: null,
      lon: null,
    };
  }
}
