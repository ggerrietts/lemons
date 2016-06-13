
export const PURCHASE = "ingredients/purchase";

export function purchase(kind) {
    return {
        type: PURCHASE,
        payload: kind
    };
}

