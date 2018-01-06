import * as constants from '../constants';

export interface TagNodeTree {
    type: constants.TAG_NODE_TREE;
    id: any;
}
export interface UserAmount {
  type: constants.USER_AMOUNT;
  tag: any[];
}

export function tagNodeTree(id: string): TagNodeTree {
    return {
        type: constants.TAG_NODE_TREE,
        id: id,
    };
}

export function getUserAmount(tag: any[]): UserAmount {
  return {
      type: constants.USER_AMOUNT,
      tag: tag,
  };
}

export type UserAction = TagNodeTree | UserAmount;
