import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Badge, List, ListItem } from "@tremor/react";
import { useTranslation } from "../../hooks/useTranslation";
import { classNames } from "../../utils/classNames";

type TradeModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  type: "BUY" | "SELL";
  symbol: string;
  quantity: number;
  onConfirm: () => void;
  confirmIsDisabled: boolean;
};

const TradeModal = ({
  isOpen,
  closeModal,
  type,
  symbol,
  quantity,
  onConfirm,
  confirmIsDisabled,
}: TradeModalProps) => {
  const { t } = useTranslation();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto px-2">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-00"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-sm transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="px-8 pt-4 pb-4">
                  <div className="mt-2 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6"
                    >
                      {t.trade.confirmOrder}
                    </Dialog.Title>
                    <div className="mt-4">
                      <List>
                        <ListItem>
                          <span>{t.common.coin}</span>
                          <span>{symbol}</span>
                        </ListItem>
                        <ListItem>
                          <span>{t.common.quantity}</span>
                          <span>{quantity}</span>
                        </ListItem>
                        <ListItem>
                          <span>{t.common.type}</span>
                          <Badge
                            text={
                              type === "BUY"
                                ? t.common.buy.toUpperCase()
                                : t.common.sell.toUpperCase()
                            }
                            color={type === "BUY" ? "blue" : "pink"}
                            size="xs"
                          />
                        </ListItem>
                      </List>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 px-4 py-3">
                  <button
                    className={classNames(
                      type === "BUY"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-pink-600 hover:bg-pink-700",
                      "inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none"
                    )}
                    onClick={onConfirm}
                    disabled={confirmIsDisabled}
                  >
                    {type === "BUY" ? t.common.buy : t.common.sell}
                  </button>
                  <button
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-100"
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
