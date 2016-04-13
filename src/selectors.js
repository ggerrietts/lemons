
export const currentTimeSelector = (state) => state.get('time').format("MMMM Do, h:mm a");

export const weatherLabelSelectorFactory = (name) => {
    return (state) => {
        let num = state.get(name);
        let wea = weatherByNumber(num);
        return wea.get('label');
    };
};

export const routingSelector = state => state.routing.toJS();

