import { WardrobeItem } from "@/types/wardrobe.types";

interface Props {
  item: WardrobeItem;
}

export default function WardrobeCard({
  item,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-64 w-full object-cover"
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

        <p className="text-sm text-gray-600">
          {item.category}
        </p>

        <p className="text-sm text-gray-600">
          {item.color}
        </p>

        <p className="text-sm text-gray-600">
          {item.brand}
        </p>
      </div>
    </div>
  );
}