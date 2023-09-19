import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { errorMessageAtom, isInProgressAtom } from "../atoms/messageBarAtoms";
import { IPagedCollection } from "../services/FetchHelper";
import { IItem, getItems } from "../services/ItemServices";
import { Text } from "@fluentui/react";

const ItemsList = () => {
  const setIsInProgress = useSetAtom(isInProgressAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);

  const [page, setPage] = useState({ no: 1, search: "", filters: "" });
  const [refreshCount, setRefreshCount] = useState(0);

  const [items, setItems] = useState<IItem[]>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsInProgress(true);

      try {
        const data: IPagedCollection<IItem> = await getItems(
          abortController,
          10,
          page.no,
          page.search,
          page.filters
        );
        const _items = data?.items?.map((item) => {
          const newItem: any = {
            ...item,
            createdAt: new Date(item.createdAt + "Z").toLocaleString(),
          };
          return newItem;
        });
        setItems(_items);
      } catch (error: any) {
        console.error("Error:", error);
        setErrorMessage(error.message);
      } finally {
        setIsInProgress(false);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [page.no, page.search, page.filters, refreshCount]);
  return (
    <div>
      <Text variant="xLarge">ItemsList</Text>
      <br />
      <Text variant="medium">{items && items.length}</Text>
    </div>
  );
};

export default ItemsList;
