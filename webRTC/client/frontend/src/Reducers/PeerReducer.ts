import { ADD_PEER,REMOVE_PEER } from "../Actions/PeerActions";

export type PeerState = Record<string, {stream:MediaStream}>;



type PeerAction = {
    type: typeof ADD_PEER,
    payload: {peerId: string, stream: MediaStream}
} | {
    type: typeof REMOVE_PEER,
    payload: {peerId: string}
}

export const peerReducer = (state: PeerState, action: PeerAction) => {
    console.log(action);
    switch(action.type){
        case ADD_PEER:
            return {...state,[action.payload.peerId]:{stream: action.payload.stream}};
        case REMOVE_PEER:
            if(state[action.payload.peerId]){
                delete state[action.payload.peerId];
            }
            return {...state};
        default:
            return {...state};
    }
}
