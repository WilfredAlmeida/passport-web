// YourComponent.js

import { useMailApi } from "@/hooks/useMailApi";
import { MailSchema } from "@/lib/schema";
import { AssetSortBy } from "helius-sdk";

function MailListView() {

    const { data, loading, error } = useMailApi("/api/mail");

    if (loading) {
        return <h1 className="text-white">Loading...</h1>;
    }

    if (error) {
        // This is ignored because ts is not able to infer the type of error
        /* @ts-ignore */
        return <h1 className="text-white">Error: {error.message}</h1>;
    }

    const isDataValid = MailSchema.safeParse(data);
    if (!isDataValid.success) {
        return <h1 className="text-white">Something Went Wrong</h1>
    }

    /* ts-ignoring this because if we see the object keys via "data.", it shows 
        {items, limit,page,total}
       But the actual object is { assets: {items, limit,page,total} }
    */
    /* @ts-ignore */
    const { assets: {items} } = data!;
console.log(data);

    if (!items || items.length === 0) {
        return <h1 className="text-white">No Mails Found...</h1>
    }

    return (
        // TODO: Add pagination
        <div className="max-h-96 overflow-y-auto">
            {items.map((item: any, index: number) => (
                <a key={index} href={`/mail/${item.id}`} target="_blank">
                    <div
                        className="border-b p-2 text-white cursor-pointer hover:bg-gray-700"
                    >
                        <div className="text-lg font-bold">{item.content.metadata.name}</div>
                        <div className="text-gray-200 truncate">
                            {item.content.metadata.description
                                ? item.content.metadata.description
                                : <i className="text-gray-500">No Content</i>}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default MailListView;
