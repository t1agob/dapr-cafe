import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export function AccountMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Sign In As
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div>
                  <Link to="/customer" className="flex min-w-0 gap-x-4 m-2">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      alt=""
                      src="img/john-doe.png"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        John Doe (customer)
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        john.doe@email.com
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div>
                  <Link to="/employee" className="flex min-w-0 gap-x-4 m-2">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      alt=""
                      src="img/jane-doe.png"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Jane Doe (employee)
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        jane.doe@email.com
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
