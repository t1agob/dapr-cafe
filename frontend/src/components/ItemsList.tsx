import { Button } from '@headlessui/react';

// ItemsListProps
type ItemsListProps = {
  title: string;
  items: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }[];
  onClick: (item: string) => void;
};

function ItemsList({ title, items, onClick }: ItemsListProps) {

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-8 sm:pt-12 lg:max-w-none lg:pt-16">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {items.map((item) => (
              <div key={item.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <Button onClick={()=> onClick(item.name)} className="w-full h-10 mt-2 -mb-2 align-bottom font-bold bg-red-500 text-white rounded-md hover:opacity-90">
                  Select
                </Button>
                <h3 className="mt-6 text-sm text-gray-500">{item.name}</h3>
                <p className="text-base font-semibold text-gray-900">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsList