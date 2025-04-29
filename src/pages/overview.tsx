import Fuse from "fuse.js";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { Filter } from "@/components/Filter/Filter";
import { ItemList } from "@/components/ItemList/ItemList";
import { getItems, getLabel } from "@/lib/data";
import { getFuzzySearchConfig } from "@/lib/data";
import { formatTitle } from "@/lib/format";
import { CustomPage } from "@/pages/_app";

const Overview: CustomPage = () => {
  const title = getLabel("pageOverview");
  const router = useRouter();
  const ring = router.query.ring as string | undefined;
  const restricted = router.query.restricted as string | undefined;
  const query = (router.query.query as string) || "";

  const onRingChange = useCallback(
    (ring: string) => {
      router.push({ query: { ...router.query, ring, query } });
    },
    [router, query],
  );

  const onRestrictedChange = useCallback(
    (restricted: string) => {
      router.push({ query: { ...router.query, ring, query, restricted } });
    },
    [router, query, ring],
  );

  const onQueryChange = useCallback(
    (query: string) => {
      router.replace({ query: { ...router.query, ring, query } });
    },
    [router, ring],
  );

  const { items, index } = useMemo(() => {
    let items = getItems().filter((item) => !ring || item.ring === ring);
    items = items.filter((item) => !restricted || item.restricted);
    const index = new Fuse(items, {
      ...getFuzzySearchConfig(),
      keys: [
        {
          name: "title",
          weight: 1.5,
        },
        {
          name: "tags",
          weight: 1,
        },
        {
          name: "body",
          weight: 0.9,
        },
        {
          name: "revision.body",
          weight: 0.7,
        },
      ],
    });

    return { items, index };
  }, [ring, restricted]);

  const results = useMemo(() => {
    if (!query) return items;
    return index.search(query).map((result) => result.item);
  }, [query, index, items]);

  return (
    <>
      <Head>
        <title>{formatTitle(title)}</title>
      </Head>

      <h1>{title}</h1>
      <Filter
        query={query}
        ring={ring}
        restricted={restricted}
        onRingChange={onRingChange}
        onQueryChange={onQueryChange}
        onRestrictedChange={onRestrictedChange}
      />

      <ItemList items={results} size="large" hideRing={!!ring} />
    </>
  );
};

export default Overview;
