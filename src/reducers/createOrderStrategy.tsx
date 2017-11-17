function form( 
    state: any = {
        formState: {
            owner: {
                value: 'x@gmail.com',
            },
        }
    },
    action: any
) {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return {
                ...state,
                formState: { ...state.formState, ...action.payload, }
            };
        default:
            return state;
    }
}

export const createOrderStrategyReducer = {
    createOrderStrategy: form
};