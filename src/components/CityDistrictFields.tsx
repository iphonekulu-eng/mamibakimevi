"use client";

import { useMemo, useState } from "react";
import { CITIES, CITY_NAMES, NEIGHBOURHOODS } from "@/lib/constants";

export function CityDistrictFields({
  cityLabel,
  districtLabel,
  neighbourhoodLabel = "Mahalle",
  defaultCity = "",
  defaultDistrict = "",
  defaultNeighbourhood = "",
}: {
  cityLabel: string;
  districtLabel: string;
  neighbourhoodLabel?: string;
  defaultCity?: string;
  defaultDistrict?: string;
  defaultNeighbourhood?: string;
}) {
  const [city, setCity] = useState(defaultCity);
  const [district, setDistrict] = useState(defaultDistrict);

  const districts = useMemo(() => CITIES[city] || [], [city]);
  const neighbourhoods = useMemo(
    () => NEIGHBOURHOODS[city]?.[district] || [],
    [city, district],
  );

  return (
    <>
      <label className="field">
        {cityLabel}
        <select
          className="input"
          name="city"
          value={city}
          onChange={(e) => { setCity(e.target.value); setDistrict(""); }}
          required
        >
          <option value="">—</option>
          {CITY_NAMES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="field">
        {districtLabel}
        <select
          className="input"
          name="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          <option value="">—</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>

      {neighbourhoods.length > 0 && (
        <label className="field md:col-span-2">
          {neighbourhoodLabel}
          <select
            className="input"
            name="neighbourhood"
            defaultValue={defaultNeighbourhood}
          >
            <option value="">—</option>
            {neighbourhoods.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      )}
    </>
  );
}
