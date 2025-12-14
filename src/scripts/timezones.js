export const TIMEZONES = [
  "Etc/GMT+12",
  "Pacific/Midway",
  "Pacific/Niue",
  "Pacific/Pago_Pago",
  "Pacific/Honolulu",
  "Pacific/Johnston",
  "Pacific/Rarotonga",
  "Pacific/Tahiti",
  "Pacific/Marquesas",
  "America/Adak",
  "Pacific/Gambier",
  "America/Anchorage",
  "America/Juneau",
  "America/Sitka",
  "America/Metlakatla",
  "America/Yakutat",
  "America/Los_Angeles",
  "America/Tijuana",
  "America/Vancouver",
  "America/Santa_Isabel",
  "America/Chihuahua",
  "America/Mazatlan",
  "America/Mexico_City",
  "America/Monterrey",
  "America/Guatemala",
  "America/Belize",
  "America/El_Salvador",
  "America/Managua",
  "America/Costa_Rica",
  "America/Panama",
  "America/Regina",
  "America/Swift_Current",
  "America/Edmonton",
  "America/Guayaquil",
  "America/Asuncion",
  "America/La_Paz",
  "America/Caracas",
  "America/Curacao",
  "America/Aruba",
  "America/Bogota",
  "America/Lima",
  "America/Puerto_Rico",
  "America/Santo_Domingo",
  "America/Halifax",
  "America/Glace_Bay",
  "America/St_Johns",
  "America/Goose_Bay",
  "America/Caracas",
  "America/Santiago",
  "America/Montevideo",
  "America/Argentina/Buenos_Aires",
  "America/Sao_Paulo",
  "America/Cayenne",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Europe/London",
  "Europe/Dublin",
  "Europe/Lisbon",
  "Europe/Guernsey",
  "Europe/Isle_of_Man",
  "Europe/Jersey",
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Brussels",
  "Europe/Budapest",
  "Europe/Copenhagen",
  "Europe/Gibraltar",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/Kiev",
  "Europe/Ljubljana",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Monaco",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Rome",
  "Europe/Samara",
  "Europe/Sarajevo",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Zurich",
  "Africa/Casablanca",
  "Africa/Algiers",
  "Africa/Tunis",
  "Africa/Cairo",
  "Africa/Harare",
  "Africa/Johannesburg",
  "Africa/Nairobi",
  "Africa/Lagos",
  "Africa/Khartoum",
  "Africa/Addis_Ababa",
  "Asia/Jerusalem",
  "Asia/Amman",
  "Asia/Beirut",
  "Asia/Damascus",
  "Asia/Gaza",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Asia/Dubai",
  "Asia/Baku",
  "Asia/Yerevan",
  "Asia/Kabul",
  "Asia/Tashkent",
  "Asia/Yekaterinburg",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Dhaka",
  "Asia/Colombo",
  "Asia/Almaty",
  "Asia/Novosibirsk",
  "Asia/Krasnoyarsk",
  "Asia/Irkutsk",
  "Asia/Yakutsk",
  "Asia/Vladivostok",
  "Asia/Sakhalin",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Kamchatka",
  "Asia/Shanghai",
  "Asia/Chongqing",
  "Asia/Hong_Kong",
  "Asia/Macau",
  "Asia/Singapore",
  "Asia/Sri_Jayawardenepura",
  "Asia/Bangkok",
  "Asia/Ho_Chi_Minh",
  "Asia/Jakarta",
  "Asia/Pontianak",
  "Asia/Makassar",
  "Asia/Jayapura",
  "Australia/Perth",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Brisbane",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Pacific/Guam",
  "Pacific/Port_Moresby",
  "Pacific/Noumea",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "Pacific/Tongatapu",
  "Pacific/Apia",
  "Pacific/Chatham",
  "Etc/UTC",
  "GMT",
  "UTC",
  "Europe/Minsk",
  "America/Montevideo",
  "America/Argentina/Cordoba",
  "America/Argentina/Salta",
  "America/Argentina/Jujuy",
  "America/Argentina/Tucuman",
  "America/Argentina/Catamarca",
  "America/Argentina/La_Rioja",
  "America/Argentina/San_Juan",
  "America/Argentina/Mendoza",
  "America/Argentina/San_Luis",
  "America/Argentina/Rio_Gallegos",
  "America/Argentina/Ushuaia",
  "Africa/Monrovia",
  "Africa/Dakar",
  "Africa/Bamako",
  "Africa/Accra",
  "America/El_Salvador",
  "Pacific/Kwajalein",
  "Pacific/Tarawa",
  "Pacific/Enderbury",
  "Pacific/Kiritimati",
  "Asia/Novokuznetsk",
  "Europe/Volgograd",
  "America/Indiana/Indianapolis",
  "America/Indiana/Knox",
  "America/Indiana/Marengo",
  "America/Indiana/Vevay",
  "America/Indiana/Vincennes",
  "America/Indiana/Petersburg",
  "America/Indiana/Tell_City",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Indiana/Winamac",
  "America/Indiana/Winamac",
  "America/Indiana/Vincennes",
];

