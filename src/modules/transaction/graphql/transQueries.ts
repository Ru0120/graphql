import { FilterQuery, SortOrder } from "mongoose";
import { Transactions } from "../../transaction/model/transModel";



type TransactionFilter = {
  categoryId?: string;
  limit?: number;
  skip?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  type?: string;
  categoryIds?: string[];
};

const generateFilter = (args: any) => {
  const {
    categoryId,
    limit = 3,
    page = 1,
    skip = (page - 1) * limit,
    sortBy = "createdBy",
    sortOrder = -1,
    type,
    categoryIds = [],
  } = args;

  const filter: FilterQuery<TransactionFilter> = {};

  if (categoryId) {
    filter["categoryId"] = categoryId;
  }

  if (categoryIds.length) {
    filter["categoryId"] = { $in: categoryIds };
  }

  if (type) {
    filter["type"] = { $eq: type };
  }

  return filter;
};

export const transactionQueries = {
  getTransaction: async (_parent: null, args: { id: string }) => {
    return await Transactions.findById({ _id: args.id });
  },

  getTransactions: async (
    _parent: null,
    args: {
      categoryId: string;
      limit: number;
      skip: number;
      page: number;
      sortBy: string;
      sortOrder: SortOrder;
      type: string;
      categoryIds: string[];
    }
  ) => {
    const {
      limit = 3,
      page = 1,
      skip = (page - 1) * limit,
      sortBy = "createdAt",
      sortOrder = -1,
    } = args;

    const filter: TransactionFilter = generateFilter(args);

    return await Transactions.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ [sortBy]: sortOrder });
  },
};