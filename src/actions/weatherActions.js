
export const ADVANCE_TIME = "time/advance_time";

export function advanceTime(amt) {
    return {
        type: ADVANCE_TIME,
        payload: amt
    };
}
