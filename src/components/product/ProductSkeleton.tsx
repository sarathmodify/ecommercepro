// ------------------------------------------------------------------
// ProductSkeleton — Shimmer loading cards for product grid
// Uses the existing animate-shimmer class from globals.css
// ------------------------------------------------------------------
export default function ProductSkeleton({ count = 6 }: { count?: number }) {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col"
                >
                    {/* Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />

                    {/* Content Placeholder */}
                    <div className="p-4 space-y-3">
                        {/* Title */}
                        <div className="h-5 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                        {/* Category */}
                        <div className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                        {/* Price */}
                        <div className="h-6 w-1/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                        {/* Manufacturer */}
                        <div className="h-4 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    </div>
                </div>
            ))}
        </>
    );
}
