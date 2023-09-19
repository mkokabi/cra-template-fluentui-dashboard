import { IPagedCollection, internalFetch } from "./FetchHelper";

export interface IItem {
    id: number;
    createdAt: string;
    otherInfo: string;
  }

export const getItems = async (
    abortController: AbortController,
    pageSize: number,
    pageNo: number,
    orderBy?: string,
    search?: string
  ): Promise<IPagedCollection<IItem>> => {
    return internalFetch(
      `${
        process.env.REACT_APP_BACKEND_API_URL
      }/assets?pageSize=${pageSize}&pageNo=${pageNo}${
        orderBy ? `&orderBy=${orderBy}` : ""
      }${search ? `&search=${search}` : ""}&code=${
        process.env.REACT_APP_BACKEND_API_KEY
      }`,
      "GET",
      abortController
    );
  };