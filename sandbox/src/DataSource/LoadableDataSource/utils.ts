import {Loading} from "./types";


export const getLoadingStatus = (args: { loading: Loading }) => {
    const {loading} = args;
    const {startedAt, finishedAt, erroredAt} = loading;

    const maxTime = Math.max(Number(finishedAt), Number(erroredAt), Number(startedAt));
    const hasStarted = maxTime > 0;

    return {
        isLoadable: true,
        hasStarted: hasStarted,
        isLoading: hasStarted && maxTime === startedAt,
        hasLoaded: hasStarted && maxTime === finishedAt,
        hasErrored: hasStarted && maxTime === erroredAt,
    }
};