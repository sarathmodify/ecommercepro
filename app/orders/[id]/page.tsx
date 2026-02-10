export default function OrderDetailPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Order Detail - ID: {params.id}</h1>
        </div>
    );
}
