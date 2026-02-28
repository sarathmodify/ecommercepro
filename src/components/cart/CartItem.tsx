import Link from 'next/link';
import Image from 'next/image';
import type { CartItem as CartItemType } from '@/src/types/cart';

// ------------------------------------------------------------------
// CartItem — Renders a single cart item row with:
//   - Real product image (from API via next/image)
//   - Product name (linked to detail page), manufacturer, price
//   - Quantity controls (+/−) with stock cap
//   - Remove button
//   - Line subtotal
// ------------------------------------------------------------------
interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export default function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemProps) {
    const { product, quantity } = item;
    const lineSubtotal = product.price * quantity;

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex gap-6">
                {/* Product Image */}
                <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        src={product.thumbnail}
                        alt={product.productName}
                        fill
                        sizes="128px"
                        className="object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <Link
                            href={`/products/${product.id}`}
                            className="text-xl font-semibold text-[var(--color-text)] hover:text-primary transition-colors"
                        >
                            {product.productName}
                        </Link>
                        <p className="text-sm text-[var(--color-text-light)] mt-1">
                            by {product.manufacturer}
                        </p>
                        <p className="text-2xl font-bold text-primary mt-2">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                            <button
                                onClick={() =>
                                    onUpdateQuantity(product.id, quantity - 1)
                                }
                                disabled={quantity <= 1}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                −
                            </button>
                            <span className="px-4 py-1 border-x-2 border-gray-300 font-medium min-w-[3rem] text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() =>
                                    onUpdateQuantity(product.id, quantity + 1)
                                }
                                disabled={quantity >= product.stock}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                +
                            </button>
                        </div>

                        {/* Stock hint */}
                        {quantity >= product.stock && (
                            <span className="text-xs text-yellow-600 font-medium">
                                Max stock reached
                            </span>
                        )}

                        {/* Remove Button */}
                        <button
                            onClick={() => onRemove(product.id)}
                            className="text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>

                {/* Line Subtotal */}
                <div className="text-right flex-shrink-0">
                    <p className="text-sm text-[var(--color-text-light)] mb-1">
                        Subtotal
                    </p>
                    <p className="text-2xl font-bold text-[var(--color-text)]">
                        ${lineSubtotal.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