// also attach to window for simple access
if (typeof window !== "undefined") {
  window.TIMEZONES = TIMEZONES;
}

/**
 * findTimezones(query)
 * - fuzzy-ish case-insensitive match against timezone id and human parts.
 * - returns up to `limit` results.
 */
export function findTimezones(query, { limit = 40 } = {}) {
  if (!query || typeof query !== "string") return TIMEZONES.slice(0, limit);
  const q = query.trim().toLowerCase();
  const results = [];
  for (const tz of TIMEZONES) {
    const id = tz.toLowerCase();
    if (
      id.includes(q) ||
      tz.split("/").some((p) => p.toLowerCase().includes(q))
    ) {
      results.push(tz);
      if (results.length >= limit) break;
    }
  }
  return results;
}

/**
 * populateTimezoneSelect({ selectId = 'timezone-select', searchId = 'timezone-search' })
 * - If a <select id="timezone-select"> exists, populate it with options.
 * - If a <input id="timezone-search"> exists, wire live filtering (debounced).
 * - Returns an object { select, search, cleanup }.
 */
export function populateTimezoneSelect({
  selectId = "timezone-select",
  searchId = "timezone-search",
  limit = 200,
} = {}) {
  const select = document.getElementById(selectId);
  const search = document.getElementById(searchId);

  if (!select && !search)
    return { select: null, search: null, cleanup: () => {} };

  // helper to render options
  function render(list) {
    if (!select) return;
    const cur = select.value;
    select.innerHTML = "";
    for (const tz of list) {
      const opt = document.createElement("option");
      opt.value = tz;
      opt.textContent = tz.replace("_", " ");
      select.appendChild(opt);
    }
    if (list.includes(cur)) select.value = cur;
  }

  // initial render
  render(TIMEZONES.slice(0, limit));

  // live search debounced
  let to = null;
  function onSearch() {
    if (!search) return;
    const v = search.value.trim();
    clearTimeout(to);
    to = setTimeout(() => {
      const list = v ? findTimezones(v, { limit }) : TIMEZONES.slice(0, limit);
      render(list);
    }, 160);
  }

  if (search) {
    search.addEventListener("input", onSearch);
  }

  // return cleanup function
  return {
    select,
    search,
    cleanup() {
      if (search) search.removeEventListener("input", onSearch);
      clearTimeout(to);
    },
  };
}

// Auto-initialize if the page includes the expected elements.
// Useful for Meeting Finder pages that simply include <select id="timezone-select"> and <input id="timezone-search">
if (typeof document !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    try {
      populateTimezoneSelect();
    } catch (e) {
      // ignore
      // console.warn('timezone init failed', e);
    }
  });
}
