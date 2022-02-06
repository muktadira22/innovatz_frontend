import React, { useRef, useState, useEffect } from "react";
import Card from "../components/Card";
import MyChart from "../components/Chart";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import {
  countDateAsync,
  countItemAsync,
  sumProfitAsync,
  transactionAsync,
} from "../stores/transaction/slice";
import { fetchItemAsync } from "../stores/item/slice";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const { sumProfit, countItem, countDate, transactions } = useAppSelector(
    (state) => state.transaction
  );
  console.log(sumProfit);

  useEffect(() => {
    dispatch(sumProfitAsync({ item_id: "" }));
    dispatch(countDateAsync({ item_id: "" }));
    dispatch(countItemAsync({ item_id: "" }));
    dispatch(fetchItemAsync());
    dispatch(transactionAsync({ item_id: "" }));
  }, []);
  return (
    <Layout>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Chart</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}

            <Card>
              <MyChart data={sumProfit} type="pie" title="Summary Profit" />
            </Card>
            <Card>
              <MyChart
                data={countItem}
                type="bar"
                title="Summary Profit By Item"
              />
            </Card>
            <Card>
              <MyChart
                data={countDate}
                type="line"
                title="Summary Profit By Date"
              />
            </Card>
          </div>
        </div>

        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Top 5 Summary
        </h2>

        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                        No
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                        Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction, key) => (
                      <tr key={transaction.id} className="bg-white">
                        <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {key + 1}
                        </td>
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              {transaction.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900 font-medium">
                            {transaction.profit} IDR
                          </span>
                        </td>
                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            className={
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            }
                          >
                            {transaction.count}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
