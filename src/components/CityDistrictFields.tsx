"use client";

import { useMemo, useState } from "react";
import { CITIES, CITY_NAMES } from "@/lib/constants";

export function CityDistrictFields({
  cityLabel,
  districtLabel,
  defaultCity = "",
  defaultDistrict = "",
}: {
  cityLabel: string;
  districtLabel: string;
  defaultCity?: string;
  defaultDistrict?: string;
}) {
  const [city, setCity] = useState(defaultCity);
  const districts = useMemo(() => CITIES[city] || [], [city]);
  return (
    <>
      <label className="field">
        {cityLabel}
        <select
          className="input"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          <option value="">—</option>
          {CITY_NAMES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        {districtLabel}
        <select className="input" name="district" defaultValue={defaultDistrict} required>
          <option value="">—</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
