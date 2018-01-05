import * as constants from '../constants';

function form(
    state: any = {
        totalUser: 0,
        tagNodeTree: [{
            title: '这是测试',
            key: '0-0',
            children: [
                {
                    title: '22',
                    key: '444444',
                    children: [{
                        title: '22',
                        key: '44445',
                        children: [{
                            title: '22',
                            key: '44446',
                            children: [{
                                title: '22',
                                key: '44447',
                                children: [{
                                    title: '22',
                                    key: '44448',
                                    children: [{
                                        title: '33',
                                        key: '444449',
                                    }]
                                }]
                            }]
                        }]
                    }]
                },
                {
                title: '我也是测试',
                key: '0-0-0',
                children: [{
                        title: '还是个测试',
                        key: '0-0-0-0'
                    },
                    {
                        title: '为什么还是测试',
                        key: '0-0-0-1'
                    },
                    {
                        title: '反正还是测试2',
                        key: '0-0-0-2'
                    },
                ],
            }, {
                title: '有问题啊',
                key: '0-0-1',
                children: [{
                        title: '不是很准确',
                        key: '0-0-1-0'
                    },
                    {
                        title: '按照title测试',
                        key: '0-0-1-1'
                    },
                    {
                        title: '按照key测试',
                        key: '0-0-1-2'
                    },
                ],
            }, {
                title: '红色',
                key: '0-0-2',
            }],
        }, {
            title: '黄色',
            key: '0-1',
            children: [{
                    title: '蓝色',
                    key: '0-1-0-0'
                },
                {
                    title: '黑色',
                    key: '0-1-0-1'
                },
                {
                    title: '绿色',
                    key: '0-1-0-2'
                },
            ],
        }, {
            title: '酒色',
            key: '0-2',
        }]
    },
    action: any
) {
    switch (action.type) {
        case constants.TAG_NODE_TREE:
            return {
                ...state
            };
        case constants.TAG_NODE_TREE_SUC:
            return {
                ...state, pageName: action.name
            };
        case constants.USER_AMOUNT_SUC:
            return {
                ...state, userCount: action.num
            };
        default:
            return state;
    }
}
export const userCondition = {
    userCondition: form
};
