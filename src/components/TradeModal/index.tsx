import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Badge, List, ListItem } from "@tremor/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import { trpc } from "../../utils/trpc";

interface TradeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  type: "BUY" | "SELL";
  symbol: string;
  amount: number;
}

const TradeModal = ({
  isOpen,
  closeModal,
  type,
  symbol,
  amount,
}: TradeModalProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const ctx = trpc.useContext();

  const { mutate } = trpc.transaction.create.useMutation({
    onSuccess: () => ctx.invalidate(),
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6"
                      >
                        {t.trade.confirmOrder}
                      </Dialog.Title>
                      <div className="mt-2">
                        <List>
                          <ListItem>
                            <span>{t.common.coin}</span>
                            <span>{symbol}</span>
                          </ListItem>
                          <ListItem>
                            <span>{t.common.amount}</span>
                            <span>{amount}</span>
                          </ListItem>
                          <ListItem>
                            <span>{t.common.type}</span>
                            {type === "BUY" ? (
                              <Badge
                                text={t.common.buy.toUpperCase()}
                                color="blue"
                                size="sm"
                              />
                            ) : (
                              <Badge
                                text={t.common.sell.toUpperCase()}
                                color="pink"
                                size="sm"
                              />
                            )}
                          </ListItem>
                        </List>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className={`inline-flex w-full justify-center rounded-md border border-transparent bg-${
                      type === "BUY" ? "blue" : "pink"
                    }-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-${
                      type === "BUY" ? "blue" : "pink"
                    }-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={() => {
                      mutate({
                        amount,
                        symbol,
                        type,
                      });
                      closeModal();
                      router.push("/transactions");
                    }}
                  >
                    {type === "BUY" ? t.common.buy : t.common.sell}
                  </button>
                  <button
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    {t.trade.cancel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TradeModal;
