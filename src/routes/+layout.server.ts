import type { LayoutServerLoad } from "./$types";

type PackFormatEntry = {
  data_pack_version: number;
  stable: boolean;
  id: string;
};

export const load = (async () => {
  const url = "https://raw.githubusercontent.com/misode/mcmeta/summary/versions/data.min.json";

  const data: PackFormatEntry[] = await fetch(url).then(r => r.json());
  const filtered = data.filter(v => v.stable);

  return {
    packFormat: filtered[0].data_pack_version,
    gameVersion: filtered[0].id,
  };
}) satisfies LayoutServerLoad;
