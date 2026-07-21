import { WardrobeItem } from "@/types/wardrobe.types";

interface Props {
  item: WardrobeItem;
  onDelete: (id: string) => void;
}

export default function WardrobeCard({
  item,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:shadow-xl">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-72 w-full object-cover"
        />
      ) : (
        <div className="flex h-64 items-center justify-center bg-gray-100">
          No Image
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {item.name}
        </h2>

        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">
            {item.category}
        </span>

        <span className="ml-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs">
            {item.color}
        </span>

        <p className="mt-2 text-sm font-medium text-gray-700">
          {item.brand}
        </p>
        <button
  onClick={() =>
    onDelete(item._id)
  }
  className="mt-4 w-full rounded bg-red-500 p-2 text-white"
>
  Delete
</button>
      </div>
    </div>
  );
}